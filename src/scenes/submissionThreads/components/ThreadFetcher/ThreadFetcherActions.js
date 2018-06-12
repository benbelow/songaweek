import _ from 'lodash';

export const FETCH_THREADS = 'FETCH_THREADS';

const subredditUrl = "https://www.reddit.com/r/songaweek/new.json?sort=new";

const updateThreadsAction = (threads) => ({
    type: FETCH_THREADS,
    threads,
});

// Note that the max limit from the reddit api is 100
export function fetchThreads(limit = 25) {
    return async dispatch => {
        const response = await fetch(`${subredditUrl}&limit=${limit}`, {method: 'get', mode: 'cors'});
        const json = await response.json();
        const threads = json.data.children.map(c => c.data).filter(isSubmissionThread);
        dispatch(updateThreadsAction(threads));
    }
}

export function fetchAllThreads() {
    return async dispatch => {
        let submissionThreads = [];
        let lastBatch;
        let page = 0;
        let after = '';

        do {
            lastBatch = await fetch(`${subredditUrl}&limit=100&count=${page * 100}&after=${after}`, {method: 'get', mode: 'cors'})
                .then(response => response.json())
                // eslint-disable-next-line
                .then(data => {
                    after = data.data.after;
                    return _.map(data.data.children, c => c.data)
                })
                .then(threads => _.filter(threads, isSubmissionThread));
            submissionThreads = _.concat(submissionThreads, lastBatch);
            console.log(`Fetched a page of (max) 100 threads, of which ${lastBatch.length} were submission threads. `);
            page++;
        } while (lastBatch.length !== 0 && page < 50 && after !== null);

        console.log(`Total Submission Threads ever: ${submissionThreads.length}`);

        dispatch(updateThreadsAction(submissionThreads));

        return submissionThreads;
    }
}

function isSubmissionThread(thread) {
    return thread.title.includes("Submissions ") && thread.title.includes(" Week");
}
