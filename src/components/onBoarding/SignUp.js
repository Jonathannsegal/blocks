import React, { Component } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Lottie from 'react-lottie';
import * as success from '../../db/success.json'
import * as error from '../../db/error.json'
import Link from "next/link"
import Router from "next/router"
import { AppWithAuthentication } from "../App";
import { auth, db } from "../../firebase";
import SwipeableViews from 'react-swipeable-views';
import {
    Content,
    FlexboxGrid,
    Progress,
    Message
} from 'rsuite';
import SignUpState from '../../constants/signUpState'
import GetUsername from './components/GetUsername';
import GetEmail from './components/GetEmail';
import GetPassword from './components/GetPassword';
import GetPasswordValidate from './components/GetPasswordValidate';

const useSignUp = () => {
    const signUp = useSelector(state => state.signUpState)
    const signUpFormValue = useSelector(state => state.signUpFormValue)
    const signUpFormErrorMessage = useSelector(state => state.signUpFormError)
    const dispatch = useDispatch()
    const signUpFormError = (input) => (
        dispatch({
            type: 'SIGNUP_FORM_ERROR',
            payload: { txt: input }
        })
    )
    const signUpUsername = () =>
        dispatch({
            type: 'signUpUsername'
        })
    const onSubmit = event => {
        auth
            .doCreateUserWithEmailAndPassword(event.email, event.password)
            .then(authUser => {
                db.doCreateUser(authUser.user.uid, event.userName, event.email)
                    .then(() => {
                        Router.push('/dashboard');
                    })
                    .catch(error => {
                        signUpFormError(error.message);
                    });
            })
            .catch(error => {
                signUpFormError(error.message);
            });
    }

    return { signUp, signUpUsername, signUpFormValue, signUpFormError, signUpFormErrorMessage, onSubmit }
}

const successOptions = {
    loop: true,
    autoplay: true,
    animationData: success.default,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const errorOptions = {
    loop: true,
    autoplay: true,
    animationData: error.default,
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
    const { signUp, signUpUsername, signUpFormValue, signUpFormError, signUpFormErrorMessage, onSubmit } = useSignUp()
    const { useRef } = React;
    const userNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordVerifyRef = useRef();
    if (signUpFormErrorMessage != "") {
        setTimeout(() => {
            signUpFormError("");
        }, 10000);
    }
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
            {
                signUpFormErrorMessage != "" ? (
                    <div className="stickyHeader">
                        < Message
                            showIcon
                            type="error"
                            title="Error"
                            description={signUpFormErrorMessage}
                        />
                    </div>
                ) : (
                        null
                    )
            }
            <br />
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
                                            {(function () {
                                                switch (signUpFormErrorMessage) {
                                                    case "":
                                                        {
                                                            return (<Lottie
                                                                height={300}
                                                                width={300}
                                                                options={successOptions}
                                                                isClickToPauseDisabled={true}
                                                            />);
                                                        }
                                                    default:
                                                        {
                                                            signUpUsername();
                                                            return (
                                                                <Lottie
                                                                    height={300}
                                                                    width={300}
                                                                    options={errorOptions}
                                                                    isClickToPauseDisabled={true}
                                                                />);
                                                        }
                                                }
                                            })()}
                                            <FlexboxGrid.Item>
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
                .stickyHeader {
                    z-index: 1;
                    top:0;
                    position: fixed;
                    width: 100vw;
                }
		`}</style>
        </Content >
    )
}

export default SignUp;