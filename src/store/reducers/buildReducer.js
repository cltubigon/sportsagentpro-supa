const initState = {
  activeStep: "deal_type",
  postOwner: null,
  postOwnerFirstName: null,
  postOwnerLastName: null,
  postType: null,
  selectedRecipients: [],
  selectedActivities: [],
  postApplicants: [],
  activitiesTabReady: false,
  postContent: null,
  postTitle: null,
  postExpirationDate: {},
  detailsTabReady: false,
  reviewTabReady: false,
  paymentTabReady: false,
  recipientsListLayout: true,
  activitiesListLayout: false,
  isSubmitting: false,
  isError: null,
  isProcessedSuccesfully: false,
  totalAmount: 0,
  totalPayment: null,
  editMode: false,
  submissionType: null,
}

const buildReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_IS_SUBMITTING":
      return {
        ...state,
        isSubmitting: action.payload,
      }
    case "SET_ERROR":
      return {
        ...state,
        isError: action.payload,
      }
    case "SET_TOTAL_AMOUNT":
      return {
        ...state,
        totalAmount: action.payload,
      }
    case "SET_IS_PROCESSED_SUCCESSFULLY":
      return {
        ...state,
        isProcessedSuccesfully: action.payload,
      }
    case "SET_SUBMISSION_TYPE":
      console.log("submission type triggered")
      return {
        ...state,
        submissionType: action.payload,
      }
    case "SET_IS_SUBMITTED_SUCCESSFULLY":
      return {
        ...state,
        isProcessedSuccesfully: action.payload,
      }
    case "UPDATE_POST_SUCCESS":
      return {
        ...state,
        isProcessedSuccesfully: action.payload,
      }
    case "DELETE_POST_SUCCESS":
      return {
        ...state,
        isProcessedSuccesfully: action.payload,
      }
    // case "UPDATE_POST_ERROR":
    //   console.log(action.error)
    case "SET_EDIT_MODE":
      return {
        ...state,
        editMode: action.payload,
      }
    case "SET_BUILD_STATE":
      return {
        ...state,
        ...action.payload,
        editMode: true,
      }
    case "SET_TOTAL_PAYMENT":
      return {
        ...state,
        totalPayment: action.payload,
      }
    case "SET_FIRSTNAME_AND_LASTNAME":
      return {
        ...state,
        postOwnerFirstName: action.payload.firstName,
        postOwnerLastName: action.payload.lastName,
      }
    case "SET_SELECTED_RECIPIENTS":
      return {
        ...state,
        selectedRecipients: action.payload,
      }
    case "SET_RECIPIENTS_LIST_LAYOUT":
      return {
        ...state,
        recipientsListLayout: action.payload,
      }
    case "SET_ACTIVITIES_LIST_LAYOUT":
      return {
        ...state,
        activitiesListLayout: action.payload,
      }
    case "RESET_BUILD_STATE":
      return {
        ...initState,
      }
    case "SET_POST_OWNER":
      return {
        ...state,
        postOwner: action.payload,
      }
    case "SET_PAYMENT_TAB_STATUS":
      return {
        ...state,
        paymentTabReady: action.payload,
      }
    case "SET_DETAILS_TAB_STATUS":
      return {
        ...state,
        detailsTabReady: action.payload,
      }
    case "SET_POST_EXPIRATION_DATE":
      return {
        ...state,
        postExpirationDate: action.objPayload,
      }
    case "SET_POST_TITLE":
      return {
        ...state,
        postTitle: action.payload,
      }
    case "SET_CONTENT":
      return {
        ...state,
        postContent: action.payload,
      }
    case "SET_ACTIVITY_TAB_STATUS":
      return {
        ...state,
        activitiesTabReady: action.payload,
      }
    case "UPDATE_AMOUNT_AND_DATE_OF_SELECTED_ACTIVITIES":
      return {
        ...state,
        selectedActivities: action.payload,
      }
    case "ADD_OR_REMOVE_ACTIVITIES":
      return {
        ...state,
        selectedActivities: action.payload,
      }
    case "SET_CHECK_TRUE_OR_FALSE":
      return {
        ...state,
        recipients: action.payload,
      }
    case "SET_INITIAL_FILTERED_ATHLETES":
      return {
        ...state,
        recipients: action.payload,
      }
    case "SET_ACTIVE_STEP":
      return {
        ...state,
        activeStep: action.data,
      }
    case "SAVE_POST_TYPE":
      return {
        ...state,
        postType: action.data,
      }
    // case "CREATE_POST":
    //   return {
    //     ...initState,
    //     isProcessedSuccesfully: { status: true, type: "created" },
    //   }
    case "LOGOUT_SUCCESS":
      return initState
    default:
      return state
  }
}
//TODO: bug when adding new post and then creating new post again "Build"
export default buildReducer
