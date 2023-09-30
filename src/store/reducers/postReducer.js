const initialState = {
  posts: {
    data: null,
    lastUpdated: null,
  },
  allPosts: [],
  userOpportunityPosts: [],
  isLoading: true,
}

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_IS_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      }
    case "POST_SUCCESSFULLY_DELETED":
      return {
        ...state,
        userOpportunityPosts: action.payload,
      }
    case "SET_ALL_OPPORTUNITY_POSTS":
      const firstID = action.payload.length > 0 && action.payload[0].id
      const hasDuplicate = state.allPosts.some(
        (opp) => opp.id === firstID
      )
      return {
        ...state,
        allPosts: hasDuplicate
          ? [...state.allPosts]
          : [...state.allPosts, ...action.payload],
      }
    case "SET_USER_OPPORTUNITY_POSTS":
      const userFirstID = action.payload.length > 0 && action.payload[0].id
      const userHasDuplicate = state.userOpportunityPosts.some(
        (opp) => opp.id === userFirstID
      )
      console.log("userHasDuplicate: ", userHasDuplicate)
      return {
        ...state,
        userOpportunityPosts: userHasDuplicate
          ? [...state.userOpportunityPosts]
          : [...state.userOpportunityPosts, ...action.payload],
      }
    case "UPDATED_ALL_OPPORTUNITY_POSTS":
      console.log("triggered UPDATED_ALL_OPPORTUNITY_POSTS")
      return {
        ...state,
        isLoading: false,
        allPosts: action.payload,
      }
    case "SET_USER_OPPORTUNITIES_POSTS":
      console.log("opp 2 triggered")
      return {
        ...state,
        allPosts: action.data,
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
