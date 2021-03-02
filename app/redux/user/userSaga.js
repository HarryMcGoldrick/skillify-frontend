import { call, put, takeEvery } from 'redux-saga/effects'

import { getUserInfo } from '../../services/user-service';
import { FETCH_USER_DATA_REQUEST, FETCH_USER_DATA_FAILED, FETCH_USER_DATA_SUCCESS } from './userTypes';



function* fetchUserData(action) {
   try {
      const data = yield call(getUserInfo, action.payload);
      yield put({type: FETCH_USER_DATA_SUCCESS, payload: {
        graphsContent: [...data.graphs_created],
        likedContent: [...data.likedContent],
        username: data.username,
      }});
   } catch (e) {
      yield put({type: FETCH_USER_DATA_FAILED, message: e.message});
   }
}

function* mySaga() {
   yield takeEvery(FETCH_USER_DATA_REQUEST, fetchUserData);
}

export default mySaga;