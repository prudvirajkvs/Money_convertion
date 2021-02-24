import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCTtwJjGeS862pZ2r1JpB6AbJCObakeD3w',
  authDomain: 'money-convertion.firebaseapp.com',
  projectId: 'money-convertion',
  storageBucket: 'money-convertion.appspot.com',
  messagingSenderId: '911612913703',
  appId: '1:911612913703:web:ad38e8185be82031ac0602',
  measurementId: 'G-0HBQL94NWE',
};
const firebaseapp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
