const initialState = {
  pagination: {
    athletes: {
      currentPage: 1,
      itemsPerPage: 16,
      isLoading: false,
      lastItemReached: false,
    },
    postsOfOwners: {
      currentPage: 1,
      itemsPerPage: 16,
      isLoading: false,
      lastItemReached: false,
    },
    allPosts: {
      currentPage: 1,
      itemsPerPage: 16,
      isLoading: false,
      lastItemReached: false,
    },
  },
}

const utilsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ATHLETE_CURRENT_PAGE":
      return {
        ...state,
        pagination: {
          ...state.pagination,
          athletes: {
            ...state.pagination.athletes,
            currentPage: action.payload,
          },
        },
      }
    case "LAST_ITEM_REACHED_ATHLETE":
      console.log("reducer is triggered", action)
      return {
        ...state,
        pagination: {
          ...state.pagination,
          athletes: {
            ...state.pagination.athletes,
            lastItemReached: action.payload,
          },
        },
      }
    case "SET_POSTS_OF_OWNERS_CURRENT_PAGE":
      return {
        ...state,
        pagination: {
          ...state.pagination,
          postsOfOwners: {
            ...state.pagination.postsOfOwners,
            currentPage: action.payload,
          },
        },
      }
    case "LAST_ITEM_REACHED_POSTS_OF_OWNER":
      return {
        ...state,
        pagination: {
          ...state.pagination,
          postsOfOwners: {
            ...state.pagination.postsOfOwners,
            lastItemReached: action.payload,
          },
        },
      }
    case "SET_ALL_POSTS_CURRENT_PAGE":
      return {
        ...state,
        pagination: {
          ...state.pagination,
          allPosts: {
            ...state.pagination.allPosts,
            currentPage: action.payload,
          },
        },
      }
    case "LAST_ITEM_REACHED_OF_ALL_POSTS":
      return {
        ...state,
        pagination: {
          ...state.pagination,
          allPosts: {
            ...state.pagination.allPosts,
            lastItemReached: action.payload,
          },
        },
      }
    case "SET_IS_LOADING_ALL_POSTS":
      return {
        ...state,
        pagination: {
          ...state.pagination,
          allPosts: {
            ...state.pagination.allPosts,
            isLoading: action.payload,
          },
        },
      }
    case "SET_LOADING_STATUS":
      return {
        ...state,
        pagination: {
          ...state.pagination,
          athletes: {
            ...state.pagination.athletes,
            isLoading: action.payload,
          },
        },
      }
    case "CLEAR_UTILS_SESSION":
      return initialState
    default:
      return state
  }
}

export default utilsReducer
