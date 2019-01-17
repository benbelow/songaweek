import * as threadRepository from '../../../../../integrations/firebase/threadRepository';

export const UPDATE_THREADS = 'UPDATE_THREADS';

const subredditUrl = "https://www.reddit.com/r/songaweek/new.json?sort=new";

const updateThreadsAction = (threads) => ({
    type: UPDATE_THREADS,
    threads,
});

// Note that the max limit from the reddit api is 100
export function fetchThreads(limit = 25) {
    return async dispatch => {
        const response = await fetch(`${subredditUrl}&limit=${limit}`, { method: 'get', mode: 'cors' });
        const json = await response.json();
        const threads = json.data.children.map(c => c.data).filter(isSubmissionThread);
        dispatch(updateThreadsAction(threads));
    };
}

export function fetchThreadsFromDatabase() {
    return async dispatch => {
        const threads = await threadRepository.getAllThreads();
        console.log("fetched from DB");
        dispatch(updateThreadsAction(threads.sort((a, b) => b.created_utc - a.created_utc)));
    }
}

export function fetchAllThreads(sinceThreadId = undefined) {
    return async dispatch => {
        let submissionThreads = [];
        let lastResultsBatch = [];
        let page = 0;
        let after = '';

        let before = sinceThreadId;
        let beforeParam = () => before ? `&before=${before}` : '';

        do {
            const response = await fetch(`${subredditUrl}&limit=100&count=${page * 100}&after=${after}${beforeParam()}`, {
                method: 'get',
                mode: 'cors'
            });
            const json = await response.json();

            after = json.data.after;
            lastResultsBatch = json.data.children.map(c => c.data).filter(isSubmissionThread);
            submissionThreads = [...submissionThreads, ...lastResultsBatch];
            page++;

            console.log(`Fetched a page of ${json.data.children.length} thread(s), of which ${lastResultsBatch.length} were submission threads. `);
        } while (
            lastResultsBatch.length !== 0 &&
            after !== null &&
            page < 50
            );

        console.log(`Total Submission Threads fetched: ${submissionThreads.length}`);

        dispatch(updateThreadsAction(submissionThreads));

        return submissionThreads;
    };
}

function isSubmissionThread(thread) {
    return thread.title.includes("Submissions ") && thread.title.includes(" Week");
}
