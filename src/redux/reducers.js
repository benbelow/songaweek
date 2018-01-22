import {combineReducers} from 'redux';
import threads from '../components/ThreadFetcher/ThreadFetcherReducer';
import submissionThread from '../components/SubmissionThread/SubmissionThreadReducer';
import filters from '../components/Filters/FilterReducer';
import header from '../components/AppHeader/HeaderReducer';
import users from '../components/Users/UsersReducer';

export default combineReducers({
    threads,
    submissionThread,
    filters,
    header,
    users
});
