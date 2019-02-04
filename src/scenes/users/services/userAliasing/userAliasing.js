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
            return {
                ...user,
                submissions: allSubmissions,
            }
        }
        return user;
    }).filter(u => !!u);
};
