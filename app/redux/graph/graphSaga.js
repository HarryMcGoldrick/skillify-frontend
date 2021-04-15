import {
  call, put, takeEvery, takeLatest,
} from 'redux-saga/effects';
import {
  FETCH_GRAPH_REQUEST, FETCH_GRAPH_SUCCESS, FETCH_GRAPH_FAILURE, FETCH_COMPLETED_NODES_REQUEST, FETCH_COMPLETED_NODES_FAILURE, FETCH_COMPLETED_NODES_SUCCESS, UPDATE_GRAPH_FAILURE, UPDATE_GRAPH_SUCCESS, UPDATE_GRAPH_REQUEST, FETCH_STYLE_SHEET_SUCCESS, FETCH_STYLE_SHEET_FAILURE, FETCH_STYLE_SHEET_REQUEST,
} from './graphTypes';
import { fetchGraphStyle, loadGraphElements } from '../../services/graph-service';
import { getUserProgressInfo } from '../../services/user-service';
import { updateProgressMode, updateStyleSheet } from './graphActions';

function* fetchGraphData(action) {
  try {
    const data = yield call(loadGraphElements, action.payload.graphId);
    yield put({
      type: FETCH_GRAPH_SUCCESS,
      payload: {
        elements: [...data.graph.nodes, ...data.graph.edges],
        graphData: { name: data.graph.name, description: data.graph.description, private: data.graph.private },
      },
    });
  } catch (e) {
    yield put({ type: FETCH_GRAPH_FAILURE, message: e.message });
  }
}

function* fetchStyleSheet(action) {
  try {
    const data = yield call(fetchGraphStyle, action.payload.graphId);
    yield put({
      type: FETCH_STYLE_SHEET_SUCCESS,
      payload: {
        styleSheet: data.styleSheet,
      },
    });
    if (data.styleSheet.length > 0) {
      yield put(updateStyleSheet(data.styleSheet));
    }
  } catch (e) {
    yield put({ type: FETCH_STYLE_SHEET_FAILURE, message: e.message });
  }
}

function* fetchCompletedNodes(action) {
  try {
    const data = yield call(getUserProgressInfo, action.payload.userId, action.payload.graphId);
    if (data.completedNodes.length > 0) {
      yield put({
        type: FETCH_COMPLETED_NODES_SUCCESS,
        payload: {
          completedNodes: [...data.completedNodes],
        },
      });
      yield put(updateProgressMode(true));
    } else {
      yield put({ type: FETCH_COMPLETED_NODES_FAILURE, message: 'No nodes returned' });
      yield put(updateProgressMode(false));
    }
  } catch (e) {
    yield put({ type: FETCH_COMPLETED_NODES_FAILURE, message: e.message });
    yield put(updateProgressMode(false));
  }
}

function* mySaga() {
  yield takeEvery(FETCH_GRAPH_REQUEST, fetchGraphData);
  yield takeEvery(FETCH_COMPLETED_NODES_REQUEST, fetchCompletedNodes);
  yield takeEvery(FETCH_STYLE_SHEET_REQUEST, fetchStyleSheet);
}

export default mySaga;
