const initState = {
    recipients: null,
    selectedRecipientsCount: 0,
    postType: null,
    activeStep: 'deal_type',
    searchRecipient: '',
    selectedActivities: [],
    activitiesTabReady: false,
    postContent: null,
    postTitle: null,
    postExpirationDate: null,
    detailsTabReady: false,
}

const postReducer = (state = initState, action) => {
    switch (action.type) {
      case "SET_DETAILS_TAB_STATUS":
          console.log('SET_DETAILS_TAB_STATUS', action.payload)

          return {
            ...state,
            detailsTabReady: action.payload,
          }
        case "SET_POST_EXPIRATION_DATE":
            console.log('SET_POST_EXPIRATION_DATE', action.payload)

            return {
              ...state,
              postExpirationDate: action.payload,
            }
        case "SET_POST_TITLE":
            console.log('SET_POST_TITLE', action.payload)

            return {
              ...state,
              postTitle: action.payload,
            }
        case "SET_CONTENT":
            console.log('SET_CONTENT', action.payload)

            return {
              ...state,
              postContent: action.payload,
            }
        case "SET_ACTIVITY_TAB_STATUS":
            console.log('SET_ACTIVITY_TAB_STATUS', action.payload)

            return {
              ...state,
              activitiesTabReady: action.payload,
            }
        case "UPDATE_AMOUNT_AND_DATE_OF_SELECTED_ACTIVITIES":
            console.log('UPDATE_AMOUNT_AND_DATE_OF_SELECTED_ACTIVITIES', action.payload)

            return {
              ...state,
              selectedActivities: action.payload,
            }
        case "ADD_OR_REMOVE_ACTIVITIES":
            console.log('ADD_OR_REMOVE_ACTIVITIES', action.payload)
            return {
              ...state,
              selectedActivities: action.payload,
            }
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
              selectedRecipientsCount: action.countPayload,
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