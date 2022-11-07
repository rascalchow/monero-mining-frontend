// **  Initial State
const initialState = {
  total: 0,
  data: [],
  selectedUser: null,
  isLoading: false,
  error: null,
}

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return {
        total: action.payload.total,
        data: action.payload.data,
        isLoading: false,
      }
    case 'SET_USER':
      return { ...state, selectedUser: action.payload, isLoading: false }
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    default:
      return state
  }
}

export default usersReducer
