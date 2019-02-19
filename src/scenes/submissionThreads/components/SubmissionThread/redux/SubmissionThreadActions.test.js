import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { fetchSubmissions, UPDATE_SUBMISSIONS } from './SubmissionThreadActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

class CommentBuilder {
  comment = {
    kind: 't1',
    data: {
      body: '',
      author: '',
      parent_id: '',
      name: '',
      subreddit_name_prefixed: '',
    }
  };

  withBody(body) {
    this.comment.data.body = body;
    return this;
  }

  withAuthor(author) {
    this.comment.data.author = author;
    return this;
  }

  withParentId(parentId) {
    this.comment.data.parent_id = parentId;
    return this;
  }

  withName(name) {
    this.comment.data.name = name;
    return this;
  }

  withSubredditNamePrefixed(subredditNamePrefixed) {
    this.comment.data.subreddit_name_prefixed = subredditNamePrefixed;
    return this;
  }

  build() {
    return this.comment;
  }
}

class RedditApiResponseBuilder {
  thread = { data: {} };

  comments = {
    data: {
      children: [],
    }
  };

  withChild(child) {
    this.comments.data.children = [...this.comments.data.children, child];
    return this;
  }

  build() {
    return JSON.stringify([this.thread, this.comments]);
  }
}

describe('submission thread actions', () => {
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

  describe('fetchSubmissions', () => {
    it('dispatches UPDATE_SUBMISSIONS action', async () => {
      fetchMock.getOnce('*', responseBuilder.build());

      await store.dispatch(fetchSubmissions('id', 'url'));

      expect(store.getActions().map(a => a.type)).toContain(UPDATE_SUBMISSIONS);
    });

    it('extracts comment data from response', async () => {
      const body = 'https://www.soundcloud.com/song';
      const author = 'author';
      const threadId = 'thread-id';
      const commentId = 'comment-id';
      const subredditName = 'subredditName';

      const comment = new CommentBuilder().withBody(body).withAuthor(author).withParentId(threadId).withName(commentId).withSubredditNamePrefixed(subredditName).build();
      const thread = responseBuilder.withChild(comment).build();
      fetchMock.getOnce('*', thread);

      await store.dispatch(fetchSubmissions('id', 'url'));

      const dispatchedComments = store.getActions()[0].threadSubmissions.submissions;
      const expectedCommentObject = {
        comment: body,
        author,
        threadId,
        commentId,
        subredditNamePrefixed: subredditName
      };
      expect(dispatchedComments[0]).toEqual(expectedCommentObject);
    });

    it('only dispatches data of type comment', async () => {
      const comment = new CommentBuilder().withBody('https://www.soundcloud.com/song').build();
      const nonCommentChild = { kind: 'not-t1' };
      const thread = responseBuilder.withChild(comment).withChild(nonCommentChild).build();
      fetchMock.getOnce('*', thread);

      await store.dispatch(fetchSubmissions('id', 'url'));

      const dispatchedComments = store.getActions()[0].threadSubmissions.submissions;
      expect(dispatchedComments.length).toBe(1);
    });

    // TODO: Mock out urlParsingService to make this test more independent
    it('only dispatches comments with submission urls', async () => {
      const comment = new CommentBuilder().withBody('https://www.soundcloud.com/song').build();
      const nonSubmissionComment = new CommentBuilder().withBody('not a link to a song').build();
      const thread = responseBuilder.withChild(comment).withChild(nonSubmissionComment).withChild(nonSubmissionComment).build();
      fetchMock.getOnce('*', thread);

      await store.dispatch(fetchSubmissions('id', 'url'));

      const dispatchedComments = store.getActions()[0].threadSubmissions.submissions;
      expect(dispatchedComments.length).toBe(1);
    });

    it('dispatches thread id', async () => {
      const threadId = 'thread-id';
      fetchMock.getOnce('*', responseBuilder.build());

      await store.dispatch(fetchSubmissions(threadId, 'url'));

      const dispatchedId = store.getActions()[0].threadSubmissions.threadId;
      expect(dispatchedId).toEqual(threadId);
    });
  });
});
