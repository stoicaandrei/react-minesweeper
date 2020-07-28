import { AsyncActionCreators } from 'typescript-fsa';

export type API<Payload, Result, ApiState> = {
  path: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: Payload;
  auth?: boolean;
  action: AsyncActionCreators<Payload, Result, Error>;
  successReducer: (state: ApiState, result: Result, payload: Payload) => void;
  failReducer?: (state: ApiState, error: Error, payload: Payload) => void;
  startReducer?: (state: ApiState, payload: Payload) => void;
};
