import moment from 'moment';

import { Cell, Board } from 'state';

export function getNeighbors(cell: Cell, cells: Cell[][]) {
  const { x, y } = cell;

  const neighbors: Cell[] = [];

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const nx = x + i;
      const ny = y + j;
      if (!cells[nx] || !cells[nx][ny]) continue;

      neighbors.push(cells[nx][ny]);
    }
  }

  return neighbors;
}

export function revealAll(state: Board) {
  state.cells.forEach(row => {
    row.forEach(cell => {
      cell.is_revealed = true;
    });
  });
}

export function revealCell(cell: Cell, state: Board) {
  if (cell.is_revealed || cell.is_flagged) return;

  cell.is_revealed = true;
  if (cell.is_bomb) revealAll(state);
  if (!cell.value)
    getNeighbors(cell, state.cells).map(cell => revealCell(cell, state));
}

export function countFlags(cell: Cell, cells: Cell[][]) {
  return getNeighbors(cell, cells).reduce(
    (p, c) => (c.is_flagged ? p + 1 : p),
    0
  );
}

export function computeGameStatus(board: Board) {
  for (const row of board.cells) {
    for (const cell of row) {
      if (cell.is_revealed && cell.is_bomb) return (board.status = 'lost');
      if (!cell.is_revealed && !cell.is_bomb) return (board.status = 'playing');
    }
  }

  board.status = 'won';
}

export function generateBoard(
  rows: number,
  cols: number,
  bombs: number,
  state: Board
) {
  state.status = 'playing';
  state.cells = [];
  for (let i = 0; i < rows; i++) {
    state.cells.push([]);
    state.startTime = new Date();
    for (let j = 0; j < cols; j++) {
      state.cells[i].push({
        is_revealed: false,
        is_bomb: false,
        is_flagged: false,
        value: 0,

        x: i,
        y: j,
      });
    }
  }

  const options = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
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
}
