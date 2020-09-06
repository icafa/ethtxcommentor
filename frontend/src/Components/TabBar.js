import React, { useState, useEffect } from 'react'
import { TabBar } from '@aragon/ui'
import { history } from '../store'

const AppTabBar = () => {
  const [selected, setSelected] = useState(0)

  function handleTabChange(index) {
    setSelected(index)
  }
  return (
    <TabBar
      items={['Latest Transactions']}
      selected={selected}
      onChange={handleTabChange}
    />
  )
}

export default AppTabBar
