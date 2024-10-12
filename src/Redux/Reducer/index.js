import { combineReducers } from "redux";
import JobReducer from "./jobReducer/JobReducer";

const RootReducer = combineReducers({
    jobData : JobReducer
})

export default RootReducer;