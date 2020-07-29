import { StoreState } from '../root';

export const board = (state: StoreState) => state.board;
export const gameStatus = (state: StoreState) => state.board.status;
