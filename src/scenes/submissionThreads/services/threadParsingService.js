import _ from 'lodash';
import moment from 'moment';

const themeRegex = /:(.*?)\)/;
const weekRegex = /(—|-)(.*?)\(/;
const descriptionRegex = /\*\*\n\n([\s\S]*?)##/;

export function theme(thread) {
  const theme = _.get(themeRegex.exec(thread.title), 1);
  return theme ? theme.trim() : '[theme not found]';
}

export function week(thread) {
  const threadYear = moment.unix(thread.created).year();
  const isThisYear = threadYear === moment().year();

  const weekFromTitle = _.get(weekRegex.exec(thread.title), 2);
  const week = isThisYear ? weekFromTitle : `${weekFromTitle} (${threadYear})`;
  return week ? week.trim() : '[week not found]';
}

export function description(thread) {
  const description = _.get(descriptionRegex.exec(thread.selftext), 1);
  return description ? description.trim() : '[description not found]';
}
