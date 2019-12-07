import React from 'react';
import Lottie from 'react-lottie'
import { withRedux } from '../../src/lib/redux'
import SwipeableViews from 'react-swipeable-views';
import { useSelector, useDispatch } from 'react-redux'
import Map from '../../src/components/Map/Map';
import {
	Content,
	FlexboxGrid,
	Button
} from 'rsuite';
import { GameState } from '../../src/constants';
import * as chat from '../../src/db/chat.json';
import * as status from '../../src/db/status.json';
import { AppWithAuthorization } from "../../src/components/App";
import { db } from "../../src/firebase";
import Router from "next/router"

require('rsuite/lib/styles/index.less');

const chatOptions = {
	loop: true,
	autoplay: true,
	animationData: chat.default,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice'
	}
};

const statusOptions = {
	loop: true,
	autoplay: true,
	animationData: status.default,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice'
	}
};

const useGame = () => {
	const currentGameState = useSelector(state => state.gameState)
	const dispatch = useDispatch()
	const CurrentGame = useSelector(state => state.currentGame)
	const gameValues = useSelector(state => state.currentGameValues)
	const userValues = useSelector(state => state.userValues)
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
	const getCurrentGame = () =>{
		console.log(db.getGameId(AuthUser.uid));
	}

	return { currentGameState, gameValues, gameChat, gameMain, gameStatus, getCurrentGame, CurrentGame, AuthUser }
}

const Game = () => (
    <AppWithAuthorization>
        <GameBase />
    </AppWithAuthorization>
);

const GameBase = () => {
	const { currentGameState, gameValues, gameChat, gameMain, gameStatus, getCurrentGame, CurrentGame, AuthUser } = useGame()
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
			<SwipeableViews index={currentGameState} onChangeIndex={handleChangeIndex}>
				<React.Fragment>
					<Content>
						<FlexboxGrid justify="center">
							<FlexboxGrid.Item colspan={24}>
								<br /><br /><br />
								<div className="animationBox">
									<Lottie
										options={chatOptions}
										isClickToPauseDisabled={true}
									/>
								</div>
							</FlexboxGrid.Item>
							<FlexboxGrid.Item colspan={17}>
								<br /><br />
								<FlexboxGrid justify="space-around">
									<FlexboxGrid.Item colspan={11}>
										<h2 className="center">Chat</h2>
										<Button size="lg" color="cyan" block onClick={gameMain}>Back</Button>
										<Button size="lg" color="cyan" block onClick={() => getCurrentGame()}>Back</Button>
									</FlexboxGrid.Item>
								</FlexboxGrid>
								<br />
							</FlexboxGrid.Item>
						</FlexboxGrid>
					</Content>
				</React.Fragment>
				<Map
				gameValues={gameValues}
				currentGame={CurrentGame}
				userId={AuthUser.uid}
				 />
				<React.Fragment>
					<Content>
						<FlexboxGrid justify="center">
							<FlexboxGrid.Item colspan={24}>
								<br /><br /><br />
								<div className="animationBox">
									<Lottie
										options={statusOptions}
										isClickToPauseDisabled={true}
									/>
								</div>
							</FlexboxGrid.Item>
							<FlexboxGrid.Item colspan={17}>
								<br /><br />
								<FlexboxGrid justify="space-around">
									<FlexboxGrid.Item colspan={11}>
										<h2 className="center">Status</h2>
										<Button size="lg" color="cyan" block onClick={gameMain}>Back</Button>
									</FlexboxGrid.Item>
								</FlexboxGrid>
								<br />
							</FlexboxGrid.Item>
						</FlexboxGrid>
					</Content>
				</React.Fragment>
			</SwipeableViews>
			<style jsx>{`
				.animationBox {
					height: 50vh;
				}
				.center{
					text-align: center;
				}
		`}</style>
		</React.Fragment >
	)
}

export default withRedux(Game);
