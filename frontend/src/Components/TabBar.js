import React, { useState, useEffect } from 'react'
import { TabBar } from '@aragon/ui'
import { history } from '../store'

const AppTabBar = () => {
  const [selected, setSelected] = useState(0)

  function handleTabChange(index) {
    setSelected(index)
    switch (index) {
      case 0:
        history.push('/')
        break
    }
  }

  function setCorrespondingTab(path) {
    if (path.includes('register')) {
      setSelected(-1)
    } else if (path.includes('login')) {
      setSelected(-1)
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

  return (
    <TabBar
      items={['Latest Transactions']}
      selected={selected}
      onChange={handleTabChange}
    />
  )
}

export default AppTabBar
