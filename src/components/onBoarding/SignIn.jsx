import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { AppWithAuthentication } from "../App";
import { auth, db } from "../../firebase";
import Router from "next/router"
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
    const updateInputEmail = (input) => (
        dispatch({
            type: 'UPDATE_SIGNIN_EMAIL',
            payload: { txt: input }
        })
    )
    const updateInputPassword = (input) => (
        dispatch({
            type: 'UPDATE_SIGNIN_PASSWORD',
            payload: { txt: input }
        })
    )
    const onSubmit = event => {
        auth
            .doSignInWithEmailAndPassword(values.email, values.password)
            .then(() => {
                Router.push('/dashboard');
            })
            .catch(error => {
                console.log("error", error);
            });
    }
    return { updateInputEmail, updateInputPassword, values, onSubmit }
}

const SignIn = () => (
    <AppWithAuthentication>
        <SignInBase />
    </AppWithAuthentication>
);

const SignInBase = () => {
    const { updateInputEmail, updateInputPassword, values, onSubmit } = useSignIn()
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
                                <Button appearance="link">Forgot password?</Button>
                            </ButtonToolbar>
                        </FormGroup>
                    </Form>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </Content>
    )
}

export default SignIn;