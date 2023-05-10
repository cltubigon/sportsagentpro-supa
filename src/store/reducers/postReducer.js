const initState = {
    postType: null,
    activeStep: 'activities',
}

const postReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_ACTIVE_STEP':
            console.log('post type reached reducer', action.data)
            return {
                ...state,
                activeStep: action.data
            }
        case 'SAVE_POST_TYPE':
            console.log('post type reached reducer', action.data)
            return {
                ...state,
                postType: action.data
            }
        case "CREATE_POST":
            console.log('created a post: ', action.post)
            return state
        case 'CREATE_POST_ERROR':
            console.log('create project error', action.err)
            return state
        default:
            return state
    }
}

export default postReducer