import React, { useState, useEffect } from 'react'
import { TabBar } from '@aragon/ui'
import history from '../history'

const AppTabBar = () => {
  const [selected, setSelected] = useState(0)

  function setCorrespondingTab(path) {
    if (path.includes('latesttransactions')) {
      setSelected(2)
    } else if (path.includes('transaction') || path.includes('transactions')) {
      setSelected(1)
    } else {
      setSelected(0)
    }
  }

  useEffect(() => {
    setCorrespondingTab(history.location.pathname)
  }, [])
  useEffect(() => {
    history.listen(location => {
      setCorrespondingTab(location.pathname)
    })
  }, [])
  function handleTabChange(index) {
    setSelected(index)
    switch (index) {
      case 0:
        history.push('/')
        break
      case 1:
        // replace this one with the latest block available
        history.push('/transactions/-1')
        break
      case 2:
        history.push('/latesttransactions')
        break;
      default:
        throw new Error(
          'Tab Index route change not implemented on the AppTabBar component.'
        )
    }
  }
  return (
    <TabBar
      items={['Blocks', 'Transactions', 'LatestTransactions']}
      selected={selected}
      onChange={handleTabChange}
    />
  )
}

export default AppTabBar
