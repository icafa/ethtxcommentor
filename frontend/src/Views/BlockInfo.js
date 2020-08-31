import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { EmptyStateCard, IconError } from '@aragon/ui'
import { useTransition, animated } from 'react-spring'
import Web3 from 'web3'

import Spinner, { SpinnerWrapper } from '../Components/Spinner'
import BlockCard from '../Components/BlockCard'
import { getInjectedProvider } from '../utils/web3-utils'

const BlockInfo = () => {
  const [loading, setLoading] = useState(false)
  const [failed, setFailed] = useState(false)
  const [blockData, setBlockData] = useState(null)
  const { id } = useParams()
  const getBlockData = useCallback(async () => {
    setLoading(true)
    setFailed(false)
    try {
      const web3 = new Web3(
        getInjectedProvider() || process.env.REACT_APP_INFURA_WS_ENDPOINT
      )
      const block = await web3.eth.getBlock(id)
      setBlockData(block)

      setFailed(false)
    } catch (error) {
      setFailed(true)
    }
    setLoading(false)
  }, [id])

  // get block data
  useEffect(() => {
    getBlockData()
  }, [getBlockData, id])

  const transitions = useTransition(loading, null, {
    from: { position: 'absolute', opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  function renderBlockInfo(animationProps) {
    if (failed) {
      return (
        <SpinnerWrapper key={2}>
          <EmptyStateCard
            actionText="Try Again"
            icon={() => <IconError />}
            text="A problem ocurred while fetching the requested block."
            onActivate={() => getBlockData()}
            disabled={loading}
          />
        </SpinnerWrapper>
      )
    }

    return (
      <animated.div style={{ animationProps, width: '95%' }} key={2}>
        <BlockCard blockData={blockData} />
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
      renderBlockInfo(props)
    )
  )
}

export default BlockInfo
