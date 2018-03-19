import _ from 'lodash';

import {database} from "../../database";

export const UPDATE_USERS_LIST = 'UPDATE_USERS_LIST';

const DELETED_USER_USERNAME = '[deleted]';

export function updateUsers(users) {
    return {
        type: UPDATE_USERS_LIST,
        users,
    }
}

export function fetchUsers() {
    return dispatch => {
        const subQuery = database.ref('/submissions').orderByChild('author');
        subQuery.once('value').then(s => {
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
        });
    }
}
