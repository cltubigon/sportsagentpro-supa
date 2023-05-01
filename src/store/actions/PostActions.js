import { collection, addDoc } from "firebase/firestore";

export const createPost = (post) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        try {
            await addDoc(collection(firestore, 'post'), {
                ...post,
                createdAt: new Date()
            });
            dispatch({ type: "CREATE_DEAL", post });
        } catch (err) {
            dispatch({ type: 'CREATE_DEAL_ERROR', err });
        }
    }
}