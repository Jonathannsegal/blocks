import React from 'react';
import Lottie from 'react-lottie'
import * as loop from '../../src/db/loop.json'
import {
    Content,
    FlexboxGrid,
    Button,
    Navbar,
    Nav,
    Icon,
    Header,
    Container
} from 'rsuite';
require('rsuite/lib/styles/index.less');

const loopOptions = {
    loop: true,
    autoplay: true,
    animationData: loop.default,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const search = () => (
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
            </Header>
            <Content>
                <FlexboxGrid justify="center">
                    <FlexboxGrid.Item colspan={18}>
                        <br /><br /><br />
                        <Lottie
                            options={loopOptions}
                            isClickToPauseDisabled={true}
                        />
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={17}>
                        <br /><br />
                        <FlexboxGrid justify="space-around">
                            <FlexboxGrid.Item colspan={11}>
                                <Button size="lg" color="cyan" block href="/dashboard">Back</Button>
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item colspan={11}>
                                <Button size="lg" color="cyan" block href="/game">Game</Button>
                            </FlexboxGrid.Item>
                        </FlexboxGrid>
                        <br />
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Content>
        </Container>
    </React.Fragment >
);

export default search;

