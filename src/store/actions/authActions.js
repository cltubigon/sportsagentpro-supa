// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';



// export const signIn = (credentials) => {
//   return async (dispatch) => {
//     try {
//       const auth = getAuth();
//       await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
//       dispatch({ type: "LOGIN_SUCCESS" });
//     } catch (error) {
//       dispatch({ type: "LOGIN_ERROR", error });
//     }
//   };
// };

export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase()
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(()=> {
            dispatch({type: 'LOGIN_SUCCESS'})
        }).catch((err)=> {
            dispatch({type: 'LOGIN_ERROR', err})
        })
    }
}