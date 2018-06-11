import _ from 'lodash';

import {database} from "../../firebase/database";
import {fetchAllThreads} from "../ThreadFetcher/ThreadFetcherActions";
import {fetchSubmissions} from "../SubmissionThread/SubmissionThreadActions";
import Formatter from "../Submission/Formatter";

export const SYNC_DATA = 'SYNC_DATA';

export function syncData() {
    return async dispatch => {
        const allThreads = await dispatch(fetchAllThreads());

        _.forEach(allThreads, async t => {
            database.ref(`threads/${t.id}`).set(t);
            await dispatch(fetchSubmissions(t.id, t.url))
                .then(ts => _.each(ts, s => {
                    const formatter = new Formatter(s.comment);
                    const genre = formatter.genre() || null;
                    const link = formatter.markdownLink() || null;
                    const description = formatter.description() || null;
                    const themed = formatter.themed() || null;
                    database.ref(`submissions/${s.commentId}`).set(_.merge({}, s, { genre, link, description, themed }));
                }))
                .then(() => console.log(`Finished syncing thread id: ${t.id}`));
        });

        return {
            type: SYNC_DATA,
        };
    }
}
