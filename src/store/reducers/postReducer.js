const initState = {
    recipients: null,
    postType: null,
    activeStep: 'deal_type',
    searchRecipient: '',
}

const postReducer = (state = initState, action) => {
    switch (action.type) {
        case "SEARCH_ATHLETE":
            console.log('SEARCH_ATHLETE', action.payload)
            return {
              ...state,
              searchRecipient: action.payload,
            }
        case "SET_CHECK_TRUE_OR_FALSE":
            console.log('SET_CHECK_TRUE_OR_FALSE', action.payload)
            return {
              ...state,
              recipients: action.payload,
            }
        case "SET_INITIAL_FILTERED_ATHLETES":
            console.log('SET_INITIAL_FILTERED_ATHLETES', action.payload)
            return {
              ...state,
              recipients: action.payload,
            }
        case 'SET_ACTIVE_STEP':
            console.log('SET_ACTIVE_STEP', action.data)
            return {
                ...state,
                activeStep: action.data
            }
        case 'SAVE_POST_TYPE':
            console.log('SAVE_POST_TYPE', action.data)
            return {
                ...state,
                postType: action.data
            }
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