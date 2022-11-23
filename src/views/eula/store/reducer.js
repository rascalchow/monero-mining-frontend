import { combineReducers } from 'redux'
import userEulaReducer from '../user/store/reducer'
import adminEulaReducer from '../admin/store/reducer'

export default combineReducers({
  user: userEulaReducer,
  admin: adminEulaReducer,
})
