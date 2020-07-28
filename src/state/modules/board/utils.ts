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
