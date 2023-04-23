import { collection, addDoc } from "firebase/firestore";

export const createAthlete = (athlete) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        try {
            await addDoc(collection(firestore, 'athlete'), {
                ...athlete,
                createdAt: new Date()
            });
            dispatch({ type: "CREATE_ATHLETE", athlete });
        } catch (err) {
            dispatch({ type: 'CREATE_ATHLETE_ERROR', err });
        }
    }
}