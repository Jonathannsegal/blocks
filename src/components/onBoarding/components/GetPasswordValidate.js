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

const useGetPasswordValidate = () => {
    const dispatch = useDispatch()
    const verifyPasswordValue = useSelector(state => state.signUpFormValue.verifyPassword)
    const signUpPassword = () =>
        dispatch({
            type: 'signUpPassword'
        })
    const done = () =>
        dispatch({
            type: 'done'
        })
    const updateInput = (input) => (
        dispatch({
            type: 'UPDATE_SIGNUP_VERIFYPASSWORD',
            payload: { txt: input }
        })
    )
    return { signUpPassword, done, updateInput, verifyPasswordValue }
}

const GetPasswordValidate = () => {
    const { signUpPassword, done, updateInput, verifyPasswordValue } = useGetPasswordValidate()
    return (
        < Form fluid
            onChange={formValue => {
                updateInput(formValue);
            }}>
            <FormGroup>
                <ControlLabel>Retype Password</ControlLabel>
                <FormControl value={verifyPasswordValue} name="password" autoFocus={true} type="password" />
            </FormGroup>
            <FormGroup>
                <ButtonToolbar>
                    <Button appearance="primary" onClick={signUpPassword}>Back</Button>
                    <Button appearance="primary" type="submit" onClick={done}>Submit</Button>
                </ButtonToolbar>
            </FormGroup>
        </Form >
    )
}

export default GetPasswordValidate;