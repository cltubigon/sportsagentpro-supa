export const generateKey = (state) => {
    console.log(state)
    return (dispatch, getState)=> {
        console.log('persist: ', getState())
        getState()
    }
}