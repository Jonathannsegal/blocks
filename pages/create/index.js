import React from 'react';
import Lottie from 'react-lottie'
import { useDispatch, useSelector } from 'react-redux'
import { withRedux } from '../../src/lib/redux'
import { db } from "../../src/firebase";
import Router from "next/router"
import firebase from "firebase/app";
import * as createheader from '../../src/db/createheader.json'
import {
    Content,
    FlexboxGrid,
    Button,
    Form,
    FormGroup,
    ControlLabel,
    FormControl,
    Navbar,
    Nav,
    Icon,
    Header,
    Container,
    InputGroup,
    Input
} from 'rsuite';
import { GameStateGlobal } from '../../src/constants'
import Map from '../../src/components/Create/MapExport';
import { AppWithAuthorization } from "../../src/components/App";
require('rsuite/lib/styles/index.less');

const createheaderOptions = {
    loop: true,
    autoplay: true,
    animationData: createheader.default,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const useCreate = () => {
    const dispatch = useDispatch()
    const authUserUid = useSelector(state => state.authUser)
    const createGameValues = useSelector(state => state.createGameFormValue)
    const setCurrentGame = (input) => (
        dispatch({
            type: 'SET_CURRENTGAME',
            input
        })
    )
    const updateObjectivesNumber = (input) => (
        dispatch({
            type: 'UPDATE_GAMECREATE_NUMBEROFOBJECTIVES',
            input
        })
    )
    const updateGameName = (input) => (
        dispatch({
            type: 'UPDATE_GAMECREATE_NAME',
            payload: { txt: input }
        })
    )
    const updateGameGeometry = (geometry) => (
        dispatch({
            type: 'UPDATE_GAMECREATE_GEO',
            geometry
        })
    )
    const callbackFunction = (childData) => (
        updateGameGeometry(childData)
    )
    let objectiveArray = [];
    const anotherCallbackFunction = (childData) => (
        objectiveArray = childData
    )
    const onGameCreate = () => {
        let shape = [];
        let gameName = authUserUid.uid + Date.now();
        let gameCreator = authUserUid.uid;
        for (let i = 0; i < createGameValues.geometry[0].geometry.coordinates[0].length; i++) {
            shape.push(new firebase.firestore.GeoPoint(
                createGameValues.geometry[0].geometry.coordinates[0][i][1],
                createGameValues.geometry[0].geometry.coordinates[0][i][0])
            );
        }
        db
            .doCreateGame(
                gameCreator,
                gameName,
                createGameValues.name,
                shape,
                Date.now(),
                GameStateGlobal.Created
            )
            .then(() => {
                for (var i = 0; i < objectiveArray.length; i++) {
                    db.doUpdateObjectives(gameName, i, new firebase.firestore.GeoPoint(objectiveArray[i].latitude, objectiveArray[i].longitude));
                }
                setCurrentGame(gameName);
                Router.push('/join');
            })
            .catch(error => {
                console.log(error);
            });
    }
    return { createGameValues, onGameCreate, callbackFunction, updateGameName, updateObjectivesNumber, anotherCallbackFunction }
}

const create = () => (
    <AppWithAuthorization>
        <CreateBase />
    </AppWithAuthorization>
);

const CreateBase = () => {
    const { createGameValues, onGameCreate, callbackFunction, updateGameName, updateObjectivesNumber, anotherCallbackFunction } = useCreate();
    const { useRef } = React;
    let map = useRef();
    const activateMap = () => {
        map.current._createObjectives(createGameValues.numberOfObjectives);
    }
    return (
        <React.Fragment >
            <Container>
                <Header>
                    <Navbar appearance="subtle">
                        <Navbar.Body>
                            <Nav>
                                <Nav.Item icon={<Icon icon="chevron-left" />} href="/dashboard">Back</Nav.Item>
                            </Nav>
                        </Navbar.Body>
                    </Navbar>
                </Header>
                <Content>
                    <FlexboxGrid justify="center">
                        <FlexboxGrid.Item colspan={24}>
                            <Lottie
                                height={140}
                                options={createheaderOptions}
                                isClickToPauseDisabled={true}
                            />
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                    <FlexboxGrid justify="center">
                        <FlexboxGrid.Item colspan={18}>
                            <Form fluid>
                                <FormGroup>
                                    <ControlLabel>Name</ControlLabel>
                                    <FormControl onChange={value => updateGameName(value)} name="test" placeholder="Campus Challange" />
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>How many points?</ControlLabel>
                                    <InputGroup>
                                        <Input onChange={value => updateObjectivesNumber(value)} />
                                        <InputGroup.Button onClick={() => activateMap()}>
                                            Make Points
                                        </InputGroup.Button>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <div className="content2">
                                        <Map
                                            parentCallback={callbackFunction}
                                            anotherCallback={anotherCallbackFunction}
                                            ref={map} />
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <FlexboxGrid justify="space-around">
                                        <FlexboxGrid.Item colspan={18}>
                                            <Button block size="lg" appearance="primary" color="cyan" onClick={onGameCreate} type="submit">Make Game</Button>
                                        </FlexboxGrid.Item>
                                    </FlexboxGrid>
                                </FormGroup>
                            </Form>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </Content>
                <style jsx>{`
                    .content2 {
                        height: 25em;
                        width: 100%;
                    }
				`}</style>
            </Container>
        </React.Fragment >
    )
}

export default withRedux(create);
