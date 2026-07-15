import { Component } from 'react';
import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('react-lottie'), { ssr: false });
import { Content, FlexboxGrid } from 'rsuite';
import * as liquidspinner from '../../src/db/liquidspinner.json'

const liquidspinnerOptions = {
    loop: true,
    autoplay: true,
    animationData: liquidspinner.default,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

class NotLoggedIn extends Component {
    render() {
        return (
            <React.Fragment>
                <Content>
                    <FlexboxGrid justify="center" align="middle">
                        <FlexboxGrid.Item colspan={18}>
                            <div className="fullHeight">
                                <Lottie
                                    speed={2}
                                    height={300}
                                    width={300}
                                    options={liquidspinnerOptions}
                                    isClickToPauseDisabled={true}
                                />
                            </div>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </Content>
                <style jsx>{`
                .fullHeight{
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    display: flex;
                    height: 90vh;
                }
		`}</style>
            </React.Fragment>
        );
    }
}

export default NotLoggedIn;
