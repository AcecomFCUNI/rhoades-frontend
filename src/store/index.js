import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from 'ducks';
import rootSaga from 'sagas';

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  // production and remote development 
  let store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

  // // remote development
  // if (process.env.REACT_APP_MODE !== 'production')
  //   store = createStore(
  //     rootReducer,
  //     compose(
  //       applyMiddleware(sagaMiddleware),
  //       window.__REDUX_DEVTOOLS_EXTENSION__ &&
  //         window.__REDUX_DEVTOOLS_EXTENSION__()
  //     )
  //   );
  
  // local development
  // if (process.env.NODE_ENV !== 'production')
  // store = createStore(
  //   rootReducer,
  //   compose(
  //     applyMiddleware(sagaMiddleware),
  //     window.__REDUX_DEVTOOLS_EXTENSION__ &&
  //       window.__REDUX_DEVTOOLS_EXTENSION__()
  //   )
  // );
  

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
