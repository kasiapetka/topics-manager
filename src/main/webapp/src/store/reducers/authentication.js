import * as actionTypes from '../actions'

const initialState = {
    auth: false,
    id: null,
    email: null,
    role: null,
    token: null
};

const parseJwt = (token) => {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload).sub;
};

const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.LOGIN:
            const email = parseJwt(action.payload.token);

            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('role', action.payload.role);
            localStorage.setItem('email', email);
            localStorage.setItem('auth', 'true');

            return {
                ...state,
                role: action.payload.role,
                token: action.payload.token,
                email: email,
                auth: true
            };
        case actionTypes.LOGOUT:
            return {
                ...state,
                auth: false,
                role: null,
                token: null,
                email: null,
                id:null
            };
        case actionTypes.SAVE_ID:
            return {
                ...state,
                id: action.id
            };
        default:
            return state;
    }
};

export default authReducer;