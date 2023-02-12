import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import navbar from './navbar'
import layout from './layout'
import eula from '@src/views/eula/store/reducer'
import dashboard from '../../views/dashboard/store/reducer'
import accountSettings from '../../views/account-settings/store/reducer'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
const persistConfig = {
  key: 'form',
  storage,
  debug: true,
  whitelist: ['layout'],
}
const rootReducer = combineReducers({
  auth,
  navbar,
  layout,
  eula,
  dashboard,
  accountSettings,
})
const pReducer = persistReducer(persistConfig, rootReducer)
export default pReducer
