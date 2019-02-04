import _ from 'lodash';

import Aliases from '../../content/Aliases';

export const aliasUserData = (userData) => {
    return userData.map(user => {
        if (Object.values(Aliases).includes(user.username)) {
            return null;
        }
        const oldName = Aliases[user.username];
        if (oldName) {
            const oldData = userData.find(u => u.username === oldName);
            const allSubmissions = [ ...user.submissions, ...oldData.submissions];
            const themedSubmissions = _.filter(allSubmissions, s => s.themed);
            console.log(user.username, allSubmissions.length);
            return {
                ...user,
                submissions: allSubmissions,
                submissionCount: allSubmissions.length,
                themedSubmissionCount: themedSubmissions.length,
                unthemedSubmissionCount: allSubmissions.length - themedSubmissions.length,
            }
        }
        return user;
    }).filter(u => !!u);
};
