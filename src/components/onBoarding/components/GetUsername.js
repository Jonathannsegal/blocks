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

const useGetUsername = () => {
    const dispatch = useDispatch()
    const userNameValue = useSelector(state => state.signUpFormValue.userName)
    const signUpEmail = () =>
        dispatch({
            type: 'signUpEmail'
        })
    const updateInput = (input) => (
        dispatch({
            type: 'UPDATE_SIGNUP_USERNAME',
            payload: { txt: input }
        })
    )
    return { signUpEmail, updateInput, userNameValue }
}

const { forwardRef, useImperativeHandle } = React;
const GetUsername = forwardRef((props, ref) => {
    const { signUpEmail, updateInput, userNameValue } = useGetUsername()
    useImperativeHandle(ref, () => ({
        setFocus() {
            document.getElementById("textBoxUsername").focus();
        }
    }));
    return (
        < Form fluid
            onChange={formValue => {
                updateInput(formValue);
            }}>
            <FormGroup>
                <ControlLabel>Username</ControlLabel>
                <FormControl id={"textBoxUsername"} value={userNameValue} name="userName" autoFocus={true} />
            </FormGroup>
            <FormGroup>
                <ButtonToolbar>
                    <Button appearance="primary" type="submit" onClick={signUpEmail}>Continue</Button>
                </ButtonToolbar>
            </FormGroup>
        </Form >
    )
});

export default GetUsername;