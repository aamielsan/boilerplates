import { all, call } from 'redux-saga/effects';
import { saga as authSaga } from '../auth';

export default function*() {
  try {
    yield call(initializeServices);
    yield all([
      ...authSaga,
    ]);
  } catch (e) {
    console.error('@rootSaga: ', e);
    throw e;
  }
}

function* initializeServices() {
  try {
    console.log('initializing services...');
  } catch (e) {
    console.error('@initializeServices: ', e);
    throw e;
  }
}
