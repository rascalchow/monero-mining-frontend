// **  Initial State
const initialState = {
  appStats: {
    installed: 0,
    uninstalled: 0,
    isLoading: false,
    error: null,
  },
}

const dashboardReducer = (state = initialState, action) => {
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
    case 'SET_USER_STATUS':
      return {
        ...state,
        selectedUser: { ...state.selectedUser, status: action.payload.status },
      }
    default:
      return state
  }
}

export default dashboardReducer
