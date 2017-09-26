import _ from 'lodash';

export const FETCH_THREADS = 'FETCH_THREADS';

const subredditUrl = "https://www.reddit.com/r/songaweek/new.json?sort=new";

export function updateThreads(threads) {
  return {
    type: FETCH_THREADS,
    threads,
  }
}

export function fetchThreads() {
  return dispatch => {
    fetch(subredditUrl, {method: 'get', mode: 'cors'})
      .then(response => response.json())
      .then(data => _.map(data.data.children, c => c.data))
      .then(threads => _.filter(threads, isSubmissionThread))
      .then(submissionThreads => dispatch(updateThreads(submissionThreads)))
  }
}

function isSubmissionThread(thread) {
  return thread.title.includes("Submissions") && thread.title.includes("Week");
}