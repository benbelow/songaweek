import { UPDATE_THREADS } from './ThreadFetcherActions';

const initialState = { submissionThreads: [] };

const ThreadFetcherReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_THREADS :
      return { submissionThreads: [...action.threads, ...state.submissionThreads] };
    default:
      return state;
  }
};

export default ThreadFetcherReducer;
