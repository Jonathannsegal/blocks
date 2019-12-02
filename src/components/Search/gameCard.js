import React, { Component } from 'react';
import Lottie from 'react-lottie'
import * as playbutton from '../../db/playbutton.json'
import {
    Panel,
    FlexboxGrid
} from 'rsuite';

const playbuttonOptions = {
    loop: true,
    autoplay: true,
    animationData: playbutton.default,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};


class GameCard extends Component {
    render() {
        return (
            <div className="cardContent" >
                <Panel shaded onClick={() => { this.props.goToGame(this.props.roomData.id) }}>
                    <FlexboxGrid justify="start" align="middle">
                        <FlexboxGrid.Item colspan={18}>
                            <p className="name">{this.props.roomData.name}</p>
                            <p className="location"> location</p>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item colspan={3}>
                            <div className="playIcon">
                                <Lottie
                                    height={60}
                                    width={60}
                                    options={playbuttonOptions}
                                    isClickToPauseDisabled={true}
                                />
                            </div>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </Panel >
                <br />
                <style jsx>{`
                    .name{
                        margin-top: -0.5em;
                        margin-left: 0.6em;
                        line-height: 1em;
                        font-size: 1.5em;
                    }
                    .location{
                        margin-left: 1em;
                        line-height: 0.2em;
                        font-size: 1em;
                    }
                    .playIcon{
                        margin-left: 1em;
                        margin-top: -2em;
                        margin-bottom: -2em;
                    }
                    .cardContent{
                        min-width: 150px;
                        margin-left: 0.5em;
                        margin-right: 0.5em;
                    }
            `}</style>
            </div>
        )
    }
}

export default GameCard