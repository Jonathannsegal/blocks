import React from 'react';
import Map from '../../src/components/Stats/Map'
import { useDispatch, useSelector } from 'react-redux'
import { db } from "../../src/firebase";
import { withRedux } from '../../src/lib/redux'
import Router from "next/router"
import { AppWithAuthorization } from "../../src/components/App";
import {
    Content,
    FlexboxGrid,
    Navbar,
    Nav,
    Icon,
    Header,
    Footer,
    Button,
    Container,
    List
} from 'rsuite';
require('rsuite/lib/styles/index.less');

const useJoin = () => {
    const dispatch = useDispatch()
    const CurrentGame = useSelector(state => state.currentGame)
    const gameValues = useSelector(state => state.currentGameValues)
    const AuthUser = useSelector(state => state.authUser)
    let functionGameValues = function (gameId) {
        if (gameId == null) {
            gameId = "none";
        }
        return db.onceGetGames(gameId)
            .then(value => {
                if (value == "No such document!") {
                    Router.push('/dashboard');
                }
                return value;
            });
    }
    let currentGameValues = functionGameValues(CurrentGame);
    currentGameValues.then(function (values) {
        dispatch({
            type: 'CURRENT_GAMEVALUE_SET',
            values
        })
    });
    const joinGame = () => {
        db.doAddPlayerToGame(CurrentGame, AuthUser.uid, "data");
    }

    return { joinGame, gameValues, CurrentGame }
}

const join = () => (
    <AppWithAuthorization>
        <JoinBase />
    </AppWithAuthorization>
);

const JoinBase = () => {
    const { joinGame, gameValues, CurrentGame } = useJoin()
    return (
        <React.Fragment>
            <Container>
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
                            <FlexboxGrid justify="space-around">
                                <h2 className="sectionTitle">Choose a team</h2>
                            </FlexboxGrid>
                        </FlexboxGrid.Item>
                        {/* <FlexboxGrid.Item colspan={18}>
                            <FlexboxGrid justify="space-around">
                                <h6 className="sectionTitle">{CurrentGame}</h6>
                            </FlexboxGrid>
                        </FlexboxGrid.Item> */}
                        <FlexboxGrid.Item colspan={18}>
                            <br />
                            <FlexboxGrid justify="space-around">
                                <Button onClick={() => joinGame()} color="cyan" size="lg" appearance="primary">Make a Team</Button>
                            </FlexboxGrid>
                            <br />
                            {/* <FlexboxGrid justify="space-around">
                                <Button onClick={() => joinGame()} color="cyan" size="lg" appearance="primary">Join Game</Button>
                            </FlexboxGrid>
                            <br /> */}
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </Header>
                <Content>
                    <FlexboxGrid>
                        <Button onClick={() => joinGame()} color="cyan" size="lg" appearance="primary">Join Game</Button>
                    </FlexboxGrid>
                </Content>
                <div className="bottomFooter">
                    <Footer>
                        <Map gameValues={gameValues} />
                    </Footer>
                </div>
            </Container>
            <style jsx>{`
                .sectionTitle {
                    line-height: 1.5em;
                }
                .bottomFooter{
                    position: fixed;
                    bottom: 0;
                }
		`}</style>
        </React.Fragment >
    )
}

export default withRedux(join);

