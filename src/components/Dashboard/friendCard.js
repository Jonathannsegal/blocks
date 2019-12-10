import React, { Component } from 'react';
import Lottie from 'react-lottie'
import * as trophy from '../../db/trophy.json'
import {
    Panel,
    Placeholder,
    FlexboxGrid,
    Avatar,
    Grid,
    Row,
    Col
} from 'rsuite';

const trophyOptions = {
    loop: true,
    autoplay: true,
    animationData: trophy.default,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};


class FriendCard extends Component {
    render() {
        return (
            <div className="cardContent">
                <Panel shaded>
                    <FlexboxGrid justify="start">
                        <FlexboxGrid.Item colspan={8}>
                            <Avatar
                                circle
                                size="sm"
                                src="https://avatars2.githubusercontent.com/u/12592949?s=460&v=4"
                            />
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item colspan={8}>
                            <p className="username">{this.props.username}</p>
                            <p className="location"> {this.props.location}</p>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>

                    <FlexboxGrid justify="center">
                        <FlexboxGrid.Item colspan={6}>
                            <Lottie
                                height={18}
                                width={18}
                                options={trophyOptions}
                                isClickToPauseDisabled={true}
                            />
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item colspan={6}>
                            {this.props.score}
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </Panel >
                <style jsx>{`
                .username{
                    line-height: 1em;
                }
                .location{
                    line-height: 0em;
                    font-size: 0.8em;
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

export default FriendCard