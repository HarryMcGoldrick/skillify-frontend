import { combineReducers } from 'redux';
import graphReducer from './graph/graphReducer';
import userReducer from './user/userReducer';

export default combineReducers({ graph: graphReducer, user: userReducer });
