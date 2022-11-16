// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import navbar from './navbar'
import layout from './layout'
import user from '@src/views/user/store/reducer'
import eula from '@src/views/eula/store/reducer'

const rootReducer = combineReducers({
  auth,
  navbar,
  layout,
  user,
  eula,
})

export default rootReducer
