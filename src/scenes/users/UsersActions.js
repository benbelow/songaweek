import _ from 'lodash';
import { getAllSubmissions } from '../../integrations/firebase/submissionRepository';

export const UPDATE_USERS_LIST = 'UPDATE_USERS_LIST';

const DELETED_USER_USERNAME = '[deleted]';

export function updateUsers(users) {
    return {
        type: UPDATE_USERS_LIST,
        users,
    };
}

export function fetchUsers() {
    return async dispatch => {
        const s = await getAllSubmissions();
        const userData = _.map(_.groupBy(s.val(), 'author'), (submissions, author) => {
            const themedSubmissions = _.filter(submissions, s => s.themed);
            return {
                username: author,
                submissionCount: submissions.length,
                themedSubmissionCount: themedSubmissions.length,
                unthemedSubmissionCount: submissions.length - themedSubmissions.length,
            };
        });
        dispatch(updateUsers(userData.filter(ud => ud.username !== DELETED_USER_USERNAME)));
    };
}
