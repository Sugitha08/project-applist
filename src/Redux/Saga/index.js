import { all } from "redux-saga/effects";
import watchJobget from "./JobSaga/JobListSaga";

function* rootsaga(){
    yield all([
        watchJobget()
    ])
}

export default rootsaga