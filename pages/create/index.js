import React from 'react';
import Lottie from 'react-lottie'
import { withRedux } from '../../src/lib/redux'
import * as articulation from '../../src/db/articulation.json'
import {
    Content,
    FlexboxGrid,
    Button,
    Form,
    FormGroup,
    ControlLabel,
    ButtonToolbar,
    FormControl
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

const create = () => (
    <React.Fragment>
        <Content>
            <FlexboxGrid justify="center">
                {/* <FlexboxGrid.Item colspan={18}>
                    <br /><br /><br />
                    <Lottie
                        options={articulationOptions}
                        isClickToPauseDisabled={true}
                    />
                </FlexboxGrid.Item> */}
                <FlexboxGrid.Item colspan={17}>
                    <br /><br />
                    <FlexboxGrid justify="space-around">
                        <FlexboxGrid.Item colspan={11}>
                            <Button size="lg" color="cyan" block href="/dashboard">Back</Button>
                        </FlexboxGrid.Item>
                        {/* <FlexboxGrid.Item colspan={11}>
                            <Button size="lg" color="cyan" block href="/game">Game</Button>
                        </FlexboxGrid.Item> */}
                    </FlexboxGrid>
                    <br />
                </FlexboxGrid.Item>
            </FlexboxGrid>
            <FlexboxGrid justify="center">
                <FlexboxGrid.Item colspan={18}>
                    <Form fluid>
                        <FormGroup>
                            <ControlLabel>Name</ControlLabel>
                            <FormControl name="test" placeholder="Iowa State Campus" />
                        </FormGroup>
                        <div className="content2">
                            <Map />
                        </div>
                        <br />
                        <FormGroup>
                            <FlexboxGrid justify="space-around">
                                <FlexboxGrid.Item colspan={11}>
                                    <Button size="lg" appearance="primary" color="cyan" type="submit">Make Game</Button>
                                </FlexboxGrid.Item>
                            </FlexboxGrid>
                        </FormGroup>
                    </Form>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </Content>
        <style jsx>{`
                    .content2 {
                        height: 30vh;
                        width: 100%;
                    }
				`}</style>
    </React.Fragment >
);

export default withRedux(create);
