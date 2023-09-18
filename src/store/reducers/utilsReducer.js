const initialState = {
  pagination: {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 4,
    lastItemReached: false,
  },
  isLoading: true,
}

const utilsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LAST_ITEM_REACHED":
      return {
        ...state,
        pagination: {...state.pagination, lastItemReached: action.payload},
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
