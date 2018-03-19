export default [
    {
        name: 'Full Year',
        test: (user) => user.submissionCount >= 52,
    },
    {
        name: 'Double Year',
        test: (user) => user.submissionCount >= 104,
    },
    {
        name: 'Full Themed Year',
        test: (user) => user.themedSubmissionCount >= 52,
    },
    {
        name: 'Repeat Offender',
        test: (user) => user.submissionCount >= 2,
    },
    {
        name: 'Regular',
        test: (user) => user.submissionCount >= 5,
    },
    {
        name: 'Veteran',
        test: (user) => user.submissionCount >= 10,
    },
    {
        name: 'You Can\'t Tell Me What To Do',
        test: (user) => user.unthemedSubmissionCount >= 10
    },
    {
        name: 'Half and half',
        test: (user) => user.submissionCount >= 10 && Math.abs(user.themedSubmissionCount - user.unthemedSubmissionCount) < user.submissionCount / 10
    }
]
