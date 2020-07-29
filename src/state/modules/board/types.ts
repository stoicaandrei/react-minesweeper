export type Cell = {
  is_revealed: boolean;
  is_bomb: boolean;
  is_flagged: boolean;

  value: number;

  x: number;
  y: number;
  size?: number;
};

export type Board = {
  rows: number;
  cols: number;
  bombs: number;
  cells: Cell[][];
};
