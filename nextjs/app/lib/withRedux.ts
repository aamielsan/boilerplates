import { ComponentType } from 'react';
import { default as withReduxWrapper } from 'next-redux-wrapper';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { loggers } from 'redux-act';
import rootSaga from '../modules/app/saga';
import rootReducer from '../modules/app/reducer';

const makeStore = (initialState: any = {}, opts: any) => {
  const middlewares = [];

  // redux-saga
  const sagaMiddleware = createSagaMiddleware();
  middlewares.push(sagaMiddleware);

  // redux-logger
  if (process.env.NODE_ENV === 'development') {
    const logger = createLogger({
      actionTransformer: loggers.reduxLogger.actionTransformer,
      logger: loggers.reduxLogger.logger,
    });

    middlewares.push(logger);
  }

  const store = createStore(
    rootReducer,
    makeInitialState(initialState, opts),
    applyMiddleware(...middlewares)
  );

  // post-setup
  sagaMiddleware.run(rootSaga);

  // return
  return store;
};

const makeInitialState = (state, opts) => {
  // Making the state from server
  if (opts.req) {
    return {
      ...state,
      auth: {
        user: opts.req.user,
      },
    };
  }

  // Making the state from client
  return state;
}

export const withRedux = <P extends object>(App: ComponentType<P>) => {
  return withReduxWrapper(makeStore)(App);
};