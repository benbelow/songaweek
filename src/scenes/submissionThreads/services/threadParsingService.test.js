import moment from 'moment';

import { description, theme, week } from './threadParsingService';

const defaultThread = {
    created: moment().unix(),
};

describe('threadService', () => {
    describe('theme', () => {
        const THEME_NOT_FOUND = '[theme not found]';

        [
            { title: '', expectedTheme: THEME_NOT_FOUND},
            { title: 'Submissions - Week 12 (Theme: This Is The Theme)', expectedTheme: 'This Is The Theme' },
            { title: 'Submissions - Week 12: Not a theme', expectedTheme: THEME_NOT_FOUND },
        ].forEach(({ title, expectedTheme }) => it('extracts theme from thread object', () => {
            const thread = { ...defaultThread, title };
            expect(theme(thread)).toBe(expectedTheme);
        }));

        it('trims whitespace from theme', () => {
            const expectedTheme = 'theme';
            const thread = { ...defaultThread, title: `(Theme: ${expectedTheme}  )`};
            expect(theme(thread)).toBe(expectedTheme);
        })
    });

    describe('week', () => {
        const WEEK_NOT_FOUND = '[week not found]';

        [
            { title: '', expectedWeek: WEEK_NOT_FOUND},
            { title: 'Submissions — Week 12 (Theme: This Is The Theme)', expectedWeek: 'Week 12' },
            { title: 'Submissions — Week 12 No theme', expectedWeek: WEEK_NOT_FOUND },
            // only matches long dash character, not short
            { title: 'Submissions - Week 13 (theme)', expectedWeek: 'Week 13' },
            { title: 'Submissions — Weak 15 (theme)', expectedWeek: 'Weak 15' },
        ].forEach(({ title, expectedWeek }) => it('extracts theme from thread object', () => {
            const thread = { ...defaultThread, title };
            expect(week(thread)).toBe(expectedWeek);
        }));

        it('trims whitespace from week', () => {
            const expectedWeek = 'Week 12';
            const thread = { ...defaultThread, title: `Submissions — ${expectedWeek} ()`};
            expect(week(thread)).toBe(expectedWeek);
        });

        it('appends year when thread from an old year', () => {
            const created = moment().subtract(1, 'years');
            const thread = { ...defaultThread, title: `Submissions — Week 10`, created: created.unix()};
            expect(week(thread)).toContain(created.year().toString());
        });

        it('does not append year when thread from this year', () => {
            const created = moment();
            const thread = { ...defaultThread, title: `Submissions — Week 10`, created: created.unix()};
            expect(week(thread)).not.toContain(created.year().toString());
        });
    });

    describe('description', () => {
        const DESCRIPTION_NOT_FOUND = '[description not found]';

        [
            { selftext: '', expectedWeek: DESCRIPTION_NOT_FOUND },
            { selftext: '**\n\n description ##', expectedWeek: 'description'},
            { selftext: '**\n description ##', expectedWeek: DESCRIPTION_NOT_FOUND},
            { selftext: '*\n\n description ##', expectedWeek: DESCRIPTION_NOT_FOUND},
            { selftext: '**\n\n description #', expectedWeek: DESCRIPTION_NOT_FOUND},
        ].forEach(({ selftext, expectedWeek }) => it('extracts theme from thread object', () => {
            const thread = { ...defaultThread, selftext };
            expect(description(thread)).toBe(expectedWeek);
        }));
    });
});
