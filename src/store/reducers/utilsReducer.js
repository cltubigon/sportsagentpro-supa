const initialState = {
  pagination: {
    athletes: {
      currentPage: 1,
      initialLimit: 8,
      nextLimit: 4,
      lastItemReached: false,
    },
    athletePosts: {
      currentPage: 1,
      initialLimit: 8,
      nextLimit: 4,
      lastItemReached: false,
    },
  },
  isLoading: false,
}

const utilsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LAST_ITEM_REACHED":
      return {
        ...state,
        ...state.pagination,
        athletePosts: {
          ...state.pagination.athletePosts,
          lastItemReached: action.payload,
        },
      }
    case "SET_CURRENT_PAGE":
      return {
        ...state,
        ...state.pagination,
        athletePosts: {
          ...state.pagination.athletePosts,
          currentPage: action.payload,
        },
      }
    case "SET_IS_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      }
    default:
      return state
  }
}

export default utilsReducer
