// **  Initial State
const initialState = {
  data: null,
  isLoading: false,
  isUpdating: false,
  error: null,
}

const editProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PRODUCT/EDIT/SET':
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

export default editProductReducer
