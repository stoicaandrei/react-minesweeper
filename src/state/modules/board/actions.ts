import { stateManager } from '../root';

import { Board, Cell } from './types';
import {
  getNeighbors,
  revealCell,
  countFlags,
  generateBoard,
  computeGameStatus,
} from './utils';


type State = Board;
const moduleName = 'board';

stateManager.createModule(moduleName, { initialState: { cells: [] } });

export const initBoard = stateManager.createLocalEvent<
  { cols: number; rows: number; bombs: number },
  State
>(moduleName, 'INIT_BOARD', (state, { cols, rows, bombs }) => {
  state.rows = rows;
  state.cols = cols;
  state.bombs = bombs;
  generateBoard(rows, cols, bombs, state);
});

export const resetBoard = stateManager.createLocalEvent<unknown, State>(
  moduleName,
  'RESET_BOARD',
  state => {
    const { rows, cols, bombs } = state;
    generateBoard(rows, cols, bombs, state);
  }
);

export const triggerReveal = stateManager.createLocalEvent<Cell, State>(
  moduleName,
  'TRIGGER_REVEAL',
  (state, { x, y }) => {
    const cell = state.cells[x][y];

    if (!cell.is_revealed) revealCell(cell, state);
    else if (countFlags(cell, state.cells) === cell.value)
      getNeighbors(cell, state.cells).forEach(cell => revealCell(cell, state));

    computeGameStatus(state);
  }
);

export const triggerFlag = stateManager.createLocalEvent<Cell, State>(
  moduleName,
  'TRIGGER_FLAG',
  (state, { x, y }) => {
    const cell = state.cells[x][y];

    if (cell.is_revealed) return;

    cell.is_flagged = !cell.is_flagged;
  }
);
