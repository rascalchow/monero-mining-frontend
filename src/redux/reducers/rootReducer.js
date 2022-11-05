// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import navbar from './navbar'
import layout from './layout'
import user from '@src/views/apps/user/store/reducer'
import ecommerce from '@src/views/apps/ecommerce/store/reducer'
import invoice from '@src/views/apps/invoice/store/reducer'
const rootReducer = combineReducers({
  auth,
  navbar,
  layout,
  user,
  ecommerce,
  invoice
})

export default rootReducer
