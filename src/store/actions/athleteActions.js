export const saveAthletesToStorage = (athletes) => {
    const payload = athletes.map(({ userId, ...athlete }) => athlete)
    return (dispatch)=> {
        dispatch({type: 'SAVE_ATHLETE_TO_STORAGE', payload})
    }
}
export const saveSelectedAthleteToStorage = (selectedAthlete) => {
    const payload = selectedAthlete[0]
    return (dispatch)=> {
        dispatch({type: 'SAVE_SELECTED_ATHLETE_TO_STORAGE', payload})
    }
}