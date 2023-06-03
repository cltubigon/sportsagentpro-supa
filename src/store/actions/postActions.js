export const savePostsToStorage = (payload) => {
    console.log('SAVE_POSTS_TO_STORAGE', payload)
    return (dispatch)=> {
        dispatch({type: 'SAVE_POSTS_TO_STORAGE', payload})
    }
}
export const resetPostState = (payload) => {
    console.log('RESET_POST_STATE', payload)
    return (dispatch)=> {
        dispatch({type: 'RESET_POST_STATE', payload})
    }
}