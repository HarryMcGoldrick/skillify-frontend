import { combineReducers } from 'redux';
import graphReducer from './graph/graphReducer';

export default combineReducers({ graph: graphReducer });
