import _ from 'lodash';

import {database} from "../../integrations/firebase/database";
import {fetchAllThreads} from "../submissionThreads/components/ThreadFetcher/ThreadFetcherActions";
import {fetchSubmissions} from "../submissionThreads/components/SubmissionThread/SubmissionThreadActions";
import Submission from "../../models/submission/submission";

export const SYNC_DATA = 'SYNC_DATA';

export function syncData() {
    return async dispatch => {
        const allThreads = await dispatch(fetchAllThreads());

        _.forEach(allThreads, async t => {
            database.ref(`threads/${t.id}`).set(t);
            await dispatch(fetchSubmissions(t.id, t.url))
                .then(ts => _.each(ts, s => {
                    const submission = new Submission(s.comment);
                    const genre = submission.genre() || null;
                    const link = submission.markdownLink() || null;
                    const description = submission.description() || null;
                    const themed = submission.themed() || null;
                    database.ref(`submissions/${s.commentId}`).set(_.merge({}, s, { genre, link, description, themed }));
                }))
                .then(() => console.log(`Finished syncing thread id: ${t.id}`));
        });

        return {
            type: SYNC_DATA,
        };
    }
}
