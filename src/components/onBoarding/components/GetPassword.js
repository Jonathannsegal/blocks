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

const { forwardRef, useImperativeHandle } = React;
const GetPassword = forwardRef((props, ref) => {
    const { signUpEmail, signUpPasswordValidate, updateInput, passwordValue } = useGetPassword()
    useImperativeHandle(ref, () => ({
        setFocus() {
            document.getElementById("textBoxPassword").focus();
        },
        setBlur() {
            document.getElementById("textBoxPassword").blur();
        }
    }));
    return (
        < Form fluid
            onChange={formValue => {
                updateInput(formValue);
            }}>
            <FormGroup>
                <ControlLabel>Password</ControlLabel>
                <FormControl id={"textBoxPassword"} value={passwordValue} name="password" type="password" />
            </FormGroup>
            <FormGroup>
                <ButtonToolbar>
                    <Button appearance="default" onClick={signUpEmail}>Back</Button>
                    <Button appearance="primary" type="submit" onClick={signUpPasswordValidate}>Continue</Button>
                </ButtonToolbar>
            </FormGroup>
        </Form >
    )
});

export default GetPassword;