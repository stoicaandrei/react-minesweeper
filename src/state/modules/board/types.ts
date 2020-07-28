export type Cell = {
  visible: boolean;
  is_bomb: boolean;
  is_flagged: boolean;

  value: number;

  x: number;
  y: number;
  size?: number;
};

export type Board = {
  cells: Cell[][];
};
