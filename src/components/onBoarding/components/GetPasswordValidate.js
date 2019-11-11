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

const { forwardRef, useImperativeHandle } = React;
const GetPasswordValidate = forwardRef((props, ref) => {
    const { signUpPassword, done, updateInput, verifyPasswordValue } = useGetPasswordValidate()
    useImperativeHandle(ref, () => ({
        setFocus() {
            document.getElementById("textBoxPasswordVerify").focus();
        },
        setBlur() {
            document.getElementById("textBoxPasswordVerify").blur();
        }
    }));
    return (
        < Form fluid
            onChange={formValue => {
                updateInput(formValue);
            }}>
            <FormGroup>
                <ControlLabel>Retype Password</ControlLabel>
                <FormControl id={"textBoxPasswordVerify"} value={verifyPasswordValue} name="password" type="password" />
            </FormGroup>
            <FormGroup>
                <ButtonToolbar>
                    <Button appearance="default" onClick={signUpPassword}>Back</Button>
                    <Button appearance="primary" type="submit" onClick={done}>Submit</Button>
                </ButtonToolbar>
            </FormGroup>
        </Form >
    )
});

export default GetPasswordValidate;