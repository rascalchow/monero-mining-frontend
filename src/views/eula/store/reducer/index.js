// **  Initial State
const initialState = {
  data: null,
  isLoading: false,
  isUpdating: false,
  error: null,
}

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_EULA':
      return {
        data: action.payload,
        isLoading: false,
        error: null,
      }
    case 'SET_LOADING':
      return { ...state, data: null, isLoading: action.payload }
    case 'SET_UPDATING':
      return { ...state, data: null, isUpdating: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    default:
      return state
  }
}

export default usersReducer
