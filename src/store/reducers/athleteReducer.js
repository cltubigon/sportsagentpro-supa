const initialState = {
  selectedProfile: null,
  athletes: {
    data: null,
    lastUpdated: null,
  }
}

const athleteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_ATHLETE_TO_STORAGE":
      return {
        ...state,
        athletes: action.payload,
      }
    case "SET_SELECTED_PROFILE":
      return {
        ...state,
        selectedProfile: action.payload,
      }
    case "ATHLETE_COLLECTION_UPDATED":
      console.log("collection is updated")
      return {
        ...state,
        athletes: {
          data: action.updatedData,
          lastUpdated: action.timestamp,
        },
      }
    default:
      return state
  }
}

export default athleteReducer
