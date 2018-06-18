import _ from 'lodash';
import { extractUrls, isValidSubmissionUrl } from "../../../../../services/UrlParsingService/UrlParsingService";

export const UPDATE_SUBMISSIONS = 'UPDATE_SUBMISSIONS';

const REDDIT_KIND_ID_COMMENT = 't1';

const containsValidSubmissionUrl = comment => {
    return _.filter(extractUrls(comment), u => isValidSubmissionUrl(u)).length > 0;
};

const updateSubmissionsAction = threadSubmissions => ({
    type: UPDATE_SUBMISSIONS,
    threadSubmissions,
});

const redditCommentItemToSubmission = item => ({
    comment: item.data.body,
    author: item.data.author,
    threadId: item.data.parent_id,
    commentId: item.data.name,
    subredditNamePrefixed: item.data.subreddit_name_prefixed,
});

export function fetchSubmissions(threadId, url) {
    return async dispatch => {
        const response = await fetch(url + ".json?limit=1000", { method: 'get', mode: 'cors' });
        const json = await response.json();
        const submissionComments = json[1].data.children
            .filter(c => c.kind === REDDIT_KIND_ID_COMMENT)
            .map(redditCommentItemToSubmission)
            .filter(comment => containsValidSubmissionUrl(comment.comment));

        dispatch(updateSubmissionsAction({ threadId: threadId, submissions: submissionComments }));
        return submissionComments;
    };
}
