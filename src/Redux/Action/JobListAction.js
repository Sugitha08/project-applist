import * as Types from "../ActionTypes";

export const JobList_Get_Request = () => {
  return {
    type: Types.GET_JOB_REQUEST,
  };
};

export const JobList_Get_Success = (data) => {
  return {
    type: Types.GET_JOB_SUCCESS,
    payload: data,
  };
};
export const JobList_Get_Failure = (data) => {
  return {
    type: Types.GET_JOB_FAILURE,
    payload: data,
  };
};

export const JobList_post_Request = (data) => {
  return {
    type: Types.POST_JOB_REQUEST,
    payload: data,
  };
};

export const JobList_post_Success = (data) => {
  return {
    type: Types.POST_JOB_SUCCESS,
    payload: data,
  };
};
export const JobList_post_Failure = (data) => {
  console.log(data);

  return {
    type: Types.POST_JOB_FAILURE,
    payload: data,
  };
};

export const JobList_Delete_Request = (data) => {
  return {
    type: Types.DELETE_JOB_REQUEST,
    payload: data,
  };
};

export const JobList_Delete_Success = (data) => {
  return {
    type: Types.DELETE_JOB_SUCCESS,
    payload: data,
  };
};
export const JobList_Delete_Failure = (data) => {
  return {
    type: Types.DELETE_JOB_FAILURE,
    payload: data,
  };
};
