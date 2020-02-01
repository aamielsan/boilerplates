import { createReducer, Handler } from 'redux-act';
import * as actions from './actions';
import * as types from './types';

// initial state
const INIT_STATE: types.AuthState = {
  user: null,
  token: null,
};

// handlers
const setUser: Handler<typeof INIT_STATE, types.SetUserPayload> = (state, { user }) => {
  return {
    ...state,
    user,
  };
};

const setToken: Handler<typeof INIT_STATE, types.SetTokenPayload> = (state, { token }) => {
  return {
    ...state,
    token,
  };
};

// reducer
const reducer = createReducer<typeof INIT_STATE>({}, INIT_STATE);

// reducer-handler
reducer.on(actions.setUser, setUser);
reducer.on(actions.setToken, setToken);

export default reducer;
