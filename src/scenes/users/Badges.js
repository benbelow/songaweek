import fullYear from '../../assets/fullYear.png';
import doubleYear from '../../assets/doubleYear.png';
import themedYear from '../../assets/themedYear.png';
import regular from '../../assets/regular.png';
import halfAndHalf from '../../assets/halfAndHalf.png';
import halfway from '../../assets/halfway.png';

export default [
    {
        name: 'Halfway there!',
        test: (user) => user.submissionCount < 52 && user.submissionCount >= 26,
        icon: halfway
    },
    {
        name: 'Full Year',
        test: (user) => user.submissionCount >= 52,
        icon: fullYear
    },
    {
        name: 'Double Year',
        test: (user) => user.submissionCount >= 104,
        icon: doubleYear
    },
    {
        name: 'Full Themed Year',
        test: (user) => user.themedSubmissionCount >= 52,
        icon: themedYear
    },
    {
        name: 'Repeat Offender',
        test: (user) => user.submissionCount >= 2,
    },
    {
        name: 'Regular',
        test: (user) => user.submissionCount >= 5,
        icon: regular
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
        test: (user) => user.submissionCount >= 10 && Math.abs(user.themedSubmissionCount - user.unthemedSubmissionCount) < user.submissionCount / 10,
        icon: halfAndHalf
    },
];
