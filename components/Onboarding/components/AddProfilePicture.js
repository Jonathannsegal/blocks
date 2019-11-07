import React from 'react';
import {
    Button,
    ButtonToolbar,
    Form,
    FormGroup,
    FormControl,
    ControlLabel
} from 'rsuite';

const AddProfilePicture = () => (
    <Form fluid>
        <FormGroup>
            <ControlLabel>Profile Picture</ControlLabel>
            <FormControl name="text" />
        </FormGroup>
        <FormGroup>
            <ButtonToolbar>
                <Button appearance="primary" href="">Continue</Button>
            </ButtonToolbar>
        </FormGroup>
    </Form>
);

export default AddProfilePicture;