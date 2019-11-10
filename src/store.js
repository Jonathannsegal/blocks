import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import SignUpState from './constants/signUpState';
import HomeState from './constants/homeState';
import DashboardState from './constants/dashboardState';
import GameState from './constants/gameState';

const initialState = {
    authUser: null,
    users: [],
    homeState: HomeState.signIn,
    signUpState: SignUpState.userName,
    signUpFormValue: {
        userName: '',
        email: '',
        password: '',
        verifyPassword: ''
    },
    signInFormValue: {
        email: '',
        password: ''
    },
    dashboardState: DashboardState.home,
    gameState: GameState.main

}

const applySetUsers = (state, action) => ({
    ...state,
    users: action.users
});

const applySetAuthUser = (state, action) => ({
    ...state,
    authUser: action.authUser
});

const reducer = (state = { initialState, input: {} }, action) => {
    switch (action.type) {
        case 'gameChat':
            return {
                ...state,
                gameState: GameState.chat
            }
        case 'gameMain':
            return {
                ...state,
                gameState: GameState.main
            }
        case 'gameStatus':
            return {
                ...state,
                gameState: GameState.status
            }
        case 'dashboardProfile':
            return {
                ...state,
                dashboardState: DashboardState.profile
            }
        case 'dashboardHome':
            return {
                ...state,
                dashboardState: DashboardState.home
            }
        case 'dashboardLeaderboard':
            return {
                ...state,
                dashboardState: DashboardState.leaderboard
            }
        case 'USERS_SET': {
            return applySetUsers(state, action);
        }
        case 'AUTH_USER_SET': {
            return applySetAuthUser(state, action);
        }
        case ('UPDATE_SIGNIN_STATE'):
            return {
                ...state,
                signUpState: action.payload.txt
            }
        case ('UPDATE_SIGNIN_EMAIL'):
            return {
                ...state,
                signInFormValue: {
                    ...state.signInFormValue,
                    email: action.payload.txt
                }
            }
        case ('UPDATE_SIGNIN_PASSWORD'):
            return {
                ...state,
                signInFormValue: {
                    ...state.signInFormValue,
                    password: action.payload.txt
                }
            }
        case ('UPDATE_SIGNUP_USERNAME'):
            return {
                ...state,
                signUpFormValue: {
                    ...state.signUpFormValue,
                    userName: action.payload.txt.userName
                }
            }
        case ('UPDATE_SIGNUP_EMAIL'):
            return {
                ...state,
                signUpFormValue: {
                    ...state.signUpFormValue,
                    email: action.payload.txt.email
                }
            }
        case ('UPDATE_SIGNUP_PASSWORD'):
            return {
                ...state,
                signUpFormValue: {
                    ...state.signUpFormValue,
                    password: action.payload.txt.password
                }
            }
        case ('UPDATE_SIGNUP_VERIFYPASSWORD'):
            return {
                ...state,
                signUpFormValue: {
                    ...state.signUpFormValue,
                    verifyPassword: action.payload.txt.password
                }
            }
        case 'signUpNone':
            return {
                ...state,
                signUpState: SignUpState.none
            }
        case 'signUpUsername':
            return {
                ...state,
                signUpState: SignUpState.userName
            }
        case 'signUpEmail':
            return {
                ...state,
                signUpState: SignUpState.email
            }
        case 'signUpPassword':
            return {
                ...state,
                signUpState: SignUpState.password
            }
        case 'signUpPasswordValidate':
            return {
                ...state,
                signUpState: SignUpState.passwordVerify
            }
        case 'done':
            return {
                ...state,
                signUpState: SignUpState.done
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

const composeEnhancers = composeWithDevTools({
    trace: true
})
export const initializeStore = (preloadedState = initialState) => {
    return createStore(
        reducer,
        preloadedState,
        composeEnhancers(applyMiddleware())
    )
}
