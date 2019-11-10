import React from 'react';
import Lottie from 'react-lottie'
import * as articulation from '../../src/db/articulation.json'
import {
    Content,
    FlexboxGrid,
    Button
} from 'rsuite';
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
                <FlexboxGrid.Item colspan={18}>
                    <br /><br /><br />
                    <Lottie
                        options={articulationOptions}
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
    </React.Fragment >
);

export default create;
