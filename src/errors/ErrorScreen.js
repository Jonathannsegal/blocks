import { Component } from 'react';
import Lottie from 'react-lottie'
import { Content, FlexboxGrid, Button } from 'rsuite';
import * as nolocation from '../../src/db/nolocation.json'
require('rsuite/lib/styles/index.less');

const nolocationOptions = {
    loop: true,
    autoplay: true,
    animationData: nolocation.default,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

class ErrorScreen extends Component {
    render() {
        return (
            <React.Fragment>
                <Content>
                    <FlexboxGrid justify="center">
                        <FlexboxGrid.Item colspan={18}>
                            <br /><br /><br />
                            <Lottie
                                options={nolocationOptions}
                                isClickToPauseDisabled={true}
                            />
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item colspan={17}>
                            <br />
                            <FlexboxGrid justify="center">
                                <FlexboxGrid.Item>
                                    <h2 className="center display-linebreak">{this.props.message}</h2>
                                    <br />
                                </FlexboxGrid.Item>
                                <br />
                                <FlexboxGrid.Item colspan={11}>
                                    <Button size="lg" color="cyan" block href="/dashboard">Back</Button>
                                </FlexboxGrid.Item>
                            </FlexboxGrid>
                            <br />
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </Content>
                <style jsx>{`
				.center{
					text-align: center;
                }
                .display-linebreak {
                    white-space: pre-line;
                }
		`}</style>
            </React.Fragment>
        );
    }
}

export default ErrorScreen;
