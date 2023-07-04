export const saveAthletesToStorage = (athletes) => {
    console.log('I am trying to dispatch', athletes)
    const payload = athletes.map(({ userId, ...athlete }) => athlete)
    return (dispatch)=> {
        dispatch({type: 'SAVE_ATHLETE_TO_STORAGE', payload})
    }
}