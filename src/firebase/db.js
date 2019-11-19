import { db } from './firebase';
import firebase from "firebase/app";
// User API

export const doCreateUser = (id, username, email) =>
  db.doc(`users/${id}`).set({
    username,
    email
  });

export const onceGetUsers = () =>
  db.collection('users');

// Other db APIs

export const doCreateGame = (id, name, geometry, timeStamp) => {
  let shape = [];
  for (let i = 0; i < geometry.length; i++) {
    shape.push(new firebase.firestore.GeoPoint(geometry[i][1], geometry[i][0]));
  }
  db.doc(`games/${id}`).set({
    name,
    timeStamp,
    shape
  });
}