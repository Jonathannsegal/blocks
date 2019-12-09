import React from 'react';
import { withRedux } from '../../src/lib/redux'
import SwipeableViews from 'react-swipeable-views';
import { useSelector, useDispatch } from 'react-redux'
import Map from '../../src/components/Map/Map';
import Status from '../../src/components/Game/status';
import Chat from '../../src/components/Game/chat';
import { GameState } from '../../src/constants';
import { AppWithAuthorization } from "../../src/components/App";
// import { db } from "../../src/firebase";
require('rsuite/lib/styles/index.less');

const useGame = () => {
	const currentGameState = useSelector(state => state.gameState)
	const dispatch = useDispatch()
	const CurrentGame = useSelector(state => state.currentGame)
	const gameValues = useSelector(state => state.currentGameValues)
	const playerValues = useSelector(state => state.currentGamePlayerValues)

	// const userValues = useSelector(state => state.userValues)
	const AuthUser = useSelector(state => state.authUser)
	const gameChat = () =>
		dispatch({
			type: 'gameChat',
			gameState: GameState.chat
		})
	const gameMain = () =>
		dispatch({
			type: 'gameMain',
			gameState: GameState.main
		})
	const gameStatus = () =>
		dispatch({
			type: 'gameStatus',
			gameState: GameState.status
		})
	// const getCurrentGame = () => {
	// 	console.log(db.getGameId(AuthUser.uid));
	// }

	return { currentGameState, gameValues, playerValues, gameChat, gameMain, gameStatus, CurrentGame, AuthUser }
}

const Game = () => (
	<AppWithAuthorization>
		<GameBase />
	</AppWithAuthorization>
);

const GameBase = () => {
	const { currentGameState, gameValues, playerValues, gameChat, gameMain, gameStatus, CurrentGame, AuthUser } = useGame()
	const handleChangeIndex = index => {
		if (index === GameState.chat) {
			gameChat();
		} else if (index === GameState.main) {
			gameMain();
		} else {
			gameStatus();
		}
	};
	return (
		<React.Fragment>
			<SwipeableViews
				index={currentGameState}
				onChangeIndex={handleChangeIndex}>
				<Chat
					gameMain={gameMain}
					currentGame={CurrentGame}
					userId={AuthUser}
					playerValues={playerValues}
				/>
				<Map
					gameValues={gameValues}
					currentGame={CurrentGame}
					userId={AuthUser.uid}
				/>
				<Status
					currentGame={CurrentGame}
					gameMain={gameMain}
					gameValues={gameValues}
				/>
			</SwipeableViews>
		</React.Fragment >
	)
}

export default withRedux(Game);
