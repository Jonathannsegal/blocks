import React from 'react';
import Lottie from 'react-lottie'
import { withRedux } from '../../src/lib/redux'
import SwipeableViews from 'react-swipeable-views';
import { useSelector, useDispatch } from 'react-redux'
import Map from '../../src/components/Map/MapExport';
import {
	Content,
	FlexboxGrid,
	Button
} from 'rsuite';
import { GameState } from '../../src/constants';
import * as chat from '../../src/db/chat.json';
import * as status from '../../src/db/status.json';

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
	return { currentGameState, gameChat, gameMain, gameStatus }
}

const Game = () => {
	const { currentGameState, gameChat, gameMain, gameStatus } = useGame()
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
									</FlexboxGrid.Item>
								</FlexboxGrid>
								<br />
							</FlexboxGrid.Item>
						</FlexboxGrid>
					</Content>
				</React.Fragment>
				<Map />
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
