import _ from 'lodash';

import { getAllSubmissions } from '../../../integrations/firebase/submissionRepository';
import { aliasUserData } from '../services/userAliasing/userAliasing';

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
                submissions,
                submissionCount: submissions.length,
                themedSubmissionCount: themedSubmissions.length,
                unthemedSubmissionCount: submissions.length - themedSubmissions.length,
            };
        });

        const aliasedUsers = aliasUserData(userData);
        const filteredUsers = aliasedUsers.filter(ud => ud.username !== DELETED_USER_USERNAME);

        dispatch(updateUsers(filteredUsers));
    };
}
