import { createStore, compose, applyMiddleware, StoreEnhancer } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension/logOnlyInProduction';
import createSagaMiddleware from 'redux-saga';

import { stateManager, StoreState } from './modules/root/';

import { createSocketMiddleware } from 'services';

/**
 * Create the redux-saga middleware.
 */
const sagaMiddleware = createSagaMiddleware();

/**
 * Enhancers for the store.
 */
const enhancers = compose(
  /* Add the redux-saga middleware */
  applyMiddleware(createSocketMiddleware(stateManager)),
  applyMiddleware(sagaMiddleware),
  /* Include the devtools. Comment this out if you don't want to use the dev tools. */
  devToolsEnhancer({})
) as StoreEnhancer<StoreState>;

/**
 * Create the store. We do not include an initial state, as each of the module / duck
 * reducers includes its own initial state.
 */
const store = createStore(stateManager.reducer, enhancers);

/* Run the root saga */
sagaMiddleware.run(stateManager.saga);

export function getStore() {
  return store;
}
