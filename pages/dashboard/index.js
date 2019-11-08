import React from 'react';
import { withRedux } from '../../src/lib/redux'
import { useSelector } from 'react-redux'
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
        </AppWithAuthorization >
    )
}

export default withRedux(dashboard);
