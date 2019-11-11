import React from 'react';
import Lottie from 'react-lottie'
import { withRedux } from '../../src/lib/redux'
import SwipeableViews from 'react-swipeable-views';
import { useSelector, useDispatch } from 'react-redux'
import { DashboardState } from '../../src/constants';
import {
    Avatar,
    Container,
    Header,
    Content,
    Footer,
    Navbar,
    FlexboxGrid,
    ButtonToolbar,
    Nav,
    Icon,
    Dropdown,
    Panel,
    Placeholder,
    PanelGroup,
    Button,
    Row,
    Col,
    Grid
} from 'rsuite';
import * as ratings from '../../src/db/ratings.json'
import * as trophy from '../../src/db/trophy.json'
import FriendCard from '../../src/components/Dashboard/friendCard'
import LeaderBoardCard from '../../src/components/Dashboard/leaderBoardCard'
require('rsuite/lib/styles/index.less');

const ratingsOptions = {
    loop: true,
    autoplay: true,
    animationData: ratings.default,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const trophyOptions = {
    loop: true,
    autoplay: true,
    animationData: trophy.default,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

// import { AppWithAuthorization } from "../../src/components/App";

const useDashboard = () => {
    // const authUser = useSelector(state => state.authUser)
    // return { authUser }
    const currentDashboardState = useSelector(state => state.dashboardState)
    const dispatch = useDispatch()
    const dashboardProfile = () =>
        dispatch({
            type: 'dashboardProfile',
            dashboardState: DashboardState.profile
        })
    const dashboardHome = () =>
        dispatch({
            type: 'dashboardHome',
            dashboardState: DashboardState.home
        })
    const dashboardLeaderboard = () =>
        dispatch({
            type: 'dashboardLeaderboard',
            dashboardState: DashboardState.leaderboard
        })
    return { currentDashboardState, dashboardProfile, dashboardHome, dashboardLeaderboard }
}

const dashboard = () => {
    // const { authUser } = useDashboard()
    const { currentDashboardState, dashboardProfile, dashboardHome, dashboardLeaderboard } = useDashboard()
    const { Paragraph } = Placeholder;
    const handleChangeIndex = index => {
        if (index === DashboardState.profile) {
            dashboardProfile();
        } else if (index === DashboardState.home) {
            dashboardHome();
        } else {
            dashboardLeaderboard();
        }
    };
    return (
        // < AppWithAuthorization >
        // <h1>Account: {authUser.email}</h1>
        <div>
            <React.Fragment>
                <Container>
                    <div className="stickyHeader">
                        <Header>
                            <Navbar appearance="subtle">
                                <Navbar.Body>
                                    <Nav>
                                        <Nav.Item
                                            onClick={dashboardProfile}
                                            icon={
                                                <Avatar circle size="xs">JS</Avatar>
                                            }> Username
                                        </Nav.Item>
                                    </Nav>
                                    <Nav pullRight>
                                        <Nav.Item onClick={dashboardLeaderboard} icon={<Lottie
                                            height={18}
                                            width={18}
                                            options={trophyOptions}
                                            isClickToPauseDisabled={true}
                                        />}></Nav.Item>
                                    </Nav>
                                </Navbar.Body>
                            </Navbar>
                        </Header>
                    </div>
                    <SwipeableViews index={currentDashboardState} onChangeIndex={handleChangeIndex}>
                        <Content> <br /><br /><br />Profile</Content>
                        <Content>
                            <FlexboxGrid justify="center">
                                <FlexboxGrid.Item colspan={18}>
                                    <br /><br /><br />
                                    <div className="animationBox">
                                        <Lottie
                                            options={ratingsOptions}
                                            isClickToPauseDisabled={true}
                                        />
                                    </div>
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item colspan={18}>
                                    <h2 className="sectionTitle" >Play</h2>
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item colspan={17}>
                                    <FlexboxGrid justify="space-around">
                                        <FlexboxGrid.Item colspan={11}>
                                            <Button size="lg" color="cyan" block href="/create">Create</Button>
                                        </FlexboxGrid.Item>
                                        <FlexboxGrid.Item colspan={11}>
                                            <Button size="lg" color="cyan" block href="/search">Search</Button>
                                        </FlexboxGrid.Item>
                                    </FlexboxGrid>
                                    <br />
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item colspan={18}>
                                    <h2 className="sectionTitle">Friends</h2>
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item colspan={24}>
                                    <div className="card">
                                        <div className="cardContentEnds" />
                                        <FriendCard />
                                        <FriendCard />
                                        <FriendCard />
                                        <FriendCard />
                                        <FriendCard />
                                        <div className="cardContentEnds" />
                                    </div>
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item colspan={18}>
                                    <h2 className="sectionTitle">Past Games</h2>
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item colspan={17}>
                                    <Panel header="" shaded>
                                        <Paragraph rows={5} active />
                                    </Panel>
                                    <br />
                                    <Panel header="" shaded>
                                        <Paragraph rows={5} active />
                                    </Panel>
                                    <br />
                                    <Panel header="" shaded>
                                        <Paragraph rows={5} active />
                                    </Panel>
                                    <br />
                                </FlexboxGrid.Item>
                            </FlexboxGrid>
                        </Content>
                        <Content>
                            <br /><br /><br />
                            Leaderboard
                            <SwipeableViews >
                                <React.Fragment>
                                    <LeaderBoardCard />
                                    <LeaderBoardCard />
                                    <LeaderBoardCard />
                                    <LeaderBoardCard />
                                    <LeaderBoardCard />
                                    <div className="leaderBoardend" />
                                </React.Fragment>
                                <React.Fragment>
                                    <LeaderBoardCard />
                                    <LeaderBoardCard />
                                    <LeaderBoardCard />
                                    <LeaderBoardCard />
                                    <LeaderBoardCard />
                                    <LeaderBoardCard />
                                    <LeaderBoardCard />
                                    <LeaderBoardCard />
                                    <LeaderBoardCard />
                                    <LeaderBoardCard />
                                    <LeaderBoardCard />
                                    <LeaderBoardCard />
                                    <LeaderBoardCard />
                                    <div className="leaderBoardend" />
                                </React.Fragment>
                            </SwipeableViews>
                        </Content>
                    </SwipeableViews>
                </Container>
            </React.Fragment >
            {/* </AppWithAuthorization > */}
            <style jsx>{`
                .leaderBoardend{
                    height: 2em;
                }
                .stickyHeader {
                    z-index: 1;
                    position: fixed;
                    width: 100vw;
                }
                .card::-webkit-scrollbar {
                    display: none;
                }
                .cardContentEnds{
                    min-width: 15vw;
                }
                .card {
                    min-height: 14vh;
                    display: flex;
                    overflow-x: auto;
                }
                .sectionTitle {
                    color: rgba(35,31,32,0.25);
                    line-height: 1.5em;
                }
                .friendsCardsContainer {
                    overflow: none;
                }
                .animationBox {
                    height: 25vh;
                }
		`}</style>
        </div >
    )
}

export default withRedux(dashboard);
