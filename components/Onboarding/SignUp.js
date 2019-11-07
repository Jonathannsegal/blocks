import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
    Content,
    FlexboxGrid,
    Progress,
    Button
} from 'rsuite';
import SignUpState from '../../constants/signUpState'
import GetUsername from './components/GetUsername';
import GetEmail from './components/GetEmail';
import GetPassword from './components/GetPassword';
import GetPasswordValidate from './components/GetPasswordValidate';

const useSignUp = () => {
    const signUp = useSelector(state => state.signUp)
    const dispatch = useDispatch()
    const signUpUsername = () =>
        dispatch({
            type: 'signUpUsername'
        })
    const signUpEmail = () =>
        dispatch({
            type: 'signUpEmail'
        })
    const signUpPassword = () =>
        dispatch({
            type: 'signUpPassword'
        })
    const signUpPasswordValidate = () =>
        dispatch({
            type: 'signUpPasswordValidate'
        })
    const done = () =>
        dispatch({
            type: 'done'
        })
    return { signUp, signUpUsername, signUpEmail, signUpPassword, signUpPasswordValidate, done }
}

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