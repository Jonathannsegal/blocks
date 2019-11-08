import React from 'react';
import { useSelector } from 'react-redux'
import Lottie from 'react-lottie';
import * as success from '../../db/success.json'
import {
    Content,
    FlexboxGrid,
    Progress,
    Schema
} from 'rsuite';
import SignUpState from '../../constants/signUpState'
import GetUsername from './components/GetUsername';
import GetEmail from './components/GetEmail';
import GetPassword from './components/GetPassword';
import GetPasswordValidate from './components/GetPasswordValidate';

// const { StringType } = Schema.Types;

// const model = Schema.Model({
//     name: StringType().isRequired('This field is required.'),
//     email: StringType()
//         .isEmail('Please enter a valid email address.')
//         .isRequired('This field is required.'),
//     password: StringType().isRequired('This field is required.'),
//     verifyPassword: StringType()
//         .addRule((value, data) => {
//             console.log(data);

//             if (value !== data.password) {
//                 return false;
//             }

//             return true;
//         }, 'The two passwords do not match')
//         .isRequired('This field is required.')
// });

const useSignUp = () => {
    const signUp = useSelector(state => state.signUp)
    return { signUp }
}

const successOptions = {
    loop: true,
    autoplay: true,
    animationData: success.default,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const { Line } = Progress;

const SignUp = () => {
    const { signUp } = useSignUp()
    return (
        <Content>
            <FlexboxGrid justify="center">
                <FlexboxGrid.Item colspan={12}>
                    <Line percent={signUp} status='active' strokeColor="#87d13f" showInfo={false} />
                    <br />
                    {(function () {
                        switch (signUp) {
                            case SignUpState.userName:
                                return <GetUsername />;
                            case SignUpState.email:
                                return <GetEmail />;
                            case SignUpState.password:
                                return <GetPassword />;
                            case SignUpState.passwordVerify:
                                return <GetPasswordValidate />;
                            case SignUpState.done:
                                return <Lottie
                                    options={successOptions}
                                    isClickToPauseDisabled={true}
                                />;
                            default:
                                return null;
                        }
                    })()}
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </Content >
    )
}

export default SignUp;