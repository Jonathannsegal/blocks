import React from 'react';
import Lottie from 'react-lottie'
import * as searching from '../../src/db/searching.json'
require('rsuite/lib/styles/index.less');

const searchingOptions = {
    loop: true,
    autoplay: true,
    animationData: searching.default,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const search = () => (
    <React.Fragment>
        <Lottie
            options={searchingOptions}
            isClickToPauseDisabled={true}
        />
    </React.Fragment >
);

export default search;
