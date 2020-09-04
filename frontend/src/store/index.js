import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import createRootReducer from '../reducers'

const history = createBrowserHistory()


const getMiddleware = () => {
  return applyMiddleware(routerMiddleware(history))
}
const store = createStore(
  createRootReducer(history),
  composeWithDevTools(getMiddleware())
)

export { store, history }
