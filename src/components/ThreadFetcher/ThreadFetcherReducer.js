import { FETCH_THREADS } from './ThreadFetcherActions';

const initialState = { submissionThreads: [] };

const ThreadFetcherReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_THREADS :
      return { submissionThreads: action.threads };
    default:
      return state;
  }
};

export default ThreadFetcherReducer;
