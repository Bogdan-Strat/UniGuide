import * as actions from "../types";

export const tokenActionCreators = {
    setToken: (email, token, expirationDate, name, phoneNumber) => ({
        type: actions.SET_TOKEN,
        payload: { email, token, expirationDate, name, phoneNumber },
    }),
    logout: () => ({ type: actions.LOGOUT }),
};
