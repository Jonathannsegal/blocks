import React from 'react';
import Lottie from 'react-lottie'
import { useDispatch, useSelector } from 'react-redux'
import * as searching from '../../src/db/searching.json'
import { db } from "../../src/firebase";
import { withRedux } from '../../src/lib/redux'
import Router from "next/router"
import {
    Content,
    FlexboxGrid,
    Navbar,
    Nav,
    Icon,
    Header,
    Container
} from 'rsuite';
import GameCard from '../../src/components/Search/gameCard'
require('rsuite/lib/styles/index.less');

const searchingOptions = {
    loop: true,
    autoplay: true,
    animationData: searching.default,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const useSearch = () => {
    const dispatch = useDispatch()
    const gameList = useSelector(state => state.searchGameList)
    let getGameList = function () {
        return db.onceGetGamesReadyToJoin()
            .then(list => {
                return list.docs.map(doc => doc.data());
            });
    }
    let currentGameList = getGameList();
    currentGameList.then(function (list) {
        dispatch({
            type: 'GET_GAMELIST',
            list
        })
    });
    const setCurrentGame = (input) => (
        dispatch({
            type: 'SET_CURRENTGAME',
            input
        })
    )
    const goToGameFunction = (gameId) => {
        setCurrentGame(gameId);
        Router.push('/join');
    }
    return { gameList, goToGameFunction }
}


const search = () => {
    const { gameList, goToGameFunction } = useSearch()
    return (
        < React.Fragment >
            <Container>
                <div className="fixedHeader">
                    <Header>
                        <Navbar appearance="subtle">
                            <Navbar.Body>
                                <Nav>
                                    <Nav.Item icon={<Icon icon="chevron-left" />} href="/dashboard">Back</Nav.Item>
                                </Nav>
                            </Navbar.Body>
                        </Navbar>
                        <FlexboxGrid justify="center">
                            <FlexboxGrid.Item colspan={18}>
                                <div className="paddingAnimation">
                                    <Lottie
                                        options={searchingOptions}
                                        isClickToPauseDisabled={true}
                                    />
                                </div>
                            </FlexboxGrid.Item>
                        </FlexboxGrid>
                    </Header>
                </div>
                <Content>
                    <FlexboxGrid justify="center">
                        <FlexboxGrid.Item colspan={24}>
                            <div className="leaderBoardHeight">
                                <FlexboxGrid justify="center">
                                    <FlexboxGrid.Item colspan={18}>
                                        {gameList.map(gameValues => (
                                            <GameCard goToGame={goToGameFunction} roomData={gameValues} />
                                        ))}
                                    </FlexboxGrid.Item>
                                </FlexboxGrid>
                            </div>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </Content>
            </Container>
            <style jsx>{`
            .paddingAnimation{
                padding-top: 1em;
                padding-bottom: 1em;
            }
            .fixedHeader {
                background-color: white;
                padding-bottom: 1em;
                z-index: 1;
                position: fixed;
                width: 100vw;
            }
            .leaderBoardHeight{
                margin-top: 24em;
            }
		`}</style>
        </React.Fragment >
    )
}

export default withRedux(search);

