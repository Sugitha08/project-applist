import * as Types from "../../ActionTypes";

const initialValues = {
  loading: false,
  jobDetaildata: [],
  error: null,
};

const ApplicationReducer = (state = initialValues, action) => {
  switch (action.type) {
    case Types.GET_APPDETAILBYCI_REQUEST:
    case Types.POST_APPLICATION_REQUEST:
    case Types.DELETE_JOB_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.POST_APPLICATION_SUCCESS:
      return {
        ...state,
        jobDetaildata: [...state.jobDetaildata, action.payload],
        loading: false,
      };
    case Types.GET_APPDETAILBYCI_SUCCESS:
      return {
        ...state,
        jobDetaildata: action.payload,
        loading: false,
      };
    case Types.DELETE_JOB_SUCCESS:
      return {
        ...state,
        jobDetaildata: state.jobDetaildata.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    case Types.GET_APPDETAILBYCI_FAILURE:
    case Types.POST_APPLICATION_FAILURE:
    case Types.DELETE_JOB_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
export default ApplicationReducer;
