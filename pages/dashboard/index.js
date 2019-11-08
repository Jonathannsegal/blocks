import React from 'react';
import { withRedux } from '../../src/lib/redux'
import { useSelector } from 'react-redux'
import {
    Button
} from 'rsuite';
import { AppWithAuthorization } from "../../src/components/App";

const useDashboard = () => {
    const authUser = useSelector(state => state.authUser)
    return { authUser }
}

const dashboard = () => {
    const { authUser } = useDashboard()
    return (
        < AppWithAuthorization >
            <h1>Account: {authUser.email}</h1>
            <Button appearance="primary" href="/game">Play Game</Button>
        </AppWithAuthorization >
    )
}

export default withRedux(dashboard);
