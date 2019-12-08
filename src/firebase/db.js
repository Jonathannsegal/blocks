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

export const doUpdatePlayerPosition = (currentGame, userId, position) =>
  db.collection('games').doc(currentGame).collection('players').doc(userId).update({
    position
  });

export const updateUserName = (id, username) =>
  db.doc(`users/${id}`).update({
    username
  });

export const onceGetUsers = () =>
  db.collection('users');


export const doAddPlayerToGame = (id, userId, username, position, team) =>
  db.doc(`games/${id}`).collection('players').doc(userId).set({
    username,
    position,
    team
  });

export const doAddTeamToGame = (id, creator, name, color) =>
  db.doc(`games/${id}`).collection('teams').doc(name).set({
    creator,
    name,
    color,
    score: 0
  });

export const doCreateGame = (gameCreator, id, name, shape, timeStamp) =>
  db.doc(`games/${id}`).set({
    gameCreator,
    id,
    name,
    timeStamp,
    shape,
    state: 'Created'
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

export const getTeamList = (currentGame) =>
  db.collection('games').doc(currentGame).collection('teams').get();

export const getCurrentGamePlayerValues = (currentGame, userId) => {
  var docRef = db.collection('games').doc(currentGame).collection('players').doc(userId);
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

export const doSendMessage = (currentGame, messageId, timeStamp, text, creator, username, team) =>
  db.doc(`games/${currentGame}/messages/${messageId}`).set({
    timeStamp,
    text,
    creator,
    username,
    team
  });

  export const doUpdateObjectives = (currentGame, markerId, team, position) =>
    db.doc(`games/${currentGame}/objectives/${markerId}`).set({
      position,
      team
    });
