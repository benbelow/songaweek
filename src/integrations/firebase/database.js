import firebase from '@firebase/app';
import '@firebase/database';

const config = {
  apiKey: "AIzaSyCI79JUfHAPRLKx-J-nQmHZmz1lgPI29PE",
  authDomain: "reddit-to-soundcloud.firebaseapp.com",
  databaseURL: "https://reddit-to-soundcloud.firebaseio.com/",
  storageBucket: "bucket.appspot.com"
};
firebase.initializeApp(config);

// Get a reference to the database service
export const database = firebase.database();
