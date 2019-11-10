import React, { Component } from 'react';
import { useSelector } from 'react-redux'
import Lottie from 'react-lottie';
import * as success from '../../db/success.json'
import Link from "next/link"
import Router from "next/router"
import { AppWithAuthentication } from "../App";
import { auth, db } from "../../firebase";
import SwipeableViews from 'react-swipeable-views';
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
    const signUp = useSelector(state => state.signUpState)
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
    const { useRef } = React;
    const userNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordVerifyRef = useRef();
    if (signUp == SignUpState.userName) {
        if (userNameRef.current) {
            userNameRef.current.setFocus();
        }
    } else if (signUp == SignUpState.email) {
        if (emailRef.current) {
            emailRef.current.setFocus();
        }
    } else if (signUp == SignUpState.password) {
        if (passwordRef.current) {
            passwordRef.current.setFocus()
        }
    } else if (signUp == SignUpState.passwordVerify) {
        if (passwordVerifyRef.current) {
            passwordVerifyRef.current.setFocus()
        }
    }

    return (
        <Content>
            <FlexboxGrid justify="center">
                <FlexboxGrid.Item colspan={24}>
                    <FlexboxGrid justify="center">
                        <FlexboxGrid.Item colspan={12}>
                            <Line percent={signUp * 25} status='active' strokeColor="#87d13f" showInfo={false} />
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                    <br />
                    {(function () {
                        switch (signUp) {
                            case SignUpState.done:
                                {
                                    onSubmit(signUpFormValue);
                                    return (
                                        <FlexboxGrid justify="center">
                                            <FlexboxGrid.Item>
                                                <Lottie
                                                    height={300}
                                                    width={300}
                                                    options={successOptions}
                                                    isClickToPauseDisabled={true}
                                                />
                                            </FlexboxGrid.Item>
                                        </FlexboxGrid>
                                    );
                                }
                            default:
                                {
                                    return <SwipeableViews resistance disabled={true} index={signUp}>
                                        <div className="margins">
                                            <GetUsername ref={userNameRef} />
                                        </div>
                                        <div className="margins">
                                            <GetEmail ref={emailRef} />
                                        </div>
                                        <div className="margins">
                                            <GetPassword ref={passwordRef} />
                                        </div>
                                        <div className="margins">
                                            <GetPasswordValidate ref={passwordVerifyRef} />
                                        </div>
                                    </SwipeableViews>;
                                }
                        }
                    })()}
                </FlexboxGrid.Item>
            </FlexboxGrid>
            <style jsx>{`
                .margins{
                    margin: 0 6em;
                }
		`}</style>
        </Content >
    )
}

export default SignUp;