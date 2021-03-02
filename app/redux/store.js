import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga'
import rootReducer from './rootReducer';

import graphSaga from './graph/graphSaga';
import userSaga from './user/userSaga';

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware];

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));

sagaMiddleware.run(graphSaga)
sagaMiddleware.run(userSaga)

export default store;
