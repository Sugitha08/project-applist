import { GET_JOB_FAILURE, GET_JOB_REQUEST, GET_JOB_SUCCESS } from "../../ActionTypes";

const initialValues = {
  loading: false,
  JobData: [],
  error: null,
};

const JobReducer = (state = initialValues, action) => {
  
  switch (action.type) {
    case GET_JOB_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_JOB_SUCCESS:
      
      return {
        ...state,
        JobData: action.payload,
        loading: false,
      };
    case GET_JOB_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
export default JobReducer;
