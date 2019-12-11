import React from 'react';
import { useSelector, shallowEqual } from 'react-redux'
import Lottie from 'react-lottie'
import Link from 'next/link';
import * as loop from '../../db/loop.json'
import {
    Content,
    FlexboxGrid,
    Button,
    Input,
    InputGroup,
    Footer,
    Header,
    Icon,
    Form,
    List
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

const userMapOverlay = () => {
    return useSelector(
        state => ({
            lastUpdate: state.lastUpdate,
            light: state.light,
        }),
        shallowEqual
    )
}

const formatTime = time => {
    return new Date(time).toJSON().slice(14, 19)
}

const MapOverlay = () => {
    const { lastUpdate, light } = userMapOverlay()
    return (
        <React.Fragment>
            <div className="overlay">
                <div className="animationMargin">
                    <div className="animationPosition">
                        <Link href="/dashboard">
                            <a>
                                <Lottie
                                    height={60}
                                    width={60}
                                    options={loopOptions}
                                    isClickToPauseDisabled={true}
                                />
                            </a>
                        </Link>
                    </div>
                    <FlexboxGrid justify="center">
                        <FlexboxGrid.Item>
                            <div className="clockDiv">
                                <h2 className={light ? 'light' : ''}>
                                    {formatTime(lastUpdate)}
                                </h2>
                            </div>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </div>
            </div>
            <style jsx>{`
                .clockDiv{
                    background-color: rgba(0,0,0,0.5);
                    color: #ffffff;
                    padding: 0.5em 1.5em;
                    width: 32vw;
                    border-radius: 25px;
                }
                .animationPosition{
                    top: 0;
                    left: 0;
                    position: absolute;
                    float: left;
                }
                .overlay{
                    position: fixed;
                    z-index: 99;
                    background-color: transparent;
                    width: 100vw;
                }
                .animationMargin{
                    margin: 1em;
                }
		`}</style>
        </React.Fragment >
    );
}

export default MapOverlay;