import React from 'react';
import Lottie from 'react-lottie'
import * as loop from '../../db/loop.json'
require('rsuite/lib/styles/index.less');

const loopOptions = {
    loop: true,
    autoplay: true,
    animationData: loop.default,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const MapOverlay = () => (
    <React.Fragment>
        <div className="overlay">
            <div className="animationMargin">
                <Lottie
                    height={60}
                    width={60}
                    options={loopOptions}
                    isClickToPauseDisabled={true}
                />
            </div>
        </div>
        <style jsx>{`
                .overlay{
                    position: fixed;
                    z-index: 99;
                    background-color: transparent;
                }
                .animationMargin{
                    margin: 1em;
                }
		`}</style>
    </React.Fragment>
);

export default MapOverlay;

