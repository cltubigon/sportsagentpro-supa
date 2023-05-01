export const incrementIt = () => {
    return (dispatch, getState)=> {
        const state = getState()
        const stateIncrement = state.auth.incrementThis
        const newValue = stateIncrement + 1
        dispatch({type: 'INCREMENT', newValue})
    }
}