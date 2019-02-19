import { shallow } from 'enzyme';
import React from 'react';
import { SubmissionThread } from './SubmissionThread';

const getSubmissionThread = props => {
  return shallow(
    <SubmissionThread
      thread={{}}
      threadSubmissions={[]}
      isPrivateFilter={false}
      isThemedFilter={false}
      {...props}
    />
  );
};

// TODO: Remove MUI so this selector can match on 'Submission'
const getSubmissionComponents = wrapper => wrapper.find('MuiComponent');

describe('SubmissionThread', () => {
  it('renders a submission card per submission', () => {
    const threadId = 'thread-id';
    const thread = { id: threadId };
    const submissions = [
      { author: 'me', comment: 'comment', commentId: 'cId', threadId: 'tId' },
      { author: 'me', comment: 'comment2', commentId: 'cId2', threadId: 'tId' },
    ];
    const threadSubmissions = [{ threadId: threadId, submissions }];
    const wrapper = getSubmissionThread({ thread, threadSubmissions });
    expect(getSubmissionComponents(wrapper).length).toBe(submissions.length);
  });

  describe('submission url', () => {
    const threadId = 'thread-id';
    const thread = { id: threadId };

    const getSubmissionUrlForSubmission = submission => {
      const threadSubmissions = [{
        threadId: threadId,
        submissions: [submission],
      }];
      const wrapper = getSubmissionThread({ thread, threadSubmissions });
      return getSubmissionComponents(wrapper).first().prop('url');
    };

    it('matches expected format', () => {
      const subredditNamePrefixed = 'sub';
      const threadId = 'tId';
      const commentId = 'cId';
      const expectedUrl = `https://reddit.com/${subredditNamePrefixed}/comments/${threadId}/noop/${commentId}`;
      const submission = { subredditNamePrefixed, threadId, commentId, comment: '' };

      expect(getSubmissionUrlForSubmission(submission)).toEqual(expectedUrl);
    });

    it('trims t3_ prefix from thread Id', () => {
      const threadId = 't3_tId';
      const submission = { threadId, commentId: '', comment: '' };

      expect(getSubmissionUrlForSubmission(submission)).not.toContain('t3_');
    });

    it('trims t1_ prefix from comment Id', () => {
      const commentId = 't1_tId';
      const submission = { threadId: '', commentId, comment: '' };

      expect(getSubmissionUrlForSubmission(submission)).not.toContain('t1_');
    });
  });
});
