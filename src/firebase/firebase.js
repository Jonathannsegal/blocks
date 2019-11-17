import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const prodConfig = {
  apiKey: "AIzaSyBpaosrnNcAVY740GaqwtL_u2ZIs1BjfmE",
  authDomain: "blocks-319project.firebaseapp.com",
  databaseURL: "https://blocks-319project.firebaseio.com",
  projectId: "blocks-319project",
  storageBucket: "blocks-319project.appspot.com",
  messagingSenderId: "742405510687",
  appId: "1:742405510687:web:14b44064931c63f7c2e72a",
};

const devConfig = {
  apiKey: "AIzaSyBpaosrnNcAVY740GaqwtL_u2ZIs1BjfmE",
  authDomain: "blocks-319project.firebaseapp.com",
  databaseURL: "https://blocks-319project.firebaseio.com",
  projectId: "blocks-319project",
  storageBucket: "blocks-319project.appspot.com",
  messagingSenderId: "742405510687",
  appId: "1:742405510687:web:14b44064931c63f7c2e72a",
};

const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.firestore();
const auth = firebase.auth();

// Merge Auth and DB User API
const onAuthUserListener = (next, fallback) =>
  this.auth.onAuthStateChanged(authUser => {
    if (authUser) {
      this.user(authUser.uid)
        .get()
        .then(snapshot => {
          const dbUser = snapshot.data();

          // default empty roles
          if (!dbUser.roles) {
            dbUser.roles = {};
          }

          // merge auth and db user
          authUser = {
            uid: authUser.uid,
            email: authUser.email,
            providerData: authUser.providerData,
            ...dbUser,
          };

          next(authUser);
        });
    } else {
      fallback();
    }
  });

export { db, auth, onAuthUserListener };
