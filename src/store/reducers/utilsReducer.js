const initialState = {
  pagination: {
    athletes: {
      currentPage: 1,
      itemsPerPage: 16,
      isLoading: false,
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
