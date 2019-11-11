import React from 'react';
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


const LeaderBoardCard = () => {
    const { Paragraph } = Placeholder;
    return (
        <div className="cardContent">
            <Panel shaded>
                {/* <Grid fluid>
                    <Row>
                        <Col xs={6}>
                            <Avatar
                                circle
                                size="lg"
                                src="https://avatars2.githubusercontent.com/u/12592949?s=460&v=4"
                            />
                        </Col>
                        <Col xs={8}>
                            <p className="username">Username</p>
                            <p className="location"> location</p>
                        </Col>
                        <Col xs={6} xsPush={2}>
                            <Lottie
                                height={25}
                                width={25}
                                options={trophyOptions}
                                isClickToPauseDisabled={true}
                            />
                        </Col>
                        <Col xs={4} xsPush={0}>
                            <p>###</p>
                        </Col>
                    </Row>
                </Grid> */}
                <FlexboxGrid justify="start" align="middle">
                    <FlexboxGrid.Item colspan={6}>
                        <Avatar
                            circle
                            size="lg"
                            src="https://avatars2.githubusercontent.com/u/12592949?s=460&v=4"
                        />
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={10}>
                        <p className="username">Username</p>
                        <p className="location"> location</p>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={3}>
                        <div className="scoreIcon">
                            <Lottie
                                height={30}
                                width={30}
                                options={trophyOptions}
                                isClickToPauseDisabled={true}
                            />
                        </div>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={4}>
                        <p className="score"> ###</p>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Panel >
            <br />
            <style jsx>{`
                .username{
                    margin-top: -1em;
                    margin-left: -0.3em;
                    line-height: 1em;
                    font-size: 1.5em;
                }
                .location{
                    margin-left: 0em;
                    line-height: 0.2em;
                    font-size: 1em;
                }
                .scoreIcon{
                    margin-top: -1em;
                }
                .score{
                    margin-top: -0.5em;
                    font-size: 2em;
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

export default LeaderBoardCard