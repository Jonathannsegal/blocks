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

const useGetPassword = () => {
    const dispatch = useDispatch()
    const passwordValue = useSelector(state => state.signUpFormValue.password)
    const signUpEmail = () =>
        dispatch({
            type: 'signUpEmail'
        })
    const signUpPasswordValidate = () =>
        dispatch({
            type: 'signUpPasswordValidate'
        })
    const updateInput = (input) => (
        dispatch({
            type: 'UPDATE_SIGNUP_PASSWORD',
            payload: { txt: input }
        })
    )
    return { signUpEmail, signUpPasswordValidate, updateInput, passwordValue }
}

const GetPassword = () => {
    const { signUpEmail, signUpPasswordValidate, updateInput, passwordValue } = useGetPassword()
    return (
        < Form fluid
            onChange={formValue => {
                updateInput(formValue);
            }}>
            <FormGroup>
                <ControlLabel>Password</ControlLabel>
                <FormControl value={passwordValue} name="password" autoFocus={true} />
            </FormGroup>
            <FormGroup>
                <ButtonToolbar>
                    <Button appearance="primary" onClick={signUpEmail}>Back</Button>
                    <Button appearance="primary" type="submit" onClick={signUpPasswordValidate}>Continue</Button>
                </ButtonToolbar>
            </FormGroup>
        </Form >
    )
}

export default GetPassword;