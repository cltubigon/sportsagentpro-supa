const initialState = {
  posts: [],
}

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case "RESET_POST_STATE":
          console.log('RESET_POST_STATE: ', action.payload)
          return initialState
        case "SAVE_POSTS_TO_STORAGE":
          console.log('SAVE_POSTS_TO_STORAGE: ', action.payload)
          return {
            ...state,
            posts: action.payload,
          }
        default:
          return state
        }
}

export default postReducer