import firebase from 'firebase/compat/app';

export const dbFetch = async (nameOfCollection) => {
    const db = firebase.firestore();
    const snapshot = await db.collection(nameOfCollection).get();
    const data = snapshot.docs.map(doc => doc.data())
    console.log('fetchData', data)
    return data
}