import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyD4sPXnVNQM3G-FT1EMXMBP5NZ8MC4fouQ",
    authDomain: "reading-list-43c32.firebaseapp.com",
    databaseURL: "https://reading-list-43c32.firebaseio.com",
    projectId: "reading-list-43c32",
    storageBucket: "reading-list-43c32.appspot.com",
    messagingSenderId: "299436390838"
};
firebase.initializeApp(config);

export default firebase;