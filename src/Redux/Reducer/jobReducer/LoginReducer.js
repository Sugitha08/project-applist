import * as Types from "../../ActionTypes";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

function LoginReducer(state = initialState, action) {
  switch (action.type) {
    case Types.CREATE_REQ:
    case Types.GET_REQ:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case Types.GET_SUC:
      return {
        ...state,
        data: action.payload,
      };
    case Types.CREATE_FAIL:
    case Types.GET_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case Types.CREATE_SUC:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    default:
      return state;
  }
}

export default LoginReducer;
