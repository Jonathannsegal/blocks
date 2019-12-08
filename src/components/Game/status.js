import React, { Component } from 'react';
import Lottie from 'react-lottie'
import Map from '../Stats/Map'
import {
    Content,
    Footer,
    FlexboxGrid,
    Button
} from 'rsuite';
import * as status from '../../db/status.json';
require('rsuite/lib/styles/index.less');
const statusOptions = {
    loop: true,
    autoplay: true,
    animationData: status.default,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

class Status extends Component {
    render() {
        return (
            <React.Fragment>
                <Content>
                    <FlexboxGrid justify="center">
                        {/* <FlexboxGrid.Item colspan={24}>
                            <br /><br /><br />
                            <div className="animationBox">
                                <Lottie
                                    options={statusOptions}
                                    isClickToPauseDisabled={true}
                                />
                            </div>
                        </FlexboxGrid.Item> */}
                        <FlexboxGrid.Item colspan={17}>
                            <br /><br />
                            <FlexboxGrid justify="space-around">
                                <FlexboxGrid.Item colspan={11}>
                                    <h2 className="center">Status</h2>
                                    <br />
                                    <br />
                                    <Button size="lg" color="cyan" block onClick={() => this.props.gameMain()}>Back</Button>
                                </FlexboxGrid.Item>
                            </FlexboxGrid>
                            <br />
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </Content>
                <div className="bottomFooter">
                    <Footer>
                        <Map gameValues={this.props.gameValues} />
                    </Footer>
                </div>
                <style jsx>{`
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
		`}</style>
            </React.Fragment >
        );
    }
}

export default Status;
