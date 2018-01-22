import _ from 'lodash';

export const FETCH_THREADS = 'FETCH_THREADS';

const subredditUrl = "https://www.reddit.com/r/songaweek/new.json?sort=new";

export function updateThreads(threads) {
    return {
        type: FETCH_THREADS,
        threads,
    }
}

// Note that the max limit from the reddit api is 100
export function fetchThreads(limit = 25) {
    return dispatch => {
        fetch(`${subredditUrl}&limit=${limit}`, {method: 'get', mode: 'cors'})
            .then(response => response.json())
            .then(data => _.map(data.data.children, c => c.data))
            .then(threads => _.filter(threads, isSubmissionThread))
            .then(submissionThreads => dispatch(updateThreads(submissionThreads)))
    }
}

export function fetchAllThreads() {
    return async dispatch => {
        let submissionThreads = [];
        let lastBatch;
        let page = 0;
        let after;

        do {
            lastBatch = await fetch(`${subredditUrl}&limit=100&count=${page * 100}&after=${after}`, {method: 'get', mode: 'cors'})
                .then(response => response.json())
                .then(data => {
                    after = data.data.after;
                    return _.map(data.data.children, c => c.data)
                })
                .then(threads => _.filter(threads, isSubmissionThread));
            submissionThreads = _.concat(submissionThreads, lastBatch);
            console.log(`Fetched a page of (max) 100 threads, of which ${lastBatch.length} were submission threads. `);
            page++;
        } while (lastBatch.length !== 0 && page < 50);

        console.log(`Total Submission Threads ever: ${submissionThreads.length}`);

        dispatch(updateThreads(submissionThreads));

        return submissionThreads;
    }
}

function isSubmissionThread(thread) {
    return thread.title.includes("Submissions ") && thread.title.includes(" Week");
}
