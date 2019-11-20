import { db } from './firebase';

// User API
export const doCreateUser = (id, username, email) =>
  db.doc(`users/${id}`).set({
    username,
    email
  });

export const onceGetUsers = () =>
  db.collection('users');

// Other db APIs
export const doCreateGame = (id, name, shape, timeStamp) =>
  db.doc(`games/${id}`).set({
    name,
    timeStamp,
    shape
  });