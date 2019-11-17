import { db } from './firebase';

// User API

// export const user = uid => this.db.doc(`users/${uid}`);

// export const users = () => this.db.collection('users');

export const doCreateUser = (id, username, email) =>
  db.doc(`users/${id}`).set({
    username,
    email,
  });

export const onceGetUsers = () =>
  db.collection('users');

// Other db APIs ...
