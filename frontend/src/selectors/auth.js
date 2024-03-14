export const isUserAuthenticatedSelector = (state) => state.tokenReducer.token;
export const isFirstTimeSelector = (state) => state.tokenReducer.isFirstTime;
export const nameSelector = (state) => state.tokenReducer.name;