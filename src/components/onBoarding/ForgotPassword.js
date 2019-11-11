import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { AppWithAuthentication } from "../App";
import { auth, db } from "../../firebase";
import Router from "next/router"
import { RefreshTime } from '../../constants'

import {
    Button,
    ButtonToolbar,
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
    Content,
    FlexboxGrid
} from 'rsuite';

const useSignIn = () => {
    const dispatch = useDispatch()
    const values = useSelector(state => state.forgotPasswordFormValue)
    const signUpFormErrorMessage = useSelector(state => state.signUpFormError)
    const passwordForgotStateError = () =>
        dispatch({
            type: 'passwordForgotStateError'
        })
    const passwordForgotStateSent = () =>
        dispatch({
            type: 'passwordForgotStateSent'
        })
    const homeSignIn = () =>
        dispatch({
            type: 'homeSignIn'
        })
    const updateForgotPasswordEmail = (input) => (
        dispatch({
            type: 'UPDATE_FORGOTPASSWORD_EMAIL',
            payload: { txt: input }
        })
    )
    const signUpFormError = (input) => (
        dispatch({
            type: 'SIGNUP_FORM_ERROR',
            payload: { txt: input }
        })
    )
    const onSubmit = () => {
        auth
            .doPasswordReset(values.email)
            .then(() => {
                passwordForgotStateSent();
            })
            .catch(error => {
                if (error === "") {
                    error = " ";
                }
                signUpFormError(error.message);
                passwordForgotStateError();
            });
    }
    return { homeSignIn, signUpFormErrorMessage, updateForgotPasswordEmail, signUpFormError, values, onSubmit }
}

const ForgotPassword = () => (
    <AppWithAuthentication>
        <ForgotPasswordBase />
    </AppWithAuthentication>
);

const ForgotPasswordBase = () => {
    const { homeSignIn, signUpFormErrorMessage, signUpFormError, updateForgotPasswordEmail, values, onSubmit } = useSignIn()
    if (signUpFormErrorMessage != "") {
        setTimeout(() => {
            signUpFormError("");
        }, RefreshTime.fiveSeconds);
    }
    return (
        <Content>
            <FlexboxGrid justify="center">
                <FlexboxGrid.Item colspan={12}>
                    <h2>Forgot Password</h2>
                    <br />
                    <Form fluid
                        onChange={formValue => {
                            updateForgotPasswordEmail(formValue.email);
                        }}>
                        <FormGroup>
                            <ControlLabel>Email</ControlLabel>
                            <FormControl value={values.email} name="email" placeholder="Email" type="email" />
                        </FormGroup>
                        <FormGroup>
                            <ButtonToolbar>
                                <Button appearance="default" onClick={homeSignIn}>Back</Button>
                                <Button appearance="primary" type="submit" onClick={onSubmit}>Reset</Button>
                            </ButtonToolbar>
                        </FormGroup>
                    </Form>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </Content>
    )
}

export default ForgotPassword;