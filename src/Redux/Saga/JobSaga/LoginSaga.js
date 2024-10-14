import { call, put, takeLatest } from "redux-saga/effects";
import * as Types from "../../ActionTypes";
import { toast } from "react-toastify";

import {
  createFail,
  createSuc,
  getFail,
  getSuc,
} from "../../Action/LoginAction";
import { GetRegisterService, RegisterService } from "../../../Service/JobGetService";

// function* LoginSaga({ payload }) {
//   try {
//     const Api_Response = yield call(LoginService, payload); //payload is pass to FormService
//     console.log("Api_Response", Api_Response);
//     const Response = Api_Response.data; //datas from mockapi
//     console.log("API response", Response);
//     yield put({
//       type: Types.Login_Success,
//       payload: Response,
//     });
//   } catch (error) {
//     yield put({
//       type: Types.Login_Failure,
//       error: error,
//     });
//     toast.error(error.response.data.error.message);
//   }
// }

function* RegisterSaga({ payload }) {
  try {
    const res = yield call(RegisterService, payload);
    yield put(createSuc(res.data));
  } catch (err) {
    yield put(createFail(err));
  }
}

function* GetSaga({ payload }) {
  try {
    const res = yield call(GetRegisterService, payload);
    yield put(getSuc(res.data));
  } catch (err) {
    yield put(getFail(err));
  }
}

function* LoginWatcherSaga() {
  yield takeLatest(Types.CREATE_REQ, RegisterSaga);
  yield takeLatest(Types.GET_REQ, GetSaga);
}

export default LoginWatcherSaga;
