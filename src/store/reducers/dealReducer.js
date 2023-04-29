const initState = {
    deals: []
}

const dealReducer = (state = initState, action) => {
    switch (action.type) {
        case "CREATE_DEAL":
            console.log('created a deal: ', action.deal)
            return state
        case 'CREATE_DEAL_ERROR':
            console.log('create project error', action.err)
            return state
        default:
            return state
    }
}

export default dealReducer