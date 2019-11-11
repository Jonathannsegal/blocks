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

const { forwardRef, useImperativeHandle } = React;
const GetEmail = forwardRef((props, ref) => {
    const { signUpUsername, signUpPassword, updateInput, emailValue } = useGetEmail()
    useImperativeHandle(ref, () => ({
        setFocus() {
            document.getElementById("textBoxEmail").focus();
        },
        setBlur() {
            document.getElementById("textBoxEmail").blur();
        }
    }));
    return (
        < Form fluid
            onChange={formValue => {
                updateInput(formValue);
            }}>
            <FormGroup>
                <ControlLabel>Email</ControlLabel>
                <FormControl id={"textBoxEmail"} value={emailValue} name="email" />
            </FormGroup>
            <FormGroup>
                <ButtonToolbar>
                    <Button appearance="default" onClick={signUpUsername}>Back</Button>
                    <Button appearance="primary" type="submit" onClick={signUpPassword}>Continue</Button>
                </ButtonToolbar>
            </FormGroup>
        </Form >
    )
});

export default GetEmail;