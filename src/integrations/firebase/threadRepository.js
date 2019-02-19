import _ from 'lodash';

import { database } from './database';

export const setThread = (thread) => {
  database
    .ref(`threads/${thread.id}`)
    .set(thread);
};

export const getAllThreads = async () => {
  return _.values((await database
    .ref('threads')
    .once('value'))
    .val()
  );
};
