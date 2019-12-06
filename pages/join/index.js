import React from 'react';
import Map from '../../src/components/Stats/Map'
import { useDispatch, useSelector } from 'react-redux'
import { db } from "../../src/firebase";
import { withRedux } from '../../src/lib/redux'
import Router from "next/router"
import { JoinState } from '../../src/constants';
import { CirclePicker } from 'react-color';
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
    Modal,
    List,
    Form,
    ButtonToolbar,
    FormGroup,
    FormControl,
    ControlLabel,
    HelpBlock
} from 'rsuite';
require('rsuite/lib/styles/index.less');

const useJoin = () => {
    const dispatch = useDispatch()
    const CurrentGame = useSelector(state => state.currentGame)
    const gameValues = useSelector(state => state.currentGameValues)
    const AuthUser = useSelector(state => state.authUser)
    const currentState = useSelector(state => state.joinState)
    const teamCreateValues = useSelector(state => state.createTeamFormValue)

    const createTeam = () => {
        db.doAddTeamToGame(CurrentGame, teamCreateValues.name, teamCreateValues.color);
        dispatch({
            type: 'joinMain'
        })
    }
    const close = () => {
        dispatch({
            type: 'joinMain'
        })
    }
    const open = () => {
        dispatch({
            type: 'joinTeam'
        })
    }
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

    const setUserCurrentGame = () => {
        db.doSetGame(AuthUser.uid, CurrentGame);
    }
    const setCurrentGame = (input) => (
        dispatch({
            type: 'SET_CURRENTGAME',
            input
        })
    )
    const goToGameFunction = () => {
        setCurrentGame(CurrentGame);
        Router.push('/game');
    }
    const updateTeamName = (input) => (
        dispatch({
            type: 'UPDATE_TEAMCREATE_NAME',
            payload: { txt: input }
        })
    )
    const updateTeamColor = (color) => (
        dispatch({
            type: 'UPDATE_TEAMCREATE_COLOR',
            color
        })
    )

    return { updateTeamName, updateTeamColor, createTeam, currentState, close, open, joinGame, gameValues, CurrentGame, setUserCurrentGame, goToGameFunction, setCurrentGame }
}



const join = () => (
    <AppWithAuthorization>
        <JoinBase />
    </AppWithAuthorization>
);

const JoinBase = () => {
    const { updateTeamName, updateTeamColor, createTeam, currentState, close, open, joinGame, gameValues, CurrentGame, setUserCurrentGame, goToGameFunction, setCurrentGame } = useJoin()
    return (
        <React.Fragment>
            <Modal size='xs' show={currentState == JoinState.teamCreate} onHide={() => close()}>
                <Modal.Header>
                    <Modal.Title>Make a Team</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <br />
                    <FlexboxGrid justify="center">
                        <FlexboxGrid.Item colspan={18}>
                            <Form fluid>
                                <FormGroup>
                                    <ControlLabel>Name</ControlLabel>
                                    <FormControl onChange={value => updateTeamName(value)} name="name" placeholder="Team Name" />
                                </FormGroup>
                                <br />
                                <FormGroup>
                                    <CirclePicker onChange={value => updateTeamColor(value.hex)} />
                                </FormGroup>
                            </Form>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                    <br />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => createTeam()} appearance="primary">
                        Create
                    </Button>
                    <Button onClick={() => close()} appearance="subtle">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

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
                                <Button onClick={() => open()} color="cyan" size="lg" appearance="primary">Make a Team</Button>
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
                    <br />
                    <FlexboxGrid>
                        <Button onClick={() => setUserCurrentGame()} color="cyan" size="lg" appearance="primary">Set Game</Button>
                    </FlexboxGrid>
                    <br />
                    <FlexboxGrid>
                        <Button onClick={() => goToGameFunction()} color="cyan" size="lg" appearance="primary">Game</Button>
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
