import _ from 'lodash';

import {database} from "../../database";

export const UPDATE_USERS_LIST = 'UPDATE_USERS_LIST';

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
                return {
                    username: author,
                    submissionCount: submissions.length,
                    themedSubmissionCount: _.filter(submissions, s => s.themed).length,
                };
            });
            dispatch(updateUsers(userData));
        });
    }
}
