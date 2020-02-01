import { createSelector } from 'reselect';
import { AppState } from '../app/reducer';

const getState = (state: AppState) => state.auth;

export const makeUserSelector = () => (
  createSelector(
    getState,
    (state) => state.user,
  )
);

export const makeTokenSelector = () => (
  createSelector(
    getState,
    (state) => state.token,
  )
);