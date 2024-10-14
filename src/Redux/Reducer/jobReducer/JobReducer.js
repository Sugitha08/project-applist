import * as Types from "../../ActionTypes";

const initialValues = {
  loading: false,
  JobData: [],
  error: null,
};

const JobReducer = (state = initialValues, action) => {
  switch (action.type) {
    case Types.GET_JOB_REQUEST:
    case Types.POST_JOB_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.GET_JOB_SUCCESS:
      return {
        ...state,
        JobData: action.payload,
        loading: false,
      };
    case Types.POST_JOB_SUCCESS:
      return {
        ...state,
        JobData: [...state.JobData,action.payload],
        loading: false,
      };
    case Types.GET_JOB_FAILURE:
    case Types.POST_JOB_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
export default JobReducer;
