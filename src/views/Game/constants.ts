import { Difficulty } from 'state';

type Level = {
  rows: number;
  cols: number;
  bombs: number;
  difficulty: Difficulty;
};

export const EASY: Level = {
  rows: 10,
  cols: 10,
  bombs: 10,
  difficulty: 'Easy',
};
export const INTERMEDIATE: Level = {
  rows: 16,
  cols: 16,
  bombs: 40,
  difficulty: 'Intermediate',
};
export const EXPERT: Level = {
  rows: 16,
  cols: 30,
  bombs: 99,
  difficulty: 'Expert',
};

export const DIFFICULTIES = {
  [EASY.difficulty]: EASY,
  [INTERMEDIATE.difficulty]: INTERMEDIATE,
  [EXPERT.difficulty]: EXPERT,
};
