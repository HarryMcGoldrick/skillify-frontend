import { call, put, takeLatest } from 'redux-saga/effects';

import { getUserInfo } from '../../services/user-service';
import { FETCH_USER_DATA_REQUEST, FETCH_USER_DATA_FAILED, FETCH_USER_DATA_SUCCESS } from './userTypes';

function* fetchUserData(action) {
  try {
    const data = yield call(getUserInfo, action.payload);
    yield put({
      type: FETCH_USER_DATA_SUCCESS,
      payload: {
        graphs_created: [...data.graphs_created],
        graphs_progressing: [...data.graphs_progressing],
        likedContent: [...data.likedContent],
        username: data.username,
        achievements: data.achievements,
        badges: data.badges,
        completedNodeCount: data.completedNodeCount,
        likedGraphs: data.likedGraphs,
        completedGraphs: data.completedGraphs,
      },
    });
  } catch (e) {
    yield put({ type: FETCH_USER_DATA_FAILED, message: e.message });
  }
}

function* mySaga() {
  yield takeLatest(FETCH_USER_DATA_REQUEST, fetchUserData);
}

export default mySaga;
