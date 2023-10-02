import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  athletes: [],
  isLoading: false,
  fetchError: null,
  selectedAthlete: null,
}

export const athleteSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    SET_ATHLETES_SLICE: (state, action) => {
      const firstID = action.payload.length > 0 && action.payload[0].uid
      const hasDuplicate = state.athletes.some(
        (athlete) => athlete.uid === firstID
      )
      state.athletes = hasDuplicate
        ? state.athletes
        : [...state.athletes, ...action.payload]
    },
    SET_SELECTED_ATHLETE_SLICE: (state, action) => {
      state.selectedAthlete = action.payload
    },
  },
})

export const { SET_ATHLETES_SLICE, SET_SELECTED_ATHLETE_SLICE } = athleteSlice.actions
export default athleteSlice.reducer
