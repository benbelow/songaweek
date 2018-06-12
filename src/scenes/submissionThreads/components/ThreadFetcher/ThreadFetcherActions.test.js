import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock';
import { FETCH_THREADS, fetchThreads } from './ThreadFetcherActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('thread fetcher actions', () => {
    afterEach(() => {
        fetchMock.reset();
        fetchMock.restore()
    });

    describe('update threads', () => {
        it('creates FETCH_THREADS action', () => {
            fetchMock.getOnce('*', { data: { children: [{ data: { title: 'Submissions - Week 12' } }] } });

            const store = mockStore({});

            return store.dispatch(fetchThreads())
                .then(() => {
                    expect(store.getActions().map(a => a.type)).toContain(FETCH_THREADS);
                })
        });
    })
});
