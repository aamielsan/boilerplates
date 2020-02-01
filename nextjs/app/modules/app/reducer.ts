//
// ─── ROOT REDUCER ────────────────────────────────────────────────────────────────────
//

import { combineReducers } from 'redux';
import { reducer as authReducer } from '../auth';

const rootReducer = combineReducers({
  auth: authReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;