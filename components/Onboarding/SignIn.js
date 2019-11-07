import React from 'react';
import {
    Button,
    ButtonToolbar,
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
    Content,
    FlexboxGrid
} from 'rsuite';

const SignIn = () => (
    <Content>
        <FlexboxGrid justify="center">
            <FlexboxGrid.Item colspan={12}>
                <Form fluid>
                    <FormGroup>
                        <ControlLabel>Username or email address</ControlLabel>
                        <FormControl name="name" />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Password</ControlLabel>
                        <FormControl name="password" type="password" />
                    </FormGroup>
                    <FormGroup>
                        <ButtonToolbar>
                            <Button appearance="primary" href="/game">Sign in</Button>
                            <Button appearance="link">Forgot password?</Button>
                        </ButtonToolbar>
                    </FormGroup>
                </Form>
            </FlexboxGrid.Item>
        </FlexboxGrid>
    </Content>
);

export default SignIn;