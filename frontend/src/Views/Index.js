import React, { useState, useEffect, useCallback, useRef } from 'react'
import styled from 'styled-components'
import 'styled-components/macro'
import {
  Text,
  theme,
  Badge,
  EmptyStateCard,
  IconError,
  TextInput,
  useViewport,
} from '@aragon/ui'
import Web3 from 'web3'
import { useTransition, animated } from 'react-spring'

import BlocksTable from '../Components/BlocksTable'
import Switch from '../Components/Switch'
import Spinner, { SpinnerWrapper } from '../Components/Spinner'
import { GU } from '../utils/utils'
import { getInjectedProvider, fetchBlocks } from '../utils/web3-utils'
import history from '../history'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  height: 100%;
  padding-top: 2em;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${4 * GU}px;
  .ether-info {
    grid-column: span 1;
    .stat-row {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 0 ${GU}px 0;
    }
  }
  @media screen and (min-width: 728px) {
    grid-template-columns: 70% 1fr;

    .search {
      grid-column: span 2;
    }
  }
`

const Index = () => {
  const [loading, setLoading] = useState(true)
  const [failed, setFailed] = useState(false)
  const [lastBlockNumber, setLastBlockNumber] = useState(null)
  const [blocks, setBlocks] = useState([])
  const [inputBlockNumber, setInputBlockNumber] = useState('')
  const [realtime, setRealtime] = useState(false)
  const [totalDifficulty, setTotalDifficulty] = useState(null)
  const [totalGasUsed, setTotalGasUsed] = useState(null)
  const [averageDifficulty, setAverageDifficulty] = useState(null)
  const [averageGasUsed, setAverageGasUsed] = useState(null)
  const subscriptionRef = useRef()
  const { above, breakpoints } = useViewport()

  // Fetch the last block number on the blockchain.
  // note that this may be unstable due to issues with web3.
  const fetchBlockNumber = useCallback(async () => {
    setLoading(true)
    try {
      const web3 = new Web3(
        getInjectedProvider() || process.env.REACT_APP_INFURA_WS_ENDPOINT
      )
      const blockNumber = await web3.eth.getBlockNumber()
      setLastBlockNumber(blockNumber)
    } catch (error) {
      setFailed(true)
    }
  }, [])

  useEffect(() => {
    fetchBlockNumber()
  }, [fetchBlockNumber])

  // Effect for running real time updates
  useEffect(() => {
    if (realtime && lastBlockNumber && !subscriptionRef.current) {
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
            if (realtime) {
              setLastBlockNumber(newBlock.number)
            }
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
  }, [lastBlockNumber, realtime])

  // force unsubscribe when realtime is set off
  useEffect(() => {
    if (!realtime && subscriptionRef.current) {
      subscriptionRef.current.unsubscribe((err, result) => {
        if (err) {
          // handle error
          setFailed(true)
        }
      })
      subscriptionRef.current = null
    }
  }, [realtime])

  // Fetch the last 10 blocks from the blockchain
  useEffect(() => {
    async function fetchRequestedBlocks() {
      if (lastBlockNumber) {
        try {
          const web3 = new Web3(
            getInjectedProvider() || process.env.REACT_APP_INFURA_WS_ENDPOINT
          )
          let blocks = await fetchBlocks(
            web3,
            lastBlockNumber - 10,
            lastBlockNumber
          )
          blocks = blocks.reverse()
          setBlocks(blocks)
        } catch (error) {
          setFailed(true)
        }
        setLoading(false)
      }
    }
    fetchRequestedBlocks()
  }, [lastBlockNumber])

  // Calculate avg difficulty and gas used
  useEffect(() => {
    if (blocks.length > 0) {
      const totDifficulty = blocks.reduce(
        (total, currentBlock) => total + Number(currentBlock.difficulty),
        0
      )
      setTotalDifficulty(totDifficulty)
      const averageDifficulty = totDifficulty / blocks.length
      setAverageDifficulty(averageDifficulty)

      const totGasUsed = blocks.reduce(
        (total, currentBlock) => total + Number(currentBlock.gasUsed),
        0
      )
      setTotalGasUsed(totGasUsed)
      const averageGasUsed = totGasUsed / blocks.length
      setAverageGasUsed(averageGasUsed)
    }
  }, [blocks])

  function searchBlockByNumber() {
    history.push(`/blockInfo/${inputBlockNumber}`)
  }

  const transitions = useTransition(loading, null, {
    from: { position: 'absolute', opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  function renderBlocks(animationProps) {
    if (failed) {
      return (
        <SpinnerWrapper key={2}>
          <EmptyStateCard
            actionText="Try Again"
            icon={() => <IconError />}
            text="A problem ocurred while fetching transactions."
            onActivate={() => fetchBlockNumber()}
            disabled={loading}
          />
        </SpinnerWrapper>
      )
    }

    return (
      <animated.div
        style={{
          ...animationProps,
          width: `${above(breakpoints.small) ? '100%' : '90%'}`,
          margin: '0 auto',
          paddingLeft: '-16px',
        }}
        key={2}
      >
        <div
          css={`
            width: ${above(breakpoints.small) ? '100%' : '90%'};
            margin: 0 auto;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-end;
          `}
        >
          <Text smallcaps>realtime updates</Text>
          <Switch
            onChange={() => {
              setRealtime(on => !on)
            }}
            on={realtime}
          />
        </div>
        <TextInput.Number
          wide
          type="search"
          placeholder="Search by block number"
          onChange={e => setInputBlockNumber(e.target.value)}
          onKeyDown={e => {
            if (e.keyCode === 13) {
              searchBlockByNumber()
            }
          }}
          css={`
            margin-top: 24px;
          `}
        />
        <Wrapper>
          <div className="ether-info">
            <BlocksTable items={blocks} title="Block" />
          </div>
          <div className="ether-info">
            <Text smallcaps weight="bold">
              Stats for the last 10 blocks
            </Text>
            <div className="stat-row">
              <Text size="small" color={theme.textSecondary}>
                Tot. Difficulty:{' '}
              </Text>
              <Badge
                css={`
                  max-height: 22px;
                `}
              >
                {totalDifficulty}
              </Badge>
            </div>
            <div className="stat-row">
              <Text size="small" color={theme.textSecondary}>
                Avg Difficulty:{' '}
              </Text>
              <Badge
                css={`
                  max-height: 22px;
                `}
              >
                {averageDifficulty}
              </Badge>
            </div>
            <div className="stat-row">
              <Text size="small" color={theme.textSecondary}>
                Total Gas Used:{' '}
              </Text>
              <Badge>{totalGasUsed}</Badge>
            </div>
            <div className="stat-row">
              <Text size="small" color={theme.textSecondary}>
                Average Gas Used:{' '}
              </Text>
              <Badge>{averageGasUsed}</Badge>
            </div>
          </div>
        </Wrapper>
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
      renderBlocks(props)
    )
  )
}

export default Index
