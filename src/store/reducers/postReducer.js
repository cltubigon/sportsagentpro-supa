const initState = {
    posts: [],
}

const postReducer = (state = initState, action) => {
    switch (action.type) {
        case "CREATE_POST":
            console.log('CREATE_POST', action.post)
            return state
        case 'CREATE_POST_ERROR':
            console.log('CREATE_POST_ERROR', action.err)
            return state
        default:
            return state
    }
}

export default postReducer