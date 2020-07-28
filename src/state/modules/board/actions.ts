import * as types from './types';

import { stateManager } from '../root';

type State = types.Board;
const stateModule = 'board';

stateManager.createModule(stateModule, { initialState: {} });

export const test = stateManager.createLocalEvent<unknown, State>(
  stateModule,
  'TEST',
  (state, payload) => {
    console.log({ state, payload });
  }
);
