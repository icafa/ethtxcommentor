import React, { useState, useEffect, useCallback, useRef } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import 'styled-components/macro'
import {
  Text,
  Button,
  IdentityBadge,
  EmptyStateCard,
  IconError,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  theme,
  useViewport,
} from '@aragon/ui'
import Web3 from 'web3'

import TagLink from '../Components/TagLink'
import Spinner, { SpinnerWrapper } from '../Components/Spinner'
import { GU, toEther } from '../utils/utils'
import { getInjectedProvider } from '../utils/web3-utils'
import { getTransactions } from '../actions/transactions.actions'

const AddressWrapper = styled.div`
  width: 100%;
  max-width: 200px;
  display: flex;
  flex-direction: column;
  .trans-details {
    display: flex;
    justify-content: space-between;
    margin-bottom: ${GU}px;
  }
`

const defaultBlockHeightWindow = 1;
const defaultLoadMoreBlocks = 1;

const Transactions = ({ getTransactions, transactions, loading }) => {
  const [failed, setFailed] = useState(false)
  const { above, breakpoints } = useViewport()

  const [lastBlockNumber, setLastBlockNumber] = useState(null)
  const [startBlockNumber, setStartBlockNumber] = useState(null)
  const subscriptionRef = useRef()

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const prevStartBlockNumber = usePrevious(startBlockNumber)
  const prevLastBlockNumber = usePrevious(lastBlockNumber)
  
  const fetchRequestedBlocks = useCallback(async () => {
    if (lastBlockNumber && (prevStartBlockNumber != startBlockNumber || prevLastBlockNumber != lastBlockNumber)) {
      try {
        getTransactions({prevStartBlockNumber, prevLastBlockNumber, lastBlockNumber, startBlockNumber, transactions})
      } catch (error) {
        console.error(error)
      }
    }
  }, [lastBlockNumber, startBlockNumber, prevLastBlockNumber, prevStartBlockNumber, transactions])

  // Fetch the last block number on the blockchain.
  // note that this may be unstable due to issues with web3.
  const fetchBlockNumber = useCallback(async () => {
    try {
      const web3 = new Web3(
        getInjectedProvider() || process.env.REACT_APP_INFURA_WS_ENDPOINT
      )
      const blockNumber = await web3.eth.getBlockNumber()
      
      setLastBlockNumber(blockNumber)
      setStartBlockNumber(blockNumber - defaultBlockHeightWindow + 1)
    } catch (error) {
      console.error(error)
    }
  }, [])

  useEffect(() => {
    fetchBlockNumber()
  }, [fetchBlockNumber])

  // Effect for running real time updates
  useEffect(() => {
    if (lastBlockNumber && !subscriptionRef.current) {
      try {
        const web3 = new Web3(
          getInjectedProvider() || process.env.REACT_APP_INFURA_WS_ENDPOINT
        )
        const subscription = web3.eth.subscribe(
          'newBlockHeaders',
          async (err, newBlock) => {
            if (err) {
              setFailed(true)
            }
            setLastBlockNumber(newBlock.number)
          }
        )
        subscriptionRef.current = subscription
      } catch (e) {
        setFailed(true)
      }
    }
    // clean up function to avoid open subscriptions on unmount
    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe((err, result) => {
          if (err) {
            // handle error
            setFailed(true)
          }
        })
      }
    }
  }, [lastBlockNumber])

  useEffect(() => {
    fetchRequestedBlocks()
  }, [lastBlockNumber, startBlockNumber, fetchRequestedBlocks])

  function renderTransactions() {
    if (failed) {
      return (
        <SpinnerWrapper>
          <EmptyStateCard
            actionText="Try Again"
            icon={() => <IconError />}
            text="A problem ocurred while fetching transactions."
            onActivate={() => fetchRequestedBlocks()}
            disabled={loading}
          />
        </SpinnerWrapper>
      )
    }
    return (
      <div>
        <div
          css={`
            margin-bottom: ${GU * 2}px;
          `}
        >
          <Text size="xlarge">
            {`Transactions from block ${startBlockNumber} - latest(${lastBlockNumber})`}
          </Text>
        </div>
        <Table header={
          <TableRow>
            <TableHeader title="Transaction Hash" />
            {above(360) && <TableHeader title="From / To" />}
            {above(breakpoints.small) && <TableHeader title="Value in Eth" />}
          </TableRow>}
        >
        {
          transactions.map(transaction => (
            <TableRow key={transaction.hash}>
              <TableCell>
                <TagLink
                  shorten
                  text={transaction.hash}
                  location={`/transaction/${transaction.hash}`}
                />
              </TableCell>
              {above(360) && (
                <TableCell>
                  <AddressWrapper>
                    <div className="trans-details">
                      <Text
                        smallcaps
                        color={theme.textSecondary}
                        weight="bold"
                        css={`
                          margin-right: ${GU / 2}px;
                        `}
                      >
                        From
                      </Text>{' '}
                      <IdentityBadge
                        shorten
                        entity={transaction.from}
                        fontSize="xxsmall"
                      />
                    </div>
                    <div className="trans-details">
                      <Text
                        smallcaps
                        color={theme.textSecondary}
                        weight="bold"
                        css={`
                          margin-right: ${GU / 2}px;
                        `}
                      >
                        To
                      </Text>{' '}
                      <IdentityBadge
                        shorten
                        entity={transaction.to}
                        fontSize="xxsmall"
                      />
                    </div>
                  </AddressWrapper>
                </TableCell>
              )}
              {above(breakpoints.small) && (
                <TableCell>
                  <Text smallcaps>
                    $ {toEther(transaction.value).toFixed(2)}
                  </Text>
                </TableCell>
              )}
            </TableRow>
          ))
        }
        </Table>
    
        {
          loading? (
            <div style={{ width: '95%' }}>
              <SpinnerWrapper>
                <Spinner />
              </SpinnerWrapper>
            </div>
          ) : (
            <Button
              wide
              mode="strong"
              onClick={() => {
                setStartBlockNumber(startBlockNumber - defaultLoadMoreBlocks)
              }}
              css={`
                margin: ${GU}px 0 0 0;
              `}
            >
              Load More
            </Button>
          )
        }
      </div>
    )
  }

  return renderTransactions()
}
const mapStateToProps = state => ({
  transactions: state.transactionsReducer.transactions,
  loading: state.transactionsReducer.loading,
})

const mapDispatchToProps = dispatch => ({
  getTransactions: (payload) => dispatch(getTransactions(payload)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Transactions)