import { ApiManager } from 'services';

import { Board } from 'state';

export const apiManager = new ApiManager();

export type StoreState = {
  board: Board;
};
