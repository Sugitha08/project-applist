import { call, put, takeLatest } from "redux-saga/effects";
import {
  JobList_Delete_Failure,
  JobList_Delete_Success,
  JobList_Get_Failure,
  JobList_Get_Request,
  JobList_Get_Success,
  JobList_post_Failure,
  JobList_post_Success,
} from "../../Action/JobListAction";
import {
  JobDeleteService,
  JobGetService,
  JobPostService,
} from "../../../Service/JobGetService";
import {
  DELETE_JOB_REQUEST,
  GET_JOB_REQUEST,
  POST_JOB_REQUEST,
} from "../../ActionTypes";

function* JobGetSaga() {
  try {
    const Api_response = yield call(JobGetService);
    yield put(JobList_Get_Success(Api_response.data));
  } catch (error) {
    yield put(JobList_Get_Failure(error));
  }
}
function* JobpostSaga({ payload }) {
  console.log(payload);

  try {
    const Api_response = yield call(JobPostService, payload);
    yield put(JobList_post_Success(Api_response.data));
  } catch (error) {
    yield put(JobList_post_Failure(error));
  }
}

function* JobdeleteSaga({ payload }) {
  console.log(payload);
  try {
    const Api_response = yield call(JobDeleteService, payload);
    yield put(JobList_Delete_Success(Api_response.data));
    yield put(JobList_Get_Request());
  } catch (error) {
    yield put(JobList_Delete_Failure(error));
  }
}

function* watchJobget() {
  yield takeLatest(GET_JOB_REQUEST, JobGetSaga);
  yield takeLatest(POST_JOB_REQUEST, JobpostSaga);
  yield takeLatest(DELETE_JOB_REQUEST, JobdeleteSaga);
}
export default watchJobget;
