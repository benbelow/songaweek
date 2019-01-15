import moment from 'moment/moment';

export const submissionsThisYear = user => {
    return user.submissions.filter(s => moment.unix(s.threadTimeCreated).year() === moment().year());
};
