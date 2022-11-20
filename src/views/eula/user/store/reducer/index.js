// **  Initial State
const initialState = {
  data: null,
  isLoading: false,
  isUpdating: false,
  error: null,
}

const userEulaReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'EULA/USER/SET':
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

export default userEulaReducer
