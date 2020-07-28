import { stateManager } from '../root';

import { Board, Cell } from './types';
import { getNeighbors } from './utils';

type State = Board;
const moduleName = 'board';

stateManager.createModule(moduleName, { initialState: { cells: [] } });

export const test = stateManager.createLocalEvent<unknown, State>(
  moduleName,
  'TEST',
  (state, payload) => {
    console.log({ state, payload });
  }
);

export const initBoard = stateManager.createLocalEvent<
  { cols: number; rows: number; bombs: number },
  State
>(moduleName, 'INIT_BOARD', (state, payload) => {
  const { cols, rows, bombs } = payload;

  for (let i = 0; i < cols; i++) {
    state.cells.push([]);
    for (let j = 0; j < rows; j++) {
      state.cells[i].push({
        visible: false,
        is_bomb: false,
        is_flagged: false,
        value: 0,

        x: i,
        y: j,
      });
    }
  }

  const options = [];
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      options.push([i, j]);
    }
  }

  function pickRandomAndRemove(arr: any[]) {
    const index = Math.floor(Math.random() * arr.length);
    const res = arr[index];
    arr.splice(index, 1);
    return res;
  }

  for (let i = 0; i < bombs; i++) {
    if (!options.length) return;

    const [x, y] = pickRandomAndRemove(options);

    state.cells[x][y].is_bomb = true;

    getNeighbors(state.cells[x][y], state.cells).forEach(cell =>
      !cell.is_bomb ? (cell.value += 1) : null
    );
  }
});
