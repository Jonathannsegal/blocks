import React from 'react';
import Lottie from 'react-lottie'
import { withRedux } from '../../src/lib/redux'
import SwipeableViews from 'react-swipeable-views';
import { useSelector, useDispatch } from 'react-redux'
import { DashboardState, LeaderBoardState } from '../../src/constants';
import {
    Avatar,
    Container,
    Header,
    Content,
    Navbar,
    FlexboxGrid,
    Nav,
    Icon,
    Panel,
    Placeholder,
    Button
} from 'rsuite';
import * as ratings from '../../src/db/ratings.json'
import * as trophy from '../../src/db/trophy.json'
import FriendCard from '../../src/components/Dashboard/friendCard'
import LeaderBoardCard from '../../src/components/Dashboard/leaderBoardCard'
import { AppWithAuthorization } from "../../src/components/App";
import { auth } from "../../src/firebase";
import NotLoggedIn from '../../src/extraScreens/notLoggedIn'
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

const useDashboard = () => {
    const authUser = useSelector(state => state.authUser)
    const currentDashboardState = useSelector(state => state.dashboardState)
    const currentLeaderboardState = useSelector(state => state.leaderBoardState)
    const dispatch = useDispatch()
    const leaderBoardStateFriends = () =>
        dispatch({
            type: 'leaderBoardStateFriends'
        })
    const leaderBoardStateGlobal = () =>
        dispatch({
            type: 'leaderBoardStateGlobal'
        })
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
    const onSignOut = () => {
        auth
            .doSignOut()
            .then(() => {
                Router.push('/')
            })
            .catch(error => {
                console.log("sign out error: " + error)
            });
    }
    return { onSignOut, authUser, leaderBoardStateFriends, leaderBoardStateGlobal, currentDashboardState, currentLeaderboardState, dashboardProfile, dashboardHome, dashboardLeaderboard }
}

const dashboard = () => (
    <AppWithAuthorization>
        <DashboardBase />
    </AppWithAuthorization>
);

const DashboardBase = () => {
    const { onSignOut, authUser, leaderBoardStateFriends, leaderBoardStateGlobal, currentDashboardState, currentLeaderboardState, dashboardProfile, dashboardHome, dashboardLeaderboard } = useDashboard()
    const { Paragraph } = Placeholder;
    const handleChangeIndexDashboard = index => {
        if (index === DashboardState.profile) {
            dashboardProfile();
        } else if (index === DashboardState.home) {
            dashboardHome();
        } else {
            dashboardLeaderboard();
        }
    };
    const handleChangeIndexLeaderboard = index => {
        if (index === LeaderBoardState.friends) {
            leaderBoardStateFriends();
        } else if (index === LeaderBoardState.global) {
            leaderBoardStateGlobal();
        }
    };

    return authUser === null ? (
        <React.Fragment>
            <NotLoggedIn />
        </React.Fragment>
    ) : (
            <div>
                <React.Fragment>
                    <Container>
                        <div className="fixedHeader">
                            <Header>
                                <Navbar appearance="subtle">
                                    <Navbar.Body>
                                        <Nav>
                                            <Nav.Item
                                                onClick={dashboardProfile}
                                                icon={
                                                    <Avatar circle size="xs">JS</Avatar>
                                                }> {authUser.email}
                                            </Nav.Item >
                                        </Nav >
                                        <Nav pullRight>
                                            <Nav.Item onClick={dashboardLeaderboard} icon={<Lottie
                                                height={18}
                                                width={18}
                                                options={trophyOptions}
                                                isClickToPauseDisabled={true}
                                            />}></Nav.Item>
                                        </Nav>
                                    </Navbar.Body >
                                </Navbar >
                                {
                                    currentDashboardState === DashboardState.leaderboard ? (
                                        <Navbar appearance="inverse">
                                            <Navbar.Body>
                                                <Nav>
                                                    <Nav.Item icon={<Icon icon="chevron-left" />} onClick={dashboardHome}>Back</Nav.Item>
                                                </Nav>
                                                <Nav pullRight>
                                                    <Nav.Item onClick={leaderBoardStateFriends} active={currentLeaderboardState == LeaderBoardState.friends} >Friends</Nav.Item>
                                                    <Nav.Item onClick={leaderBoardStateGlobal} active={currentLeaderboardState == LeaderBoardState.global} >Global</Nav.Item>
                                                </Nav>
                                            </Navbar.Body>
                                        </Navbar>
                                    ) : (
                                            null
                                        )
                                }

                            </Header >
                        </div >
                        <SwipeableViews animateHeight index={currentDashboardState} onChangeIndex={handleChangeIndexDashboard}>
                            <div className="minFullHeight">
                                <Content>
                                    <br /><br /><br />
                                    <FlexboxGrid justify="center">
                                        <FlexboxGrid.Item colspan={18}>
                                            <FlexboxGrid justify="space-around">
                                                <h2 className="sectionTitle">Profile</h2>
                                            </FlexboxGrid>
                                            <br />
                                        </FlexboxGrid.Item>
                                        <FlexboxGrid.Item colspan={17}>
                                            <FlexboxGrid justify="space-around">
                                                <FlexboxGrid.Item colspan={11}>
                                                    <Button size="lg" color="cyan" block onClick={onSignOut}>Sign Out</Button>
                                                </FlexboxGrid.Item>
                                            </FlexboxGrid>
                                            <br />
                                            <FlexboxGrid justify="space-around">
                                                <FlexboxGrid.Item colspan={15}>
                                                    <Button size="lg" color="cyan" block>Change Password</Button>
                                                </FlexboxGrid.Item>
                                            </FlexboxGrid>
                                        </FlexboxGrid.Item>
                                    </FlexboxGrid>
                                </Content>
                            </div>

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
                                <SwipeableViews index={currentLeaderboardState} onChangeIndex={handleChangeIndexLeaderboard}>
                                    <div className="leaderBoardHeight">
                                        <FlexboxGrid justify="center">
                                            <FlexboxGrid.Item colspan={20}>
                                                <LeaderBoardCard />
                                                <LeaderBoardCard />
                                                <LeaderBoardCard />
                                                <LeaderBoardCard />
                                                <LeaderBoardCard />
                                                <div className="leaderBoardend" />
                                            </FlexboxGrid.Item>
                                        </FlexboxGrid>
                                    </div>
                                    <div className="leaderBoardHeight">
                                        <FlexboxGrid justify="center">
                                            <FlexboxGrid.Item colspan={20}>
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
                                            </FlexboxGrid.Item>
                                        </FlexboxGrid>
                                    </div>
                                </SwipeableViews>
                            </Content>
                        </SwipeableViews>
                    </Container >
                </React.Fragment >
                <style jsx>{`
                .minFullHeight{
                    min-height: 100vh;
                }
                .leaderBoardHeight{
                    padding-top: 10em;
                    height: 100vh;
                    overflowY: 'auto';
                }
                .leaderBoardend{
                    height: 2em;
                }
                .fixedHeader {
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
