const initialState = {
  posts: {
    data: null,
    lastUpdated: null,
  },
  myOpportunitiesPosts: null,
}

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ALL_OPPORTUNITY_POSTS":
      return {
        ...state,
        myOpportunitiesPosts: action.payload,
      }
      case "SET_USER_OPPORTUNITIES_POSTS":
      console.log('opp 2 triggered')
      return {
        ...state,
        myOpportunitiesPosts: action.data,
      }
    case "RESET_POST_STATE":
      console.log("RESET_POST_STATE: ", action.payload)
      return initialState
    case "SAVE_POSTS_TO_STORAGE":
      console.log("SAVE_POSTS_TO_STORAGE: ", action.payload)
      return {
        ...state,
        posts: action.payload,
      }
    case "SET_POSTS_COLLECTION":
      console.log("post collection is updated")
      return {
        ...state,
        posts: {
          data: action.updatedData,
          lastUpdated: action.timestamp,
        },
      }
    default:
      return state
  }
}

export default postReducer
