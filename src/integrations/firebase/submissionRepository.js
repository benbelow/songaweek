import { database } from './database';

export const setSubmission = (submission) => {
    database
        .ref(`submissions/${submission.commentId}`)
        .set(submission);
};

export const getAllSubmissions = async () => {
    return await database
        .ref('/submissions')
        .orderByChild('author')
        .once('value');
};
