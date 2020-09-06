import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { AppBar, Main, AppView, Button } from '@aragon/ui'
import { Router } from 'react-router-dom'
import App from './App'
import TabBar from './Components/TabBar'
import TabProfile from './Components/TabProfile'
import { store, history } from './store'
import GlobalErrorBoundary from './Components/GlobalErrorBoundary'

// eslint-disable-next-line react/prop-types
const AragonProvider = ({ children }) => (
  <Main>
    <GlobalErrorBoundary>
      <Provider store={store}>
        <AppView
          appBar={
            <AppBar
              title="Social transactions"
              tabs={<TabBar />}
              endContent={<TabProfile />}
            />
          }
        >
          <Router history={history}>{children}</Router>
        </AppView>
      </Provider>
    </GlobalErrorBoundary>
  </Main>
)

const ProvidedApp = () => (
  <AragonProvider>
    <App />
  </AragonProvider>
)

ReactDOM.render(<ProvidedApp />, document.getElementById('root'))
