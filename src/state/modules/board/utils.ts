import { Cell } from 'state';

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
