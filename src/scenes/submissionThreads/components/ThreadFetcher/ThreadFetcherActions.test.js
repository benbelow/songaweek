import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { FETCH_THREADS, fetchThreads } from './ThreadFetcherActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const submissionThreadTitle = 'Submissions - Week 12';
const nonSubmissionThreadTitle = 'Not a submissions thread.';
const getRedditApiResponse = threadTitles => {
    return JSON.stringify({
        data: {
            children: threadTitles.map(tt => ({ data: { title: tt } }))
        }
    });
};

describe('thread fetcher actions', () => {
    let store;

    beforeEach(() => {
        store = mockStore({});
    });

    afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();
    });

    describe('fetch threads', () => {
        it('creates FETCH_THREADS action', async () => {
            fetchMock.getOnce('*', getRedditApiResponse([submissionThreadTitle]));

            await store.dispatch(fetchThreads());

            expect(store.getActions().map(a => a.type)).toContain(FETCH_THREADS);
        });

        it('only fetches submission threads', async () => {
            fetchMock.getOnce('*', getRedditApiResponse([submissionThreadTitle, nonSubmissionThreadTitle]));

            await store.dispatch(fetchThreads());

            expect(store.getActions().map(a => a.threads)[0].length).toBe(1);
        });

        it('only fetches specified number of results', async () => {
            fetchMock.getOnce('*', getRedditApiResponse([submissionThreadTitle, nonSubmissionThreadTitle]));
            const resultLimit = 32;

            await store.dispatch(fetchThreads(resultLimit));

            expect(fetchMock.lastUrl()).toContain(`&limit=${resultLimit}`)
        });
    });
});
