import React from 'react';
import Lottie from 'react-lottie'
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
import Map from '../../src/components/Create/MapExport';
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

const create = () => (
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
                                <FormControl name="test" placeholder="Campus Challange" />
                            </FormGroup>
                            <div className="content2">
                                <Map />
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
);

export default withRedux(create);
