import moment from 'moment/moment';

export const submissionsThisYear = user => {
  return submissionsInYear(user, moment().year());
};

export const submissionsInYear = (user, year) => {
  return user.submissions.filter(s => moment.unix(s.threadTimeCreated).year() === year);
};

export const submissionYears = user => {
  return [...new Set(user.submissions.map(s => moment.unix(s.threadTimeCreated).year()))];
};
