// **  Initial State
const initialState = {
  appStats: {
    data: {
      installed: 0,
      uninstalled: 0,
      devices: 0,
    },
    isLoading: false,
    error: null,
  },
  deviceList: {
    data: [],
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
    case 'DASHBOARD/PUBLISHER/SET_DEVICE_LIST':
      return {
        ...state,
        deviceList: {
          ...state.deviceList,
          ...action.payload,
        },
      }
    default:
      return state
  }
}

export default dashboardReducer
