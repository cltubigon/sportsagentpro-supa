const initialState = {
  pagination: {
    currentPage: 1,
    itemsPerPage: 8,
    reachedLastItem: false,
    totalItems: 4,
  },
  isLoading: true,
  isFetching: false,
}

const utilsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_REACHED_LAST_ITEM":
      return {
        ...state,
        pagination: { ...state.pagination, reachedLastItem: action.payload },
      }
    case "SET_IS_FETCHING":
      return {
        ...state,
        isFetching: action.payload,
      }
    case "SET_CURRENT_PAGE":
      return {
        ...state,
        pagination: { ...state.pagination, currentPage: action.payload },
      }
    case "SET_TOTAL_ITEMS":
      return {
        ...state,
        pagination: { ...state.pagination, totalItems: action.payload },
        isLoading: false,
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
