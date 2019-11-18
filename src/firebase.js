import * as firebase from 'firebase/app';

const config = {
  apiKey: "AIzaSyB-jlvthXsKjxhn97qrJ6ol3wIEh3Q1UGk",
  authDomain: "wine-on-the-rocks.firebaseapp.com",
  databaseURL: "https://wine-on-the-rocks.firebaseio.com",
  projectId: "wine-on-the-rocks",
  storageBucket: "wine-on-the-rocks.appspot.com",
  messagingSenderId: "992431972045",
  appId: "1:992431972045:web:057be46fb6d0f7da"
};

const firebaseApp = firebase.initializeApp(config);
export default firebaseApp;

// export default config;