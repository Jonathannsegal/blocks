import React from 'react';
import {
    Button,
    ButtonToolbar,
    Form,
    FormGroup,
    FormControl,
    ControlLabel
} from 'rsuite';

const GetEmail = () => (
    <Form fluid>
        <FormGroup>
            <ControlLabel>Email</ControlLabel>
            <FormControl name="email" />
        </FormGroup>
        <FormGroup>
            <ButtonToolbar>
                <Button appearance="primary" href="">Continue</Button>
            </ButtonToolbar>
        </FormGroup>
    </Form>
);

export default GetEmail;