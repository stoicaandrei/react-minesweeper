import { StoreState } from '../root';

export const available = (state: StoreState) =>
  state.pet.items
    .filter(pet => pet.status === 'available')
    .sort((a, b) => a.id - b.id);
export const error = (state: StoreState) => state.pet.error;
export const waiting = (state: StoreState) => state.pet.waiting;
