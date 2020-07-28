import actionCreatorFactory, { Action } from 'typescript-fsa';

import { Pet, PetStatus } from './types';

const actionCreator = actionCreatorFactory('Pet');

export type FindPetsPayload = {
  status: PetStatus;
};
export type FindPetsResult = Pet[];

export const findPets = actionCreator.async<
  FindPetsPayload,
  FindPetsResult,
  Error
>('FIND_ALL');

export type DeletePetPayload = {
  id: number;
};

export const deletePet = actionCreator.async<DeletePetPayload, unknown, Error>(
  'DELETE'
);
