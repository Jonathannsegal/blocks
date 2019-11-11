import React from 'react';
import Lottie from 'react-lottie'
import * as fourzerofour from '../src/db/fourzerofour.json'
import {
    Content,
    FlexboxGrid,
    Button
} from 'rsuite';
require('rsuite/lib/styles/index.less');

const fourzerofourOptions = {
    loop: true,
    autoplay: true,
    animationData: fourzerofour.default,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

function Error({ statusCode }) {
    return (
        <React.Fragment>
            <Content>
                <FlexboxGrid justify="center">
                    <FlexboxGrid.Item colspan={18}>
                        <br /> <br />
                        <h2 className="center display-linebreak">{statusCode
                            ? `A ${statusCode} error occurred on server`
                            : 'An error occurred on client'}</h2>
                        <br /><br />
                        <Lottie
                            options={fourzerofourOptions}
                            isClickToPauseDisabled={true}
                        />
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={17}>
                        <br /><br />
                        <FlexboxGrid justify="space-around">
                            <FlexboxGrid.Item colspan={11}>
                                <Button size="lg" color="cyan" block href="/dashboard">Home</Button>
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
        </React.Fragment >
    )
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
}

export default Error
