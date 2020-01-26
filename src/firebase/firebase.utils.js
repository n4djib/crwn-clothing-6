import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


const config = {
    apiKey: "AIzaSyAwGQsX4w4FwbmDKDZIprVfWIXcwLuuv3M",
    authDomain: "crwn-db-2382b.firebaseapp.com",
    databaseURL: "https://crwn-db-2382b.firebaseio.com",
    projectId: "crwn-db-2382b",
    storageBucket: "crwn-db-2382b.appspot.com",
    messagingSenderId: "306563623716",
    appId: "1:306563623716:web:fb333ec69f06ac0a"
};


export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = userRef.get();

    // creating the user if it doen't exist
    if(!snapShot.exits) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message)
        }
        
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;


