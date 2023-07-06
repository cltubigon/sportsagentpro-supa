const initialState = {
  posts: {
    data: null,
    lastUpdated: null,
  },
  myOpportunitiesPosts: null,
}

const postReducer = (state = initialState, action) => {
  switch (action.type) {
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
    case "SET_MY_OPPORTUNITIES_POSTS":
      console.log("post collection is updated")
      return {
        ...state,
        myOpportunitiesPosts: action.updatedData,
      }
    default:
      return state
  }
}

export default postReducer
