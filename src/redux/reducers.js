import { combineReducers } from 'redux';
import threads from '../components/ThreadFetcher/ThreadFetcherReducer';
import submissionThread from '../components/SubmissionThread/SubmissionThreadReducer';
import filters from '../components/Filters/FilterReducer';
import header from '../components/AppHeader/HeaderReducer';

export default combineReducers({
  threads,
  submissionThread,
  filters,
  header
});
