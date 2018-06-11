import _ from 'lodash';
import {isValidSubmissionUrl} from "../../../../services/UrlParsingService/UrlParsingService";
import {extractUrls} from "../../../../services/UrlParsingService/UrlParsingService";

export const UPDATE_SUBMISSIONS = 'UPDATE_SUBMISSIONS';

const REDDIT_KIND_ID_COMMENT = 't1';

const containsValidSubmissionUrl = comment => {
    return _.filter(extractUrls(comment), u => isValidSubmissionUrl(u)).length > 0;
};

export function updateSubmissions(threadSubmissions) {
    return {
        type: UPDATE_SUBMISSIONS,
        threadSubmissions,
    }
}

export function fetchSubmissions(threadId, url) {
    return async dispatch => {
        let submissionsForThread;
        await fetch(url + ".json?limit=1000", {method: 'get', mode: 'cors'})
            .then(function (response) {
                return response.json();
            })
            .then(data => {
                return data[1].data.children.filter(c => c.kind === REDDIT_KIND_ID_COMMENT).map(i => {
                    return {
                        comment: i.data.body,
                        author: i.data.author,
                        threadId: i.data.parent_id,
                        commentId: i.data.name,
                        subredditNamePrefixed: i.data.subreddit_name_prefixed,
                    }
                });
            })
            .then(results => _.filter(results, r => containsValidSubmissionUrl(r.comment)))
            .then(submissions => {
                submissionsForThread = submissions;
                dispatch(updateSubmissions({threadId: threadId, submissions: submissions}))
            });

        return submissionsForThread;
    }
}
