import React from 'react';
import {
    Button,
    ButtonToolbar,
    Form,
    FormGroup,
    FormControl,
    ControlLabel
} from 'rsuite';

const GetPassword = () => (
    <Form fluid>
        <FormGroup>
            <ControlLabel>Password</ControlLabel>
            <FormControl name="password" />
        </FormGroup>
        <FormGroup>
            <ButtonToolbar>
                <Button appearance="primary" href="">Continue</Button>
            </ButtonToolbar>
        </FormGroup>
    </Form>
);

export default GetPassword;