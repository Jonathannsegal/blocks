import React, { Component } from 'react';
import { useSelector } from 'react-redux'
import Lottie from 'react-lottie';
import * as success from '../../db/success.json'
import Link from "next/link"
import Router from "next/router"
import { AppWithAuthentication } from "../App";
import { auth, db } from "../../firebase";
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
    const signUpFormValue = useSelector(state => state.signUpFormValue)
    const onSubmit = event => {
        auth
            .doCreateUserWithEmailAndPassword(event.email, event.password)
            .then(authUser => {
                db.doCreateUser(authUser.user.uid, event.userName, event.email)
                    .then(() => {
                        Router.push('/dashboard');
                    })
                    .catch(error => {
                        console.log("error", error);
                    });
            })
            .catch(error => {
                console.log("error", error);
            });
    }

    return { signUp, signUpFormValue, onSubmit }
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

const SignUp = () => (
    <AppWithAuthentication>
        <SignUpBase />
    </AppWithAuthentication>
);

const SignUpBase = () => {
    const { signUp, signUpFormValue, onSubmit } = useSignUp()
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
                                {
                                    onSubmit(signUpFormValue);
                                    return <Lottie
                                        options={successOptions}
                                        isClickToPauseDisabled={true}
                                    />;
                                }
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