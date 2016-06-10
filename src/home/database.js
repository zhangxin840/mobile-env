import Firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyC0s_xUpCt6gyc4IXTHL8ro-uhkX6BrMS0",
  authDomain: "project-1927292578732193511.firebaseapp.com",
  databaseURL: "https://project-1927292578732193511.firebaseio.com",
  storageBucket: "project-1927292578732193511.appspot.com",
};

var app = firebase.initializeApp(config);
var database = firebase.database();

export { database };
