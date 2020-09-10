import React from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import { useTransition, animated } from 'react-spring'

import TransactionInfo from './Views/TransactionInfo'
import TransactionInfinite from './Views/TransactionInfinite'
import Login from './Views/Login'
import Register from './Views/Register'
import App404 from './Views/App404'

const App = () => {
  const location = useLocation()
  const transitions = useTransition(location, location => location.pathname, {
    initial: { transform: 'translate3d(0, 0%,0)', opacity: 0 },
    from: { transform: 'translate3d(0, 80%,0)', opacity: 0 },
    enter: { transform: 'translate3d(0, 0%,0)', opacity: 1 },
    leave: { transform: 'translate3d(0, 100%,0)', opacity: 0 },
  })
  return transitions.map(({ item, key, props }) => (
    <animated.div
      style={{
        ...props,
        position: 'absolute',
        width: '90%',
      }}
      key={key}
    >
      <Switch location={item}>
        <Route exact component={Login} path="/login" />
        <Route exact component={Register} path="/register" />
        <Route exact component={TransactionInfo} path="/transaction/:hash" />
        <Route exact component={TransactionInfinite} path="/" />
        <Route component={App404} />
      </Switch>
    </animated.div>
  ))
}

export default App
