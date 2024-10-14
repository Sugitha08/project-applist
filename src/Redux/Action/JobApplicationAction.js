import { type } from "@testing-library/user-event/dist/type";
import * as Types from "../ActionTypes";

export const ApplicationPost_Request = (values) => {
  return {
    type: Types.POST_APPLICATION_REQUEST,
    payload: values,
  };
};

export const ApplicationPost_Success = (data) => {
  console.log("data",data);

  return {
    type: Types.POST_APPLICATION_SUCCESS,
    payload: data,
  };
};
export const ApplicationPost_Failure = (data) => {
  
  return {
    type: Types.POST_APPLICATION_FAILURE,
    payload: data,
  };
};

export const AppDetailsByCI_Get_Request = () => {
  return {
    type: Types.GET_APPDETAILBYCI_REQUEST,
  };
};

export const Applicationget_Success = (data) => {
  return {
    type: Types.GET_APPDETAILBYCI_SUCCESS,
    payload: data,
  };
};
export const Applicationget_Failure = (data) => {
  return {
    type: Types.GET_APPDETAILBYCI_FAILURE,
    payload: data,
  };
};