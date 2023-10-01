// import { collection, addDoc } from "firebase/firestore";

// export const createTeam = (team) => {
//     return async (dispatch, getState, { getFirebase, getFirestore }) => {
//         const firestore = getFirestore();
//         try {
//             await addDoc(collection(firestore, 'team'), {
//                 ...team,
//                 created_at: new Date()
//             });
//             dispatch({ type: "CREATE_TEAM", team });
//         } catch (err) {
//             dispatch({ type: 'CREATE_TEAM_ERROR', err });
//         }
//     }
// }