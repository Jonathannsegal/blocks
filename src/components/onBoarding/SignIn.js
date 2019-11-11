import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { AppWithAuthentication } from "../App";
import { auth, db } from "../../firebase";
import Router from "next/router"
import HomeState from '../../constants/homeState'
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
    const values = useSelector(state => state.signInFormValue)
    const signUpFormErrorMessage = useSelector(state => state.signUpFormError)
    const updateInputEmail = (input) => (
        dispatch({
            type: 'UPDATE_SIGNIN_EMAIL',
            payload: { txt: input }
        })
    )
    const signUpFormError = (input) => (
        dispatch({
            type: 'SIGNUP_FORM_ERROR',
            payload: { txt: input }
        })
    )
    const updateInputPassword = (input) => (
        dispatch({
            type: 'UPDATE_SIGNIN_PASSWORD',
            payload: { txt: input }
        })
    )
    const homeForgotPassword = () =>
        dispatch({
            type: 'homeForgotPassword',
            signUp: HomeState.forgotPassword
        })
    const onSubmit = event => {
        auth
            .doSignInWithEmailAndPassword(values.email, values.password)
            .then(() => {
                Router.push('/dashboard');
            })
            .catch(error => {
                signUpFormError(error.message);
            });
    }
    return { updateInputEmail, signUpFormError, signUpFormErrorMessage, updateInputPassword, values, homeForgotPassword, onSubmit }
}

const SignIn = () => (
    <AppWithAuthentication>
        <SignInBase />
    </AppWithAuthentication>
);

const SignInBase = () => {
    const { updateInputEmail, signUpFormError, signUpFormErrorMessage, updateInputPassword, values, homeForgotPassword, onSubmit } = useSignIn()
    if (signUpFormErrorMessage != "") {
        setTimeout(() => {
            signUpFormError("");
        }, 5000);
    }
    return (
        <Content>
            <FlexboxGrid justify="center">
                <FlexboxGrid.Item colspan={12}>
                    <Form fluid
                        onChange={formValue => {
                            updateInputEmail(formValue.email);
                            updateInputPassword(formValue.password);
                        }}>
                        <FormGroup>
                            <ControlLabel>Email</ControlLabel>
                            <FormControl value={values.emailValue} name="email" placeholder="Email" type="email" />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Password</ControlLabel>
                            <FormControl value={values.passwordValue} name="password" placeholder="Password" type="password" />
                        </FormGroup>
                        <FormGroup>
                            <ButtonToolbar>
                                <Button appearance="primary" type="submit" onClick={onSubmit}>Sign in</Button>
                                <Button appearance="link" onClick={homeForgotPassword}>Forgot password?</Button>
                            </ButtonToolbar>
                        </FormGroup>
                    </Form>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </Content>
    )
}

export default SignIn;