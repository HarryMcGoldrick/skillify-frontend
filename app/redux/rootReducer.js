import { combineReducers } from 'redux';
import undoable from 'redux-undo';
import graphReducer from './graph/graphReducer';
import userReducer from './user/userReducer';

export default combineReducers({ graph: undoable(graphReducer), user: userReducer });
