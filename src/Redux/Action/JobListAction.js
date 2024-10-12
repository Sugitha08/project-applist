import {
  GET_JOB_FAILURE,
  GET_JOB_REQUEST,
  GET_JOB_SUCCESS,
} from "../ActionTypes";

export const JobList_Get_Request = () => {  
  return {
    type: GET_JOB_REQUEST,
  };
};

export const JobList_Get_Success = (data) => {  
  return {
    type: GET_JOB_SUCCESS,
    payload: data,
  };
};
export const JobList_Get_Failure = (data) => {
  return {
    type: GET_JOB_FAILURE,
    payload: data,
  };
};
