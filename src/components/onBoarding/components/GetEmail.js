import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {
    Button,
    ButtonToolbar,
    Form,
    FormGroup,
    FormControl,
    ControlLabel
} from 'rsuite';

const useGetEmail = () => {
    const dispatch = useDispatch()
    const emailValue = useSelector(state => state.signUpFormValue.email)
    const signUpUsername = () =>
        dispatch({
            type: 'signUpUsername'
        })
    const signUpPassword = () =>
        dispatch({
            type: 'signUpPassword'
        })
    const updateInput = (input) => (
        dispatch({
            type: 'UPDATE_SIGNUP_EMAIL',
            payload: { txt: input }
        })
    )
    return { signUpUsername, signUpPassword, updateInput, emailValue }
}

const GetEmail = () => {
    const { signUpUsername, signUpPassword, updateInput, emailValue } = useGetEmail()
    return (
        < Form fluid
            onChange={formValue => {
                updateInput(formValue);
            }}>
            <FormGroup>
                <ControlLabel>Email</ControlLabel>
                <FormControl value={emailValue} name="email" autoFocus={true} />
            </FormGroup>
            <FormGroup>
                <ButtonToolbar>
                    <Button appearance="primary" onClick={signUpUsername}>Back</Button>
                    <Button appearance="primary" type="submit" onClick={signUpPassword}>Continue</Button>
                </ButtonToolbar>
            </FormGroup>
        </Form >
    )
}

export default GetEmail;