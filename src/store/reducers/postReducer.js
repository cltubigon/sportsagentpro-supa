const initialState = {
  posts: [],
}

const postReducer = (state = initialState, action) => {
    switch (action.type) {
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