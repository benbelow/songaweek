import _ from 'lodash';
import {isValidSubmissionUrl} from "../../helpers/UrlValidator";
import {extractUrls} from "../../helpers/UrlParser";

export const UPDATE_SUBMISSIONS = 'UPDATE_SUBMISSIONS';

const containsValidSubmissionUrl = comment => {
  return _.filter(extractUrls(comment), u => isValidSubmissionUrl(u)).length > 0;
};

export function updateSubmissions(threadSubmissions) {
  return {
    type: UPDATE_SUBMISSIONS,
    threadSubmissions,
  }
}

export function fetchSubmissions(threadId, url) {
  return dispatch => {
    fetch(url + ".json?", { method: 'get', mode: 'cors' })
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        return _.map(data[1].data.children, i => {
          return {
            comment: i.data.body,
            author: i.data.author,
          }
        });
      })
      .then(results => _.filter(results, r => containsValidSubmissionUrl(r.comment)))
      .then(submissions => dispatch(updateSubmissions({threadId: threadId, submissions: submissions})))
  }
}