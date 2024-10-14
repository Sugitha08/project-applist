import * as type from "../ActionTypes";

export const LoginRequest = ({ userName, password }) => ({
  type: type.Login_Request,
  payload: { password, userName },
});
export const createReq = (data) => ({
  type: type.CREATE_REQ,
  payload: data,
});
export const createSuc = (data) => ({
  type: type.CREATE_SUC,
  payload: data,
});
export const createFail = (err) => ({
  type: type.CREATE_FAIL,
  payload: err,
});

export const getReq = () => ({
    type: type.GET_REQ,
  });
  export const getSuc = (data) => ({
    type: type.GET_SUC,
    payload: data,
  });
  export const getFail = (err) => ({
    type: type.GET_FAIL,
    payload: err,
  });