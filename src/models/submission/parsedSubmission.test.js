import ParsedSubmission from './parsedSubmission';

describe('parsed submission', () => {
    describe('themed', () => {
        [
            { comment: "", themed: false },
            { comment: "This is not themed", themed: false },
            { comment: "[song name](http://www.linktosong.com) (Genre) [Themed] this one is themed", themed: true },
            { comment: "this one is [themed]", themed: true },
            { comment: "(Themed) different brackets", themed: true },
            { comment: "[Themed) mixed brackets", themed: true },
            { comment: "[Themed but with other stuff in brackets]", themed: false },
            { comment: "[ Themed ] with whitespace in brackets", themed: false },
            { comment: "[theMEd] capitalisation should not matter", themed: true },
            // TODO: This test case might not be desired - a song named 'Themed' passes
            { comment: "[Themed](as a markdown http://www.link.com) (Not themed)", themed: true },
        ].forEach(({ comment, themed }) => {
            it('extracts themed information from comment', () => {
                const submission = new ParsedSubmission(comment);
                expect(submission.themed()).toBe(themed);
            });
        });
    });

    describe('genre', () => {
        const testAll = testCases => testCases.forEach(({ comment, expectedGenre }) => test(comment, expectedGenre));

        const test = (comment, expectedGenre) => {
            it('extracts genre information from comment', () => {
                const submission = new ParsedSubmission(comment);
                expect(submission.genre()).toBe(expectedGenre);
            });
        };

        testAll([
            { comment: "", expectedGenre: undefined },
            { comment: "this has no genre", expectedGenre: undefined },
        ]);

        describe('with markdown link', () => {
            describe('with themed flag', () => {
                testAll([
                    { comment: "[name](link)(Themed)(genre)", expectedGenre: 'genre' },
                    { comment: "[name] (link)(Themed)(genre)", expectedGenre: 'genre' },
                    { comment: "[name](link)[Themed][genre] ", expectedGenre: 'genre' },
                    { comment: "[name](link) [Themed](genre) ", expectedGenre: 'genre' },
                    { comment: "[name](link) [Themed] some description then a (genre) ", expectedGenre: undefined },
                ]);
            });

            testAll([
                { comment: "[song name](link.to.song) description", expectedGenre: undefined },
                { comment: "[song name](link.to.song) (genre)", expectedGenre: 'genre' },
                { comment: "[song name](link.to.song) description with brackets (genre)", expectedGenre: undefined },
                { comment: "[song name](http://www.linktosong.com)(genre) ", expectedGenre: 'genre' },
                { comment: "[song name] (http://www.linktosong.com)(genre) ", expectedGenre: 'genre' },
                { comment: "[song name](http://www.linktosong.com)[genre] ", expectedGenre: 'genre' },
                { comment: "[song name] (http://www.linktosong.com)[genre] ", expectedGenre: 'genre' },
            ])
        });
    });
});
