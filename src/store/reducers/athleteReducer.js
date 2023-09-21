const initialState = {
  selectedProfile: null,
  athletes: {
    data: [],
    lastUpdated: null,
  },
  buildAthletes: {
    data: [],
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
      const firstID =  action.updatedData.length > 0 && action.updatedData[0].id
      console.log('firstID: ', firstID)
      const hasDuplicate = state.athletes.data.some(athlete => athlete.id === firstID)
      console.log('hasDuplicate: ', hasDuplicate)
      return {
        ...state,
        athletes: {
          data: hasDuplicate ? state.athletes.data : [...state.athletes.data, ...action.updatedData],
          lastUpdated: action.timestamp,
        },
      }
    default:
      return state
  }
}

export default athleteReducer
