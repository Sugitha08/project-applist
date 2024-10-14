import { all } from "redux-saga/effects";
import watchJobget from "./JobSaga/JobListSaga";
import watchJobapplication from "./JobSaga/JobApplicationSaga";
import LoginWatcherSaga from "./JobSaga/LoginSaga";

function* rootsaga(){
    yield all([
        watchJobget(),
        watchJobapplication(),
        LoginWatcherSaga()
    ])
}

export default rootsaga