import {
    AUTH_LOGIN_USER_REQUEST,
    AUTH_LOGIN_USER_SUCCESS,
    AUTH_LOGIN_USER_FAILURE,
    AUTH_LOGOUT_USER
} from '../constants';


const initialState = {
    token: null,
    userName: null,
    isAuthenticated: false,
    isStaff: false,
    isSuperUser: false,
    isAuthenticating: false,
    statusText: null
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_LOGIN_USER_REQUEST:
            return Object.assign({}, state, {
                isAuthenticating: true,
                statusText: null
            });

        case AUTH_LOGIN_USER_SUCCESS:
            return Object.assign({}, state, {
                isAuthenticating: false,
                isAuthenticated: true,
                token: action.payload.token,
                userName: action.payload.user.email,
                isStaff: action.payload.user.is_staff,
                isSuperUser: action.payload.user.is_superuser,
                statusText: 'You have been successfully logged in.'
            });

        case AUTH_LOGIN_USER_FAILURE:
            return Object.assign({}, state, {
                isAuthenticating: false,
                isAuthenticated: false,
                token: null,
                userName: null,
                isStaff: null,
                isSuperUser: null,
                statusText: `Authentication Error: ${action.payload.status} - ${action.payload.statusText}`
            });

        case AUTH_LOGOUT_USER:
            return Object.assign({}, state, {
                isAuthenticated: false,
                token: null,
                userName: null,
                isStaff: null,
                isSuperUser: null,
                statusText: 'You have been successfully logged out.'
            });

        default:
            return state;
    }
}
