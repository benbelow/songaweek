import {combineReducers} from 'redux';
import threads from '../scenes/submissionThreads/components/ThreadFetcher/redux/ThreadFetcherReducer';
import submissionThread from '../scenes/submissionThreads/components/SubmissionThread/redux/SubmissionThreadReducer';
import filters from '../components/Filters/FilterReducer';
import header from '../components/AppHeader/HeaderReducer';
import users from '../scenes/users/components/redux/UsersReducer';

export default combineReducers({
    threads,
    submissionThread,
    filters,
    header,
    users
});
