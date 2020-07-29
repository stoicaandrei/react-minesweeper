export const EASY = { rows: 10, cols: 10, bombs: 10 };
export const INTERMEDIATE = { rows: 16, cols: 16, bombs: 40 };
export const EXPERT = { rows: 16, cols: 30, bombs: 99 };

export type Difficulties = 'Easy' | 'Intermediate' | 'Expert';
export const DIFFICULTIES = {
  Easy: EASY,
  Intermediate: INTERMEDIATE,
  Expert: EXPERT,
};
