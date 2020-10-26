import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from 'ducks';
import rootSaga from 'sagas';

const MODE = process.env.REACT_APP_MODE;

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  let store;
  if (MODE === 'DEV')
    store = createStore(
      rootReducer,
      compose(
        applyMiddleware(sagaMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      )
    );
  else if (MODE === 'PROD')
    store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
