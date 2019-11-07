import React from 'react';
import {
    Content,
    FlexboxGrid,
    Progress
} from 'rsuite';
import GetUsername from './components/GetUsername';
import GetEmail from './components/GetEmail';
import GetPassword from './components/GetPassword';
import GetPasswordValidate from './components/GetPasswordValidate';
import AddProfilePicture from './components/AddProfilePicture';

const { Line } = Progress;

const SignUp = () => (
    <Content>
        <FlexboxGrid justify="center">
            <FlexboxGrid.Item colspan={12}>
                <Line percent={50} status='active' strokeColor="#87d13f" showInfo={false} />
                <br />
                <GetUsername />
                <GetEmail />
                <GetPassword />
                <GetPasswordValidate />
                <AddProfilePicture />
            </FlexboxGrid.Item>
        </FlexboxGrid>
    </Content>
);

export default SignUp;