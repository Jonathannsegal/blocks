import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import SignUpState from './constants/signUpState';
import HomeState from './constants/homeState';

const initialState = {
    homeState: HomeState.signIn,
    signUp: SignUpState.userName
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'signUpNone':
            return {
                ...state,
                signUp: SignUpState.none
            }
        case 'signUpUsername':
            return {
                ...state,
                signUp: SignUpState.userName
            }
        case 'signUpEmail':
            return {
                ...state,
                signUp: SignUpState.email
            }
        case 'signUpPassword':
            return {
                ...state,
                signUp: SignUpState.password
            }
        case 'signUpPasswordValidate':
            return {
                ...state,
                signUp: SignUpState.passwordVerify
            }
        case 'done':
            return {
                ...state,
                signUp: SignUpState.done
            }
        case 'homeSignIn':
            return {
                ...state,
                homeState: HomeState.signIn
            }
        case 'homeSignUp':
            return {
                ...state,
                homeState: HomeState.signUp
            }
        default:
            return state
    }
}

export const initializeStore = (preloadedState = initialState) => {
    return createStore(
        reducer,
        preloadedState,
        composeWithDevTools(applyMiddleware())
    )
}
