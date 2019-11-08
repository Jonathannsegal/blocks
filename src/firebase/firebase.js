import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const prodConfig = {
  apiKey: "AIzaSyBpaosrnNcAVY740GaqwtL_u2ZIs1BjfmE",
  authDomain: "blocks-319project.firebaseapp.com",
  databaseURL: "https://blocks-319project.firebaseio.com",
  projectId: "blocks-319project",
  storageBucket: "blocks-319project.appspot.com",
  messagingSenderId: "742405510687"
};

const devConfig = {
  apiKey: "AIzaSyBpaosrnNcAVY740GaqwtL_u2ZIs1BjfmE",
  authDomain: "blocks-319project.firebaseapp.com",
  databaseURL: "https://blocks-319project.firebaseio.com",
  projectId: "blocks-319project",
  storageBucket: "blocks-319project.appspot.com",
  messagingSenderId: "742405510687"
};

const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export { db, auth };
