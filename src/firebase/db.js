import { db } from './firebase';

// User API
export const doCreateUser = (id, username, email) =>
  db.doc(`users/${id}`).set({
    username,
    email,
    score: 0,
    currentGame: ''
  });

  export const doSetGame = (id, currentGame) =>
    db.doc(`users/${id}`).update({
      currentGame
    });



export const updateUserName = (id, username) =>
  db.doc(`users/${id}`).update({
    username
  });

export const onceGetUsers = () =>
  db.collection('users');

// Game API'S
// export const doUserJoinGame = (id) =>
//   db.doc(`games/${id}`).set({
//     {},

//   });

export const doAddPlayerToGame = (id, userId, data) =>
  db.doc(`games/${id}`).collection('players').doc(userId).set({
    data
  });

export const doCreateGame = (gameCreator, id, name, shape, timeStamp) =>
  db.doc(`games/${id}`).set({
    gameCreator,
    id,
    name,
    timeStamp,
    shape
  });

export const onceGetGames = (gameName) => {
  var docRef = db.collection('games').doc(gameName);
  return docRef.get().then(function (doc) {
    if (doc.exists) {
      return (doc.data());
    } else {
      return ("No such document!");
    }
  }).catch(function (error) {
    return ("Error getting document:", error);
  });
}

export const getGameId = (userId) => {
  var docRef = db.collection('users').doc(userId);
  return docRef.get().then(function (doc) {
    if (doc.exists) {
      return (doc.data());
    } else {
      return ("No such document!");
    }
  }).catch(function (error) {
    return ("Error getting document:", error);
  });
}

export const onceGetGamesReadyToJoin = () =>
  db.collection('games').get();
