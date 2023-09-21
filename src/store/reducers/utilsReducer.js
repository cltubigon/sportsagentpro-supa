const initialState = {
  pagination: {
    athletes: {
      currentPage: 1,
      initialLimit: 12,
      nextLimit: 10,
      lastVisible: null,
      lastItemReached: false,
    },
    athletePosts: {
      currentPage: 1,
      initialLimit: 12,
      nextLimit: 10,
      lastVisible: null,
      lastItemReached: false,
    },
  },
  isLoading: false,
}

const utilsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LAST_VISIBLE":
      return {
        ...state,
        pagination: {
          ...state.pagination,
          athletes: {
            ...state.pagination.athletes,
            lastVisible: action.payload,
          },
        },
      }
    case "SET_LAST_POST_VISIBLE":
      return {
        ...state,
        pagination: {
          ...state.pagination,
          athletePosts: {
            ...state.pagination.athletePosts,
            lastVisible: action.payload,
          },
        },
      }
    case "SET_LAST_ATHLETE_ITEM_REACHED":
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
    case "SET_LAST_POST_ITEM_REACHED":
      return {
        ...state,
        pagination: {
          ...state.pagination,
          athletePosts: {
            ...state.pagination.athletePosts,
            lastItemReached: action.payload,
          },
        },
      }
    case "SET_CURRENT_PAGE":
      return {
        ...state,
        pagination: {
          ...state.pagination,
          athletePosts: {
            ...state.pagination.athletePosts,
            currentPage: action.payload,
          },
        },
      }
    case "SET_IS_LOADING":
      return {
        ...state,
        initialState
      }
    case "CLEAR_UTILS_SESSION":
      return initialState
    default:
      return state
  }
}

export default utilsReducer
