import { call, put, takeLatest } from "redux-saga/effects";
import {} from "../../Action/JobListAction";
import {
  GET_APPDETAILBYCI_REQUEST,
  POST_APPLICATION_REQUEST,
} from "../../ActionTypes";
import {
  AppDetailsService,
  ApplicationPostService,
} from "../../../Service/JobGetService";
import {
  Applicationget_Failure,
  Applicationget_Success,
  ApplicationPost_Failure,
  ApplicationPost_Success,
} from "../../Action/JobApplicationAction";

function* ApplicationSaga({ payload }) {
  try {
    const Api_response = yield call(ApplicationPostService, payload);
    console.log(Api_response,"saga");
    
    yield put(ApplicationPost_Success(Api_response.data));
  } catch (error) {
    yield put(ApplicationPost_Failure(error));
  }
}

function* AppDetailsSaga({ payload }) {
  try {
    const Api_response = yield call(AppDetailsService, payload);
    yield put(Applicationget_Success(Api_response.data));
  } catch (error) {
    yield put(Applicationget_Failure(error));
  }
}

function* watchJobapplication() {
  yield takeLatest(POST_APPLICATION_REQUEST, ApplicationSaga);
  yield takeLatest(GET_APPDETAILBYCI_REQUEST, AppDetailsSaga);
}
export default watchJobapplication;
