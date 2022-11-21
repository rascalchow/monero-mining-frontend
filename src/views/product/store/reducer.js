import { combineReducers } from 'redux'
import editProductReducer from '../edit/store/reducer'

export default combineReducers({
  edit: editProductReducer,
})
