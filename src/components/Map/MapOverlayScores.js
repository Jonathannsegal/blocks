import React, { Component } from 'react';
import { db as dbSnapshot } from "../../firebase/firebase";
import {
    FlexboxGrid,
} from 'rsuite';
require('rsuite/lib/styles/index.less');

class MapOverlayScores extends Component {
    state = {
        teams: []
    };

    componentDidMount() {
        dbSnapshot.collection('games').doc(this.props.CurrentGame).collection('teams').onSnapshot(
            function (querySnapshot) {
                let team = [];
                querySnapshot.forEach(function (doc) {
                    team.push(doc.data());
                })
                this.setState({ teams: team });
            }.bind(this)
        ).bind(this);
    }
    render() {
        return (
            <React.Fragment>
                <div className="overlay">
                    <div className="ScorePosition">
                        <FlexboxGrid justify="center">
                            <FlexboxGrid.Item>
                                {this.state.teams.map(values => {
                                    return (
                                        <div style={{ backgroundColor: `${values.color}` }} className="ScoreDiv">{values.score}</div>
                                    );
                                }
                                )}
                            </FlexboxGrid.Item>
                        </FlexboxGrid>
                    </div>
                </div>
                <style jsx>{`
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
}

export default MapOverlayScores;