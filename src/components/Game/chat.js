import React, { Component } from 'react';
import { db } from "../../firebase";
import { db as dbSnapshot } from "../../firebase/firebase";
import {
    Content,
    FlexboxGrid,
    Button,
    Input,
    InputGroup,
    Footer,
    Icon,
    Form,
    List
} from 'rsuite';
require('rsuite/lib/styles/index.less');

class Chat extends Component {
    state = {
        messageText: "",
        messages: []
    };

    sendMessage = () => {
        const timeStamp = Date.now();
        db.doSendMessage(
            this.props.currentGame,
            timeStamp + this.props.userId.uid,
            timeStamp,
            this.state.messageText,
            this.props.userId.uid,
            this.props.userId.displayName,
            this.props.playerValues.team);
        this.setState({ messageText: "" });
    }

    componentDidMount() {
        dbSnapshot.collection('games').doc("jdsSFvXOOzOovxhLarHSm70syKo21575772593813").collection('messages').onSnapshot(
            function (querySnapshot) {
                let snapshotMessages = [];
                querySnapshot.forEach(function (doc) {
                    snapshotMessages.push(doc.data());
                })
                this.setState({ messages: snapshotMessages });
            }.bind(this)
        ).bind(this)
    }

    render() {
        const styles = {
            width: 350,
            marginBottom: 20
        };
        return (
            <React.Fragment>
                <div className="fixedHeader">
                    <Content>
                        <FlexboxGrid justify="center">
                            <FlexboxGrid.Item colspan={17}>
                                <br />
                                <FlexboxGrid justify="space-around">
                                    <FlexboxGrid.Item colspan={11}>
                                        <h2 className="center">Chat</h2>
                                    </FlexboxGrid.Item>
                                </FlexboxGrid>
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item colspan={18}>
                                <div className="contentContainer">
                                    <List>
                                        {this.state.messages.map((item, index) =>
                                            <List.Item key={index} index={item}>
                                                <h6>{item.username}</h6> {item.text}
                                            </List.Item>
                                        )}
                                    </List>
                                </div>
                            </FlexboxGrid.Item>
                        </FlexboxGrid>
                    </Content>
                </div>
                <div className="bottomFooter">
                    <Footer>
                        <FlexboxGrid justify="center">
                            <FlexboxGrid.Item>
                                <Form onSubmit={event => {
                                    event.preventDefault();
                                    this.sendMessage();
                                }}>
                                    <InputGroup inside style={styles}>
                                        <Input value={this.state.messageText} onChange={value => this.setState({ messageText: value })} />
                                        <InputGroup.Button type="submit" onClick={event => {
                                            event.preventDefault();
                                            this.sendMessage();
                                        }}>
                                            <Icon icon="send" />
                                        </InputGroup.Button>
                                    </InputGroup>
                                </Form>
                            </FlexboxGrid.Item>
                        </FlexboxGrid>
                    </Footer>
                </div>
                <style jsx>{`
                .fixedHeader {
                    z-index: 1;
                    position: fixed;
                    width: 100vw;
                }
                .contentContainer::-webkit-scrollbar {
                    display: none;
                }
                .contentContainer{
                    height: auto;
                    overflow: scroll;
                }
                .bottomFooter{
                    width: 100vw;
                    padding-top: 2em;
                    position: fixed;
                    bottom: 0;
                    background-color: #ffffff;
                }
				.animationBox {
					height: 50vh;
				}
				.center{
					text-align: center;
				}
		`}</style>
            </React.Fragment >
        );
    }
}

export default Chat;
