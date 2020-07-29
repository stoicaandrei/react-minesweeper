import { Moment } from 'moment';

export type Cell = {
  is_revealed: boolean;
  is_bomb: boolean;
  is_flagged: boolean;

  value: number;

  x: number;
  y: number;
  size?: number;
};

export type GameStatus = 'playing' | 'won' | 'lost';

export type Board = {
  rows: number;
  cols: number;
  bombs: number;
  status: GameStatus;
  startTime: Date;
  cells: Cell[][];
};
