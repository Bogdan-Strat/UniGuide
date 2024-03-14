import * as actions from "../types";

const AuthenticationState = {
    email: "",
    token: "",
    expiration: "",
    name: "",
    isFirstTime: true
};

const tokenReducer = (state = AuthenticationState, action) => {
    switch (action.type) {
        case actions.SET_TOKEN:
            return {
                ...state,
                email: action.payload.email,
                token: action.payload.token,
                name: action.payload.name,
                isFirstTime: action.payload.isFirstTime,
                expiration: action.payload.expirationDate,
            };
        case actions.SET_IS_FIRST_TIME: 
            return {
                ...state,
                isFirstTime: action.payload.isFirstTime,
            }
        case actions.LOGOUT:
            return AuthenticationState;
        default:
            return state;
    }
};

export default tokenReducer;