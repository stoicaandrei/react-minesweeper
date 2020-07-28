import { StateManager } from 'services';

import { Board } from 'state';

export const stateManager = new StateManager();

export type StoreState = {
  board: Board;
};
