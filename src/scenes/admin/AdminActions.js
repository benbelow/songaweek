import _ from 'lodash';
import 'arraync';

import { fetchAllThreads } from "../submissionThreads/components/ThreadFetcher/redux/ThreadFetcherActions";
import { fetchSubmissions } from "../submissionThreads/components/SubmissionThread/redux/SubmissionThreadActions";
import ParsedSubmission from "../../models/submission/parsedSubmission";
import * as threadRepository from '../../integrations/firebase/threadRepository';
import * as submissionRepository from '../../integrations/firebase/submissionRepository';

export const SYNC_DATA = 'SYNC_DATA';

export function syncData() {
  return async dispatch => {
    const allThreads = await dispatch(fetchAllThreads());

    _.forEach(allThreads, async t => {
      await syncThread(t, dispatch);
    });

    return {
      type: SYNC_DATA,
    };
  };
}

export function syncNewThreads(existingThreads) {
  return async dispatch => {
    const lastSeenThreadId = _.first(existingThreads).name;
    const newThreads = await dispatch(fetchAllThreads(lastSeenThreadId));

    _.forEach(newThreads, async t => {
      await syncThread(t, dispatch);
    });

    // latest thread(s) will still have submissions coming in, so sync these on load too.
    await syncThread(existingThreads[0], dispatch);
    await syncThread(existingThreads[1], dispatch);

    return {
      type: SYNC_DATA,
    };
  };
}

async function syncThread(t, dispatch) {
  threadRepository.setThread(t);
  await dispatch(fetchSubmissions(t.id, t.url))
    .then(ts => _.each(ts, s => {
      const submission = new ParsedSubmission(s.comment);
      const genre = submission.genre() || null;
      const link = submission.markdownLink() || null;
      const description = submission.description() || null;
      const themed = submission.themed() || null;
      const threadTimeCreated = t.created;
      submissionRepository.setSubmission(_.merge({}, s, { genre, link, description, themed, threadTimeCreated }));
    }))
    .then(() => console.log(`Finished syncing thread id: ${t.id}`));
}
