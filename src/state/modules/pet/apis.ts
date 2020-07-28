import { ApiConstructor } from 'services';

import * as actions from './actions';
import { Pet } from 'state';

const apiConstructor = new ApiConstructor<Pet>({ name: 'pet' });

apiConstructor.createApi<actions.FindPetsPayload, actions.FindPetsResult>({
  path: '/findByStatus',
  action: actions.findPets,
  successReducer: (state, result) => {
    state.items = result;
    state.waiting = false;
  },
});

apiConstructor.createApi<actions.DeletePetPayload, unknown>({
  path: '/:id',
  method: 'DELETE',
  action: actions.deletePet,
  successReducer: (state, result, payload) => {
    state.items = state.items.filter(pet => pet.id !== payload.id);
    state.waiting = false;
  },
});

export default apiConstructor;
