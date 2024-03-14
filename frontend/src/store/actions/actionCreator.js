import * as actions from "../types";

export const tokenActionCreators = {
    setToken: (email, token, name, isFirstTime, expirationDate) => ({
        type: actions.SET_TOKEN,
        payload: { email, token, name, isFirstTime, expirationDate },
    }),
    setIsFirstTime: (value) => ({
        type: actions.SET_IS_FIRST_TIME,
        payload: {isFirstTime: value}
    }),
    logout: () => ({ type: actions.LOGOUT }),
};
