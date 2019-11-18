import React from 'react';
import Lottie from 'react-lottie'
import { useDispatch } from 'react-redux'
import { withRedux } from '../../src/lib/redux'
import * as articulation from '../../src/db/articulation.json'
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
    Container
} from 'rsuite';
import Map from '../../src/components/Create/Map';
require('rsuite/lib/styles/index.less');

const articulationOptions = {
    loop: true,
    autoplay: true,
    animationData: articulation.default,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

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
    return { callbackFunction, updateGameName }
}

const create = () => {
    const { callbackFunction, updateGameName } = useCreate()
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
                                height={150}
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
                                <div className="content2">
                                    <Map value={"helloboiz"} parentCallback={callbackFunction} />
                                </div>
                                <br />
                                <FormGroup>
                                    <FlexboxGrid justify="space-around">
                                        <FlexboxGrid.Item colspan={18}>
                                            <Button block size="lg" appearance="primary" color="cyan" href="/join" type="submit">Make Game</Button>
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
