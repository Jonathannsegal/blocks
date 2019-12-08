import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    SignUpState,
    HomeState,
    DashboardState,
    GameState,
    PasswordForgotFormState,
    LeaderBoardState,
    JoinState
} from './constants';

const initialState = {
    authUser: null,
    users: {},
    userValues: null,
    currentGame: null,
    currentGameValues: [],
    searchGameList: [],
    currentGamePlayerValues: [],
    homeState: HomeState.signIn,
    joinState: JoinState.main,
    signUpState: SignUpState.userName,
    changePassword: '',
    changeUsername: '',
    signUpFormValue: {
        userName: '',
        email: '',
        password: '',
        verifyPassword: ''
    },
    createGameFormValue: {
        name: '',
        numberOfObjectives: 0,
        geometry: []
    },
    createTeamFormValue: {
        name: '',
        color: ''
    },
    currentGameTeamList: [],
    signUpFormError: '',
    signInFormValue: {
        email: '',
        password: ''
    },
    forgotPasswordFormValue: {
        email: ''
    },
    passwordForgotFormState: PasswordForgotFormState.unsubmitted,
    passwordForgotFormMessage: '',
    dashboardState: DashboardState.home,
    leaderBoardState: LeaderBoardState.friends,
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

const applyGameValueSet = (state, action) => ({
    ...state,
    currentGameValues: action.values
});

const applyUserValueSet = (state, action) => ({
    ...state,
    userValues: action.values
});

const getCurrentGamePlayerValues = (state, action) => ({
    ...state,
    currentGamePlayerValues: action.values
});

const getGameList = (state, action) => ({
    ...state,
    searchGameList: action.list
});

const getTeamList = (state, action) => ({
    ...state,
    currentGameTeamList: action.list
});

const reducer = (state = { initialState, input: {} }, action) => {
    switch (action.type) {
        case 'GET_CURRENTGAME_PLAYER_VALUES': {
            return getCurrentGamePlayerValues(state, action);
        }
        case ('UPDATE_TEAMCREATE_NAME'):
            return {
                ...state,
                createTeamFormValue: {
                    ...state.createTeamFormValue,
                    name: action.payload.txt
                }
            }
        case ('UPDATE_TEAMCREATE_COLOR'):
            return {
                ...state,
                createTeamFormValue: {
                    ...state.createTeamFormValue,
                    color: action.color
                }
            }
        case 'GET_TEAMLIST': {
            return getTeamList(state, action);
        }
        case 'joinMain':
            return {
                ...state,
                joinState: JoinState.main
            }
        case 'joinTeam':
            return {
                ...state,
                joinState: JoinState.teamCreate
            }
        case 'joinWait':
            return {
                ...state,
                joinState: JoinState.waiting
            }
        case 'GET_GAMELIST': {
            return getGameList(state, action);
        }
        case 'CURRENT_GAMEVALUE_SET': {
            return applyGameValueSet(state, action);
        }
        case 'CURRENT_USERVALUE_SET': {
            return applyUserValueSet(state, action);
        }
        case ('SET_CURRENTGAME'):
            return {
                ...state,
                currentGame: action.input
            }
        case ('UPDATE_GAMECREATE_NAME'):
            return {
                ...state,
                createGameFormValue: {
                    ...state.createGameFormValue,
                    name: action.payload.txt
                }
            }
        case ('UPDATE_GAMECREATE_NUMBEROFOBJECTIVES'):
            return {
                ...state,
                createGameFormValue: {
                    ...state.createGameFormValue,
                    numberOfObjectives: action.input
                }
            }
        case ('UPDATE_GAMECREATE_GEO'):
            return {
                ...state,
                createGameFormValue: {
                    ...state.createGameFormValue,
                    geometry: action.geometry
                }
            }
        case ('UPDATE_NEWPASSWORD'):
            return {
                ...state,
                changePassword: action.payload.txt
            }
        case ('UPDATE_NEWUSERNAME'):
            return {
                ...state,
                changeUsername: action.payload.txt
            }
        case 'leaderBoardStateFriends':
            return {
                ...state,
                leaderBoardState: LeaderBoardState.friends
            }
        case 'leaderBoardStateGlobal':
            return {
                ...state,
                leaderBoardState: LeaderBoardState.global
            }
        case 'passwordForgotStateUnsubmit':
            return {
                ...state,
                passwordForgotFormState: PasswordForgotFormState.unsubmitted
            }
        case 'passwordForgotStateSent':
            return {
                ...state,
                passwordForgotFormState: PasswordForgotFormState.sent
            }
        case 'passwordForgotStateError':
            return {
                ...state,
                passwordForgotFormState: PasswordForgotFormState.error
            }
        case ('UPDATE_FORGOTPASSWORD_EMAIL'):
            return {
                ...state,
                forgotPasswordFormValue: {
                    ...state.forgotPasswordFormValue,
                    email: action.payload.txt
                }
            }
        case ('SIGNUP_FORM_ERROR'):
            return {
                ...state,
                signUpFormError: action.payload.txt
            }
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
        case 'homeForgotPassword':
            return {
                ...state,
                homeState: HomeState.forgotPassword
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
