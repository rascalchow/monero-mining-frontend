// **  Initial State
const initialState = {
  total: 0,
  data: [],
  selectedUser: null,
}

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return {total: action.payload.total, data: action.payload.data}
    case 'SET_USER':
      return {...state, selectedUser: action.payload}
    default:
      return state
  }
}

export default usersReducer
