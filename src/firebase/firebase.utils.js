import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBv11-VzaHu7lR4r45WOJRa45QOTIZN1V4",
    authDomain: "crown-db-9e927.firebaseapp.com",
    projectId: "crown-db-9e927",
    storageBucket: "crown-db-9e927.appspot.com",
    messagingSenderId: "718337983775",
    appId: "1:718337983775:web:c3bac75769bc3631f05c2a",
    measurementId: "G-LF8BS1TSKW"
  }

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists){
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch(e) {
        console.log('Error creating user.');
        console.error(e.message);
      }
    }

    return userRef;
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;