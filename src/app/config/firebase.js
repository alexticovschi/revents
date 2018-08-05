import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBMoooW-eJ6PxU7RuqQsVTVDckcpqq-Mq8",
    authDomain: "revents-68124.firebaseapp.com",
    databaseURL: "https://revents-68124.firebaseio.com",
    projectId: "revents-68124",
    storageBucket: "revents-68124.appspot.com",
    messagingSenderId: "387717748750"
}

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const settings = {
    timestampsInSnapshots: true
}
firestore.settings(settings);

export default firebase;
