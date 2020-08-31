import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import 'styled-components/macro'
import {
  Text,
  IdentityBadge,
  EmptyStateCard,
  IconError,
  TableHeader,
  TableRow,
  TableCell,
  theme,
  useViewport,
} from '@aragon/ui'
import Web3 from 'web3'
import { useTransition, animated } from 'react-spring'

import TagLink from '../Components/TagLink'
import PaginationTable from '../Components/PaginationTable'
import Spinner, { SpinnerWrapper } from '../Components/Spinner'
import { GU, toEther } from '../utils/utils'
import { getInjectedProvider } from '../utils/web3-utils'

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

const Transactions = () => {
  const [loading, setLoading] = useState(true)
  const [failed, setFailed] = useState(false)
  const [transactions, setTransactions] = useState([])
  const { id } = useParams()
  const { above, breakpoints } = useViewport()

  // Fetch transactions for the corresponding block
  const fetchTransactionsFromBlock = useCallback(async () => {
    setLoading(true)
    setFailed(false)
    try {
      const web3 = new Web3(
        getInjectedProvider() || process.env.REACT_APP_INFURA_WS_ENDPOINT
      )
      let block
      // if the id is -1, we need to fetch the last block as we came through the transactions tab.
      if (id === '-1') {
        const lastBlockNumber = await web3.eth.getBlockNumber()
        block = await web3.eth.getBlock(lastBlockNumber, true)
      } else {
        block = await web3.eth.getBlock(id, true)
      }
      const { transactions } = block
      // Filter only ethereum transfers
      const fetchedTransactions = transactions.filter(
        transaction => transaction.value > 0 && transaction.to !== null
      )
      setTransactions(fetchedTransactions)
    } catch (error) {
      setFailed(true)
    }
    setLoading(false)
    setFailed(false)
  }, [id])

  useEffect(() => {
    fetchTransactionsFromBlock()
  }, [fetchTransactionsFromBlock, id])

  const transitions = useTransition(loading, null, {
    from: { position: 'absolute', opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  function renderTransactions(animationProps) {
    if (failed) {
      return (
        <SpinnerWrapper key={2}>
          <EmptyStateCard
            actionText="Try Again"
            icon={() => <IconError />}
            text="A problem ocurred while fetching transactions."
            onActivate={() => fetchTransactionsFromBlock()}
            disabled={loading}
          />
        </SpinnerWrapper>
      )
    }
    return (
      <animated.div
        style={{ animationProps, width: '95%', marginBottom: `${GU}px` }}
        key={2}
      >
        <div
          css={`
            margin-bottom: ${GU * 2}px;
          `}
        >
          <Text size="xlarge">
            {id === '-1'
              ? 'Latest Transactions'
              : `Transactions from block ${id}`}
          </Text>
        </div>
        <PaginationTable
          items={transactions}
          header={
            <TableRow>
              <TableHeader title="Transaction Hash" />
              {above(360) && <TableHeader title="From / To" />}
              {above(breakpoints.small) && <TableHeader title="Value in Eth" />}
            </TableRow>
          }
        >
          {paginatedItems =>
            paginatedItems.map(transaction => (
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
        </PaginationTable>
      </animated.div>
    )
  }

  return transitions.map(({ item: isLoading, _, props }) =>
    isLoading ? (
      <animated.div style={{ ...props, width: '95%' }} key={1}>
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      </animated.div>
    ) : (
      renderTransactions(props)
    )
  )
}
export default Transactions
