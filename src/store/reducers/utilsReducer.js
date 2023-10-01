import { produce } from "immer"

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
      return produce(state, (draft) => {
        draft.pagination.athletes.currentPage = action.payload
      })
    case "LAST_ITEM_REACHED_ATHLETE":
      return produce(state, (draft) => {
        draft.pagination.athletes.lastItemReached = action.payload
      })
    case "SET_POSTS_OF_OWNERS_CURRENT_PAGE":
      return produce(state, (draft) => {
        draft.pagination.postsOfOwners.currentPage = action.payload
      })
    case "LAST_ITEM_REACHED_POSTS_OF_OWNER":
      return produce(state, (draft) => {
        draft.pagination.postsOfOwners.lastItemReached = action.payload
      })
    case "SET_ALL_POSTS_CURRENT_PAGE":
      return produce(state, (draft) => {
        draft.pagination.allPosts.currentPage = action.payload
      })
    case "LAST_ITEM_REACHED_OF_ALL_POSTS":
      return produce(state, (draft) => {
        draft.pagination.allPosts.lastItemReached = action.payload
      })
    case "SET_IS_LOADING_ALL_POSTS":
      return produce(state, (draft) => {
        draft.pagination.allPosts.isLoading = action.payload
      })
    case "SET_LOADING_STATUS":
      return produce(state, (draft) => {
        draft.pagination.athletes.isLoading = action.payload
      })
    case "CLEAR_UTILS_SESSION":
      return initialState
    default:
      return state
  }
}

export default utilsReducer
