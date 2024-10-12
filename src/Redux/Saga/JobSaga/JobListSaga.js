import { call, put, takeLatest } from "redux-saga/effects";
import {
  JobList_Get_Failure,
  JobList_Get_Request,
  JobList_Get_Success,
} from "../../Action/JobListAction";
import { JobGetService } from "../../../Service/JobGetService";
import { GET_JOB_REQUEST } from "../../ActionTypes";

function* JobGetSaga() {
  try {
    const Api_response = yield call(JobGetService);
    yield put(JobList_Get_Success(Api_response.data));
  } catch (error) {
    yield put(JobList_Get_Failure(error));
  }
}

function* watchJobget() {
  yield takeLatest(GET_JOB_REQUEST, JobGetSaga);
}
export default watchJobget;
