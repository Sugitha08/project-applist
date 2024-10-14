import { combineReducers } from "redux";
import JobReducer from "./jobReducer/JobReducer";
import ApplicationReducer from "./jobReducer/JobApplicationReducer";
import LoginReducer from "./jobReducer/LoginReducer";

const RootReducer = combineReducers({
    jobData : JobReducer,
    Application : ApplicationReducer,
    Register : LoginReducer
})

export default RootReducer;