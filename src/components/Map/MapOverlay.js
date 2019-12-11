import React from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
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

const useMapOverlay = () => {
    return useSelector(
        state => ({
            lastUpdate: state.lastUpdate,
            light: state.light,
        }),
        shallowEqual
    )
}

const getTime = time => {
    const dispatch = useDispatch()
    const gameValues = useSelector(state => state.currentGameValues)
    let endTime = new Date(gameValues.endTime * 1000);
    let currentTime = new Date(time * 1000);
    let timeInSeconds = parseInt((endTime - currentTime) / 1000);
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    const timeString = minutes.toString().padStart(2, '0') + ':' +
        seconds.toString().padStart(2, '0');
    if (timeInSeconds < 1) {
        dispatch({
            type: 'GAMEISOVER_TRUE'
        })
    }
    return timeString;
}

const MapOverlay = () => {
    const { lastUpdate, light } = useMapOverlay()
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
                                    {getTime(lastUpdate)}
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