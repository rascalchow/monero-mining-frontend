// **  Initial State
const initialState = {
  profile: {
    name: null,
    email: null,
    publisherKey: null,
    userProfileId: {
      application: null,
      companyName: null,
      contact: null,
      country: null,
      website: null,
      instantmessenger: null,
      moreInformation: null,
    },
    isLoading: false,
    error: null,
  },
}

const accountSettingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ACCOUNT_SETTINGS/SET_PROFILE':
      return {
        ...state,
        profile: {
          ...state.profile,
          ...action.payload,
        },
      }
    default:
      return state
  }
}

export default accountSettingsReducer
