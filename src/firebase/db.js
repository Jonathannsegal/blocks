import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email) =>
  db.doc(`users/${id}`).set({
    username,
    email
  });

export const onceGetUsers = () =>
  db.collection('users');

// Other db APIs ...

export const doCreateGame = (id, name, geometry) =>
  db.doc(`games/${id}`).set({
    name,
    geometry
  });