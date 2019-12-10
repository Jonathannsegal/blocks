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

export const updateObjectiveTeam = (currentGame, num, team) =>
  db.doc(`games/${currentGame}`).collection('objectives').doc(num).update({
    team
  });

export const onceGetUsers = () =>
  db.collection('users');


export const doAddPlayerToGame = (id, userId, username, position, team, teamId) =>
  db.doc(`games/${id}`).collection('players').doc(userId).set({
    username,
    position,
    team,
    teamId
  });

export const doAddTeamToGame = (gameName, creator, id, name, color) =>
  db.doc(`games/${gameName}`).collection('teams').doc(id).set({
    id,
    creator,
    name,
    color,
    score: 0
  });

export const doUpdateTeam = (gameName, id, name, color) =>
  db.doc(`games/${gameName}`).collection('teams').doc(id).update({
    name,
    color
  });

export const doDeleteTeam = (gameName, id) =>
  db.doc(`games/${gameName}`).collection('teams').doc(id).delete();

export const doCreateGame = (gameCreator, id, name, shape, timeStamp, state) =>
  db.doc(`games/${id}`).set({
    gameCreator,
    id,
    name,
    timeStamp,
    shape,
    state
  });

export const doStartGame = (gameName, state) =>
  db.doc(`games/${gameName}`).update({
    state
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

export const getTeamColor = (currentGame, team) =>
  db.collection('games').doc(currentGame).collection('teams').doc(team).get();

export const getObjectiveList = (currentGame) =>
  db.collection('games').doc(currentGame).collection('objectives').get();

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

export const doUpdateObjectives = (currentGame, markerId, position) =>
  db.doc(`games/${currentGame}/objectives/${markerId}`).set({
    position,
    team: "",
    teamId: ""
  });


export const getSelectedTeamValues = (currentGame, teamId) => {
  var docRef = db.collection('games').doc(currentGame).collection('teams').doc(teamId);
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
