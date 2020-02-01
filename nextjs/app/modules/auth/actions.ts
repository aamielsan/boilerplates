import { createAction } from 'redux-act';
import * as types from './types';

// types
// actions
export const setUser = createAction<types.SetUserPayload>('set user');
export const setToken = createAction<types.SetTokenPayload>('set token');
