import React, { Component } from 'react';
import Map from '../Stats/Map';
import { db } from "../../firebase";
import { db as dbSnapshot } from "../../firebase/firebase";
import {
    Content,
    Footer,
    FlexboxGrid,
    Button,
    List
} from 'rsuite';
require('rsuite/lib/styles/index.less');

class Status extends Component {
    state = {
        teams: [
            'Roses are red',
            'Violets are blue',
            'Sugar is sweet',
            'And so are you'
        ]
    };

    componentDidMount() {
        dbSnapshot.collection('games').doc(this.props.currentGame).collection('teams').onSnapshot(
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
                <Content>
                    <div className="teamListHeight">
                        <FlexboxGrid justify="center">
                            <FlexboxGrid.Item colspan={20}>
                                <br /><br /><br />
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
                        <Map gameValues={this.props.gameValues} />
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
                }
				.animationBox {
					height: 50vh;
				}
				.center{
					text-align: center;
                }
                .teamListHeight{
                    // margin-top: 14em;
                    height: 65vh;
                    overflow: scroll;
                }
		`}</style>
            </React.Fragment >
        );
    }
}

export default Status;
