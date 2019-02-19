import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { fetchAllThreads, fetchThreads, UPDATE_THREADS } from './ThreadFetcherActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const submissionThreadTitle = 'Submissions - Week 12';
const nonSubmissionThreadTitle = 'Not a submissions thread.';

class RedditApiResponseBuilder {
  response = {
    data: {
      children: [],
      after: null,
    }
  };

  withThreads(threadTitles) {
    this.response.data.children = threadTitles.map(tt => ({ data: { title: tt } }));
    return this;
  }

  withAfterFlag(after) {
    this.response.data.after = after;
    return this;
  }

  build() {
    return JSON.stringify(this.response);
  }
}

describe('thread fetcher actions', () => {
  let store;
  let responseBuilder;

  beforeEach(() => {
    store = mockStore({});
    responseBuilder = new RedditApiResponseBuilder();
  });

  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  describe('fetchThreads', () => {
    it('dispatches UPDATE_THREADS action', async () => {
      fetchMock.getOnce('*', responseBuilder.withThreads([submissionThreadTitle]).build());

      await store.dispatch(fetchThreads());

      expect(store.getActions().map(a => a.type)).toContain(UPDATE_THREADS);
    });

    it('only fetches submission threads', async () => {
      fetchMock.getOnce('*', responseBuilder.withThreads([submissionThreadTitle, nonSubmissionThreadTitle]).build());

      await store.dispatch(fetchThreads());

      expect(store.getActions().map(a => a.threads)[0].length).toBe(1);
    });

    it('only fetches specified number of results', async () => {
      fetchMock.getOnce('*', responseBuilder.build());
      const resultLimit = 32;

      await store.dispatch(fetchThreads(resultLimit));

      expect(fetchMock.lastUrl()).toContain(`&limit=${resultLimit}`);
    });
  });

  describe('fetchAllThreads', () => {
    it('dispatches UPDATE_THREADS action', async () => {
      fetchMock.getOnce('*', responseBuilder.withThreads([submissionThreadTitle]).build());

      await store.dispatch(fetchAllThreads());

      expect(store.getActions().map(a => a.type)).toContain(UPDATE_THREADS);
    });

    it('fetches multiple pages of results', async () => {
      const page1AfterFlag = 'page-1';
      const page2AfterFlag = 'page-2';

      fetchMock.getOnce(
        `end:&after=${page2AfterFlag}`,
        responseBuilder.withThreads([submissionThreadTitle]).build()
      );
      fetchMock.getOnce(
        `end:&after=${page1AfterFlag}`,
        responseBuilder.withThreads([submissionThreadTitle]).withAfterFlag(page2AfterFlag).build()
      );
      fetchMock.getOnce(
        'end:after=',
        responseBuilder.withThreads([submissionThreadTitle]).withAfterFlag(page1AfterFlag).build()
      );

      await store.dispatch(fetchAllThreads());

      expect(fetchMock.calls().length).toBe(3);
    });

    it('stops fetching results when no results found', async () => {
      fetchMock.getOnce('*', responseBuilder.withAfterFlag('something').build());

      await store.dispatch(fetchAllThreads());

      expect(fetchMock.calls().length).toBe(1);
    });

    it('stops fetching results when no after flag set in response', async () => {
      fetchMock.getOnce('*', responseBuilder.withThreads([submissionThreadTitle]).build());

      await store.dispatch(fetchAllThreads());

      expect(fetchMock.calls().length).toBe(1);
    });

    it('returns threads from all pages of responses', async () => {
      const afterFlag = 'page-1';

      fetchMock.getOnce(
        `end:&after=${afterFlag}`,
        responseBuilder.withThreads([submissionThreadTitle]).build()
      );
      fetchMock.getOnce(
        'end:after=',
        responseBuilder.withThreads([submissionThreadTitle]).withAfterFlag(afterFlag).build()
      );

      const results = await store.dispatch(fetchAllThreads());

      expect(results.length).toBe(2);
    });
  });
});
