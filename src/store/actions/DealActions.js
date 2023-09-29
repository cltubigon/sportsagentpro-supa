import { collection, addDoc } from "firebase/firestore";

export const createDeal = (deal) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        try {
            await addDoc(collection(firestore, 'deal'), {
                ...deal,
                created_at: new Date()
            });
            dispatch({ type: "CREATE_DEAL", deal });
        } catch (err) {
            dispatch({ type: 'CREATE_DEAL_ERROR', err });
        }
    }
}