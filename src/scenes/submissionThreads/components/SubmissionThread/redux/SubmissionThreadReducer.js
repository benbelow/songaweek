import { UPDATE_SUBMISSIONS } from "./SubmissionThreadActions";

const initialState = { threadSubmissions: [] };

const SubmissionThreadReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SUBMISSIONS :
      return {
        ...state,
        threadSubmissions: [...state.threadSubmissions, action.threadSubmissions]
      };
    default:
      return state;
  }
};

export default SubmissionThreadReducer;
