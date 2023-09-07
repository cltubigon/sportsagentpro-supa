const initialState = {
  selectedProfile: null,
  athletes: {
    data: null,
    lastUpdated: null,
  },
  buildAthletes: {
    data: null,
    lastUpdated: null,
  },
}

const athleteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_ATHLETE_TO_STORAGE":
      console.log("buildAthletes collection is updated")
      return {
        ...state,
        buildAthletes: {
          data: action.objWithIsChecked,
          lastUpdated: action.timestamp,
        },
      }
    case "SET_SELECTED_PROFILE":
      return {
        ...state,
        selectedProfile: action.payload,
      }
    case "SET_ATHLETE_COLLECTION":
      console.log("athlete collection is updated")
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
