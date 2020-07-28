import { Action } from 'typescript-fsa';
import { takeEvery, call, put, ForkEffect } from 'redux-saga/effects';

import {
  reducerWithInitialState,
  ReducerBuilder,
} from 'typescript-fsa-reducers';
import { produce } from 'immer';

import { API, apiCaller, ApiCaller, ApiState } from 'services';

type constructorParams = {
  name: string;
  endpoint?: string;
};

export default class ApiConstructor<Entity> {
  readonly name: string;
  readonly initialState = {
    items: [],
    waiting: false,
  };

  private apiCaller: ApiCaller;

  private sagaEffects: ForkEffect[] = [];
  readonly reducer: ReducerBuilder<any>;

  constructor({ name, endpoint }: constructorParams) {
    this.apiCaller = apiCaller(endpoint || name);
    this.reducer = reducerWithInitialState(this.initialState);
    this.name = name;
  }

  public createApi<Payload, Result>(
    api: API<Payload, Result, ApiState<Entity>>
  ) {
    /* eslint-disable no-eval */
    const self = this;

    this.sagaEffects.push(
      takeEvery(api.action.started, function* (action: Action<Payload>) {
        try {
          const result = yield call(() =>
            self.apiCaller<Payload>({ ...api, data: action.payload } as any)
          );
          yield put(api.action.done({ params: action.payload, result }));
        } catch (error) {
          console.log(error);
          yield put(api.action.failed({ params: action.payload, error }));
        }
      })
    );

    this.reducer.case(api.action.started, (state, payload) =>
      produce(state, (draft: any) => {
        if (api.startReducer) return api.startReducer(draft, payload);

        draft.waiting = true;
        draft.error = undefined;
      })
    );

    this.reducer.case(api.action.failed, (state, { params, error }) =>
      produce(state, (draft: any) => {
        if (api.failReducer)
          return api.failReducer(draft, error, params as Payload);

        draft.waiting = false;
        draft.error = error;
      })
    );

    this.reducer.case(api.action.done, (state, { params, result }) =>
      produce(state, (draft: any) => {
        api.successReducer(draft, result as Result, params as Payload);
      })
    );
  }

  get saga() {
    const self = this;
    return function* () {
      for (const effect of self.sagaEffects) {
        yield effect;
      }
    };
  }
}
