import { collection, addDoc, deleteDoc, updateDoc, doc, getDoc } from "firebase/firestore"

export const applyToPost = (postId, email) => {
    console.log('postId: ', postId)
    console.log('email: ', email)
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore()
        try {
            const postRef = doc(firestore, "posts", postId)
            const postSnapshot = await getDoc(postRef)
            if (!postSnapshot.exists()) {
                throw new Error("Post not found")
            }
        
            console.log('postRef: ', postRef)
            const postData = postSnapshot.data()
            console.log('postData: ', postData)

            const currentApplicants = postData.postApplicants
            if (currentApplicants) {
                const hasDuplicate = currentApplicants.includes(email)
                if (hasDuplicate) {
                    const index = currentApplicants.indexOf(email)
                    console.log('index: ', index)
                    const filteredData = currentApplicants && currentApplicants.length > 0 && currentApplicants.filter(applicant => applicant !== email)
                    const updatedPost = {...postData, postApplicants: filteredData}
                    await updateDoc(postRef, updatedPost)
                } else {
                    const updatedApplicants = [...currentApplicants, email]
                    const updatedPost = {...postData, postApplicants: updatedApplicants}
                    await updateDoc(postRef, updatedPost)
                }
            } else if (!currentApplicants) {
                const updatedApplicants = [email]
                const updatedPost = {...postData, postApplicants: updatedApplicants}
                console.log('updatedApplicants: ', updatedApplicants)
                await updateDoc(postRef, updatedPost)
            }

            // await updateDoc(postRef, sanitizedData)
            } catch (error) {
            console.error("Error updating post:", error)
            }

    }
  }

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