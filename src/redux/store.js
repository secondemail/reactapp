import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer'
/*import { composeWithDevTools } from 'redux-devtools-extension'*/
const initailState = {}

const meddleware = [thunk]

const store = createStore(rootReducer, initailState,applyMiddleware(...meddleware))

export default store
