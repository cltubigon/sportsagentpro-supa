export const savePostsToStorage = (payload) => {
    console.log('SAVE_POSTS_TO_STORAGE', payload)
    return (dispatch)=> {
        dispatch({type: 'SAVE_POSTS_TO_STORAGE', payload})
    }
}