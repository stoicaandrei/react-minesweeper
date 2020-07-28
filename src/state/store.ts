import { createStore, compose, applyMiddleware, StoreEnhancer } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension/logOnlyInProduction';
import createSagaMiddleware from 'redux-saga';

import { rootSaga, rootReducer, StoreState } from './modules/root/';

/**
 * Create the redux-saga middleware.
 */
const sagaMiddleware = createSagaMiddleware();

/**
 * Enhancers for the store.
 */
const enhancers = compose(
  /* Add the redux-saga middleware */
  applyMiddleware(sagaMiddleware),
  /* Include the devtools. Comment this out if you don't want to use the dev tools. */
  devToolsEnhancer({})
) as StoreEnhancer<StoreState>;

/**
 * Create the store. We do not include an initial state, as each of the module / duck
 * reducers includes its own initial state.
 */
const store = createStore(rootReducer, enhancers);

/* Run the root saga */
sagaMiddleware.run(rootSaga);

export function getStore() {
  return store;
}
