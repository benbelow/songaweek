import ParsedSubmission from './parsedSubmission';

//TODO: Fix code such that all commented out desired test cases pass
describe('parsed submission', () => {
  describe('themed', () => {
    [
      { comment: '', themed: false },
      { comment: 'This is not themed', themed: false },
      { comment: '[song name](http://www.linktosong.com) (Genre) [Themed] this one is themed', themed: true },
      { comment: 'this one is [themed]', themed: true },
      { comment: '(Themed) different brackets', themed: true },
      { comment: '[Themed) mixed brackets', themed: true },
      { comment: '[Themed but with other stuff in brackets]', themed: false },
      { comment: '[ Themed ] with whitespace in brackets', themed: false },
      { comment: '[theMEd] capitalisation should not matter', themed: true },
      // { comment: '[Themed](as a markdown http://www.link.com) (Not themed)', themed: false},
      { comment: '[name](link)(themed)(genre)', themed: true },
      { comment: '[name](link)(genre) somewhere in the description [Themed]', themed: true },
      { comment: '[Rainy Jam](https://soundcloud.com/user-535328441/rainy-jam) (Folk/Country) \\[Themed\\]', themed: true },
      { comment: '[Rainy Jam](https://soundcloud.com/user-535328441/rainy-jam) (Folk/Country) \\(Themed\\)', themed: true },
    ].forEach(({ comment, themed }) => {
      it('extracts themed information from comment', () => {
        const submission = new ParsedSubmission(comment);
        expect(submission.themed()).toBe(themed);
      });
    });
  });

  describe('genre', () => {
    [
      { comment: '', expectedGenre: undefined },
      { comment: 'this has no genre', expectedGenre: undefined },

      // With markdown link
      { comment: '[song name](link.to.song) description', expectedGenre: undefined },
      { comment: '[song name](link.to.song) (genre)', expectedGenre: 'genre' },
      { comment: '[song name](link.to.song) description with brackets (genre)', expectedGenre: undefined },
      { comment: '[song name](http://www.linktosong.com)(genre) ', expectedGenre: 'genre' },
      { comment: '[song name] (http://www.linktosong.com)(genre) ', expectedGenre: 'genre' },
      { comment: '[song name](http://www.linktosong.com)[genre] ', expectedGenre: 'genre' },
      { comment: '[song name] (http://www.linktosong.com)[genre] ', expectedGenre: 'genre' },

      // With themed flag
      { comment: '[name](link)(Themed)(genre)', expectedGenre: 'genre' },
      { comment: '[name] (link)(Themed)(genre)', expectedGenre: 'genre' },
      { comment: '[name](link)[Themed][genre] ', expectedGenre: 'genre' },
      { comment: '[name](link) [Themed](genre) ', expectedGenre: 'genre' },
      { comment: '[name](link) [Themed] some description then a (genre) ', expectedGenre: undefined },
      { comment: '[name](link) [genre] some description then a (themed) ', expectedGenre: 'genre' },

    ].forEach(({ comment, expectedGenre }) => ((comment, expectedGenre) => {
      it('extracts genre from comment', () => {
        const submission = new ParsedSubmission(comment);
        expect(submission.genre()).toBe(expectedGenre);
      });
    })(comment, expectedGenre));
  });

  describe('description', () => {
    [
      { comment: '', expectedDescription: '' },
      { comment: 'just description', expectedDescription: 'just description' },
      { comment: '[name](link)desc', expectedDescription: 'desc' },
      { comment: '[name] (link)desc', expectedDescription: 'desc' },
      { comment: '[name](link)[Themed]desc', expectedDescription: 'desc' },
      { comment: '[name](link)(genre)[Themed]desc', expectedDescription: 'desc' },
      { comment: '[name](link)[Themed](genre)desc', expectedDescription: 'desc' },
      { comment: '[name](link)[Themed](genre)desc', expectedDescription: 'desc' },
      { comment: 'desc before link[name](link)[Themed]', expectedDescription: 'desc before link' },
    ].forEach(({ comment, expectedDescription }) => {
      it('extracts description from comment', () => {
        const submission = new ParsedSubmission(comment);
        expect(submission.description()).toBe(expectedDescription);
      });
    });
  });

  describe('title', () => {
    [
      { comment: '', expectedTitle: undefined },
      { comment: '[name](link)', expectedTitle: 'name' },
      { comment: '[name] (link)', expectedTitle: 'name' },
      { comment: 'prelude to the link [name] (link)', expectedTitle: 'name' },
    ].forEach(({ comment, expectedTitle }) => {
      it('extracts title from comment', () => {
        const submission = new ParsedSubmission(comment);
        expect(submission.title()).toBe(expectedTitle);
      });
    });
  });

  describe('link', () => {
    [
      // { comment: 'just a comment with no link', expectedLink: undefined },
      { comment: '[name](link)', expectedLink: 'link' },
      { comment: '[name] (link)', expectedLink: 'link' },
      { comment: '[name](link) description', expectedLink: 'link' },
      { comment: 'prelude to the link [name] (link)', expectedLink: 'link' },
      { comment: 'prelude to the link [name]()', expectedLink: '' },
    ].forEach(({ comment, expectedLink }) => {
      it('extracts link from comment', () => {
        const submission = new ParsedSubmission(comment);
        expect(submission.link()).toBe(expectedLink);
      });
    });
  });

  describe('markdownLink', () => {
    [
      // { comment: 'just a comment with no link', expectedLink: undefined },
      { comment: '[name](link)', expectedLink: '[name](link)' },
      { comment: '[name] (link)', expectedLink: '[name](link)' },
      { comment: '[name](link) description', expectedLink: '[name](link)' },
      { comment: 'prelude to the link [name] (link)', expectedLink: '[name](link)' },
      { comment: 'prelude to the link [name]()', expectedLink: '[name]()' },
    ].forEach(({ comment, expectedLink }) => {
      it('extracts markdown link from comment', () => {
        const submission = new ParsedSubmission(comment);
        expect(submission.markdownLink()).toBe(expectedLink);
      });
    });
  });
});
