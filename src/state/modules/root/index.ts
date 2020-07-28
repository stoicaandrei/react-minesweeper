import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import { ApiState } from 'services';

import { Pet } from 'state';

import petApis from '../pet/apis';

export type StoreState = {
  pet: ApiState<Pet>;
};

export const rootReducer = combineReducers({
  [petApis.name]: petApis.reducer,
});

export function* rootSaga() {
  yield all([petApis.saga()]);
}
