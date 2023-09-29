const initialState = {
  athletes: [],
  isLoading: false,
  fetchError: null,
}

const athleteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ATHLETES":
      console.log("athlete collection is updated")
      const firstID =  action.payload.length > 0 && action.payload[0].uid
      console.log('firstID: ', firstID)
      console.log('action.payload: ', action.payload)
      const hasDuplicate = state.athletes.some(athlete => athlete.uid === firstID)
      console.log('hasDuplicate: ', hasDuplicate)
      return {
        ...state,
        athletes: hasDuplicate ? state.athletes : [...state.athletes, ...action.payload],
      }
    default:
      return state
  }
}

export default athleteReducer