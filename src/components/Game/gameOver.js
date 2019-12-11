import React, { Component } from 'react';
import Map from '../Stats/Map';
import { db } from "../../firebase";
import { db as dbSnapshot } from "../../firebase/firebase";
import {
    Content,
    Footer,
    FlexboxGrid,
    Button,
    List,
    Header
} from 'rsuite';
import Router from "next/router"
import { GameStateGlobal } from '../../constants';
require('rsuite/lib/styles/index.less');

class GameOver extends Component {
    state = {
        teams: []
    };

    componentDidMount() {
        db.doEndGame(this.props.currentGame, GameStateGlobal.Finished);
        dbSnapshot.collection('games').doc(this.props.currentGame).collection('teams').onSnapshot(
            function (querySnapshot) {
                let team = [];
                querySnapshot.forEach(function (doc) {
                    team.push(doc.data());
                })
                this.setState({ teams: team });
            }.bind(this)
        ).bind(this);

        let score = 0;

        for (let i = 0; i < this.props.GameTeamList.length; i++) {
            if (this.props.GameTeamList[i].id == this.props.playerValues.teamId) {
                score = this.props.GameTeamList[i].score;
            }
        }
        db.getUserScore(this.props.AuthUser.uid).then(
            values => db.updateUserScore(this.props.AuthUser.uid, values.score + score));
    }
    render() {
        return (
            <React.Fragment>
                <Header>
                    <FlexboxGrid justify="center">
                        <FlexboxGrid.Item colspan={15}>
                            <br />
                            <h2 className="center">Game Over</h2>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </Header>
                <Content>
                    <div className="teamListHeight">
                        <FlexboxGrid justify="center">
                            <FlexboxGrid.Item colspan={20}>
                                <br />
                                {/* <Button size="lg" color="cyan" block onClick={() => this.props.gameMain()}>Back</Button> */}
                                <List>
                                    {this.state.teams.map((item, index) =>
                                        <List.Item key={index} index={index}>
                                            <div className="color" style={{ backgroundColor: `${item.color}` }} />
                                            <div className="teamName">
                                                <h4>{item.name}</h4>
                                                <div className="teamName">Score: {item.score}</div>
                                            </div>
                                        </List.Item>
                                    )}
                                </List>
                            </FlexboxGrid.Item>
                        </FlexboxGrid>
                    </div>
                </Content>
                <div className="bottomFooter">
                    <Footer>
                        <FlexboxGrid justify="center">
                            <FlexboxGrid.Item colspan={15}>
                                <Button size="lg" color="cyan" block onClick={() => Router.push('/dashboard')}>Home</Button>
                            </FlexboxGrid.Item>
                        </FlexboxGrid>
                    </Footer>
                </div>
                <style jsx>{`
                .color{
                    height: 3.8em;
                    // margin-top: -0.6em;
                    width: 2em;
                    float: left;
                    display:inline-block;
                }
                .teamName{
                    margin-left: 1em;
                    display:inline-block;
                }
                .bottomFooter{
                    width: 100vw;
                    position: fixed;
                    bottom: 0;
                    margin-bottom: 4em;
                }
				.animationBox {
					height: 50vh;
				}
				.center{
					text-align: center;
                }
                .teamListHeight{
                    // margin-top: 14em;
                    height: 75vh;
                    overflow: scroll;
                }
		`}</style>
            </React.Fragment >
        );
    }
}

export default GameOver;
