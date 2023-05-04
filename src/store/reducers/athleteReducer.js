const initialState = {
    athletes: null,
    selectedAthlete: null,
  }
  
  const athleteReducer = (state = initialState, action) => {
      switch (action.type) {
          case "SAVE_ATHLETE_TO_STORAGE":
            return {
              ...state,
              athletes: action.payload,
            }
          case "SAVE_SELECTED_ATHLETE_TO_STORAGE":
            return {
              ...state,
              selectedAthlete: action.payload,
            }
          default:
            return state
          }
  }
  
  export default athleteReducer