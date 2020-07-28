import * as types from './types';

import { apiManager } from '../root';

type State = types.Board;
const stateModule = 'board';

apiManager.createModule(stateModule, { initialState: {} });

export const test = apiManager.createLocalEvent<unknown, State>(
  stateModule,
  'TEST',
  (state, payload) => {
    console.log({ state, payload });
  }
);
