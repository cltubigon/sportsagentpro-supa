const initialState = {
  athletes: [],
  isLoading: false,
  fetchError: null,
  selectedAthlete: null,
}

const athleteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ATHLETES":
      const firstID =  action.payload.length > 0 && action.payload[0].uid
      const hasDuplicate = state.athletes.some(athlete => athlete.uid === firstID)
      return {
        ...state,
        athletes: hasDuplicate ? state.athletes : [...state.athletes, ...action.payload],
      }
    case "SET_SELECTED_ATHLETE":
      return {
        ...state,
        selectedAthlete: action.payload,
      }
    default:
      return state
  }
}

export default athleteReducer