import { StoreState } from '../root';

export const board = (state: StoreState) => state.board;
export const gameStatus = (state: StoreState) => state.board.status;

export const bombsLeft = (state: StoreState) => {
  const cells = state.board.cells.flat(1);

  const bombs = state.board.bombs;
  const flags = cells.reduce((p, c) => (c.is_flagged ? p + 1 : p), 0);

  return bombs - flags;
};
