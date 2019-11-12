import React from 'react';
import Router from 'next/router';
import { firebase } from '../../firebase';

const ifAuthorized = (needsAuthorization) => (Component) => {
    class ifAuthorized extends React.Component {
        componentDidMount() {
            firebase.auth.onAuthStateChanged(authUser => {
                if (authUser) {
                    Router.push('/dashboard')
                }
            });
        }

        render() {
            return (
                <Component {...this.props} />
            );
        }
    }

    return ifAuthorized;
}

export default ifAuthorized;