const initState = {
    postOwner: null,
    recipients: null,
    postType: null,
    activeStep: 'deal_type',
    selectedRecipients: [],
    selectedActivities: [],
    activitiesTabReady: false,
    postContent: null,
    postTitle: null,
    postExpirationDate: null,
    detailsTabReady: false,
    reviewTabReady: false,
    paymentTabReady: false,
    recipientsListLayout: true,
    activitiesListLayout: false,
    isSubmittedSuccessfully: false,
}

const buildReducer = (state = initState, action) => {
    switch (action.type) {
      case "SET_SELECTED_RECIPIENTS":
          console.log('SET_SELECTED_RECIPIENTS')
          return {
            ...state,
            selectedRecipients: action.payload
          }
      case "SET_RECIPIENTS_LIST_LAYOUT":
          console.log('SET_RECIPIENTS_LIST_LAYOUT')
          return {
            ...state,
            recipientsListLayout: action.payload
          }
      case "SET_ACTIVITIES_LIST_LAYOUT":
          console.log('SET_ACTIVITIES_LIST_LAYOUT')
          return {
            ...state,
            activitiesListLayout: action.payload
          }
      case "RESET_POST_STATE":
          console.log('RESET_POST_STATE')
          return {
            ...initState
          }
      case "SET_POST_OWNER":
          console.log('SET_POST_OWNER', action.payload)

          return {
            ...state,
            postOwner: action.payload,
          }
      case "SET_PAYMENT_TAB_STATUS":
          console.log('SET_PAYMENT_TAB_STATUS', action.payload)

          return {
            ...state,
            paymentTabReady: action.payload,
          }
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
            console.log('CREATE_POST', action.sanitizedObject)
            return {
              ...state,
              isSubmittedSuccessfully: true
            }
        case 'CREATE_POST_ERROR':
            console.log('CREATE_POST_ERROR', action.err)
            return state
        default:
            return state
    }
}

export default buildReducer