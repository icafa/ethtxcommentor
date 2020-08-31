import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useTransition, animated } from 'react-spring'
import { IconError, EmptyStateCard } from '@aragon/ui'
import Web3 from 'web3'
import Spinner, { SpinnerWrapper } from '../Components/Spinner'
import TransactionCard from '../Components/TransactionCard'
import { getInjectedProvider } from '../utils/web3-utils'

const TransactionInfo = () => {
  const [loading, setLoading] = useState(true)
  const [failed, setFailed] = useState(false)
  const [transactInfo, setTransactInfo] = useState(null)
  const { hash } = useParams()

  const loadTransactionInfo = useCallback(async () => {
    setLoading(true)
    setFailed(false)
    try {
      const web3 = new Web3(
        getInjectedProvider() || process.env.REACT_APP_INFURA_WS_ENDPOINT
      )
      const transaction = await web3.eth.getTransaction(hash)
      if (!transaction) {
        setFailed(true)
      } else {
        setTransactInfo(transaction)
        setFailed(false)
      }
    } catch (error) {
      setFailed(true)
    }
    setLoading(false)
  }, [hash])
  useEffect(() => {
    loadTransactionInfo()
  }, [loadTransactionInfo, hash])

  const transitions = useTransition(loading, null, {
    from: { position: 'absolute', opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  function renderTransactionInfo(animationProps) {
    if (failed) {
      return (
        <SpinnerWrapper key={2}>
          <EmptyStateCard
            actionText="Try Again"
            icon={() => <IconError />}
            text="A problem ocurred while fetching the requested transaction."
            onActivate={() => loadTransactionInfo()}
            disabled={loading}
          />
        </SpinnerWrapper>
      )
    }
    return (
      <animated.div style={{ animationProps, width: '95%' }} key={2}>
        <TransactionCard transactInfo={transactInfo} />
      </animated.div>
    )
  }

  return transitions.map(({ item: isLoading, key, props }) =>
    isLoading ? (
      <animated.div style={{ ...props, width: '95%' }} key={1}>
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      </animated.div>
    ) : (
      renderTransactionInfo(props)
    )
  )
}

export default TransactionInfo
