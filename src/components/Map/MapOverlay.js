import React from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import Lottie from 'react-lottie'
import Link from 'next/link';
import { db as dbSnapshot } from "../../firebase/firebase";
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

const getTeamList = () => {
    const dispatch = useDispatch()
    const teamList = useSelector(state => state.currentGameTeamList)
    // const CurrentGame = useSelector(state => state.currentGame)
    // dbSnapshot.collection('games').doc(CurrentGame).collection('teams').onSnapshot(
    //     function (querySnapshot) {
    //         let list = [];
    //         querySnapshot.forEach(function (doc) {
    //             list.push(doc.data());
    //         })
    //         if (list[0].score != teamList[0].score) {
    //             dispatch({
    //                 type: 'GET_TEAMLIST',
    //                 list
    //             })
    //         }
    //     }
    // );
    return { teamList };
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
    const { teamList } = getTeamList();
    return (
        <React.Fragment>
            {console.log(teamList)}
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

                    <div className="ScorePosition">
                        <FlexboxGrid justify="center">
                            <FlexboxGrid.Item>
                                {teamList.map(values => {
                                    return (
                                        <div className={light ? 'light' : ''}>
                                            <div style={{ backgroundColor: `${values.color}` }} className="ScoreDiv">{values.score}</div>
                                        </div>
                                    );
                                }
                                )}
                            </FlexboxGrid.Item>
                        </FlexboxGrid>
                    </div>
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
                .ScoreDiv{
                    // background-color: rgba(0,0,0,0.5);
                    color: #000;
                    margin: 1em 0;
                    padding: 0.5em 4em 0.5em 1.5em;
                    width: 10vw;
                    border-radius: 25px 0 0 25px;
                }
                .ScorePosition{
                    top: 0;
                    right: 0;
                    position: absolute;
                    float: left;
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