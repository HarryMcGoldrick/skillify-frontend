import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import {
    FETCH_GRAPH_REQUEST, FETCH_GRAPH_SUCCESS, FETCH_GRAPH_FAILURE, FETCH_COMPLETED_NODES_REQUEST, FETCH_COMPLETED_NODES_FAILURE, FETCH_COMPLETED_NODES_SUCCESS, UPDATE_GRAPH_FAILURE, UPDATE_GRAPH_SUCCESS, UPDATE_GRAPH_REQUEST,
  } from './graphTypes';
import { loadGraphElements } from '../../services/graph-service';
import { getUserProgressInfo } from '../../services/user-service';



function* fetchGraphData(action) {
   try {
      const data = yield call(loadGraphElements, action.payload.graphId);
      yield put({type: FETCH_GRAPH_SUCCESS, payload: {
        elements: [...data.graph.nodes, ...data.graph.edges],
        graphData: { name: data.graph.name, description: data.graph.description },
      }});
   } catch (e) {
      yield put({type: FETCH_GRAPH_FAILURE, message: e.message});
   }
}

function* fetchCompletedNodes(action) {
    try {
       const data = yield call(getUserProgressInfo, action.payload.userId, action.payload.graphId);
       yield put({type: FETCH_COMPLETED_NODES_SUCCESS,  payload: {
        completedNodes: [...data.completedNodes],
      }});
    } catch (e) {
       yield put({type: FETCH_COMPLETED_NODES_FAILURE, message: e.message});
    }
 }

function* mySaga() {
    yield takeEvery(FETCH_GRAPH_REQUEST, fetchGraphData);
    yield takeEvery(FETCH_COMPLETED_NODES_REQUEST, fetchCompletedNodes);
}

export default mySaga;