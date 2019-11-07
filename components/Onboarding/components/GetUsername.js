import React from 'react';
import {
    Button,
    ButtonToolbar,
    Form,
    FormGroup,
    FormControl,
    ControlLabel
} from 'rsuite';

const GetUsername = () => (
    <Form fluid>
        <FormGroup>
            <ControlLabel>Username</ControlLabel>
            <FormControl name="name" />
        </FormGroup>
        <FormGroup>
            <ButtonToolbar>
                <Button appearance="primary" href="">Continue</Button>
            </ButtonToolbar>
        </FormGroup>
    </Form>
);

export default GetUsername;