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
    case 'DASHBOARD/PUBLISHER/SET_APP_STATS':
      return {
        ...state,
        appStats: {
          ...state.appStats,
          ...action.payload,
        },
      }
    default:
      return state
  }
}

export default dashboardReducer
