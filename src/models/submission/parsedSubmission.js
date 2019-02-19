import _ from 'lodash';

const markdownLinkRegex = /\[(.*?)\]\(.*?\)/;
const markdownLinkWithSpaceRegex = /\[(.*?)\] \(.*?\)/;
const markdownLinkWithSpaceRegexGlobal = /\[(.*?)\] \(.*?\)/;

const themedRegex = /(\[|\(|(\\\[)|(\\\())Themed(]|\)|(\\\])|(\\\)))/i;
const notThemedRegex = /(\[|\(|(\\\[)|(\\\())Not Themed(]|\)|(\\\])|(\\\)))/i;

const openingBracketsRegex = /^(\s?)+(\(|\\\()([^)]+)(\)|\\\))/;
const openingSquareBracketsRegex = /^(\s?)+(\[|\\\[)([^\]]+)(]|\\\])/;

//todo refactor this class - chaining is good, but must require the state gets reset or bad stuff happens. 2x classes?

export default class ParsedSubmission {
  constructor(comment) {
    this.comment = _.clone(comment);
    this.formattedComment = _.clone(comment);
  }

  fixMarkdownLinkWithSpace() {
    if (this.formattedComment.match(markdownLinkWithSpaceRegexGlobal) !== null) {
      this.formattedComment = this.formattedComment.replace(/] \(/, "](");
    }
    return this;
  }

  stripLink() {
    this.formattedComment = this.formattedComment
      .replace(markdownLinkRegex, "")
      .replace(markdownLinkWithSpaceRegex, "");
    return this;
  }

  stripThemedFlag() {
    this.formattedComment = this.formattedComment
      .replace(themedRegex, "")
      .replace(notThemedRegex, "");
    return this;
  }

// This actually trims an matched set of parens or square brackets, and only if they are at the start of the string
// This should be the case for songaweek comments, provided the markdownLink and theme flag have been stripped already
  stripGenre() {
    this.formattedComment = this.formattedComment
      .replace(openingBracketsRegex, "")
      .replace(openingSquareBracketsRegex, "");
    return this;
  }

  format() {
    const value = _.clone(this.formattedComment);
    this.formattedComment = _.clone(this.comment);
    return value;
  }

  markdownLink() {
    let fixedComment = this.fixMarkdownLinkWithSpace().format();
    let linkMatch = fixedComment.match(markdownLinkRegex);
    return linkMatch ? linkMatch[0] : undefined;
  }

  link() {
    const markdownLink = this.markdownLink();
    const linkInParens = markdownLink.replace(openingSquareBracketsRegex, "");
    const parensRegex = /\((.*?)\)/;
    if (!linkInParens.match(parensRegex)) {
      console.log(this, markdownLink);
    }
    return linkInParens.match(parensRegex) && linkInParens.match(parensRegex)[1];
  }

  title() {
    let fixedComment = this.fixMarkdownLinkWithSpace().format();
    if (markdownLinkRegex.test(fixedComment)) {
      return fixedComment.match(/\[(.*?)]/)[1];
    }
    return undefined;
  }

  description() {
    return this
      .stripLink()
      .stripThemedFlag()
      .stripGenre()
      .fixMarkdownLinkWithSpace()
      .format()
      .replace(/&amp;#x200B;/g, '');
  }

  genre() {
    const strippedComment = this.stripLink().stripThemedFlag().format();
    let hasParensGenre = openingBracketsRegex.test(strippedComment);
    let hasSquareBracketGenre = openingSquareBracketsRegex.test(strippedComment);
    if (!hasParensGenre && !hasSquareBracketGenre) {
      return undefined;
    }
    const bracketRegex = hasParensGenre ? openingBracketsRegex : openingSquareBracketsRegex;
    const innerRegex = hasParensGenre ? /(\(|\\\()(.*?)(\)|\\\))/ : /(\[|\\\[)(.*?)(]|\\\])/;
    return _.first(strippedComment.match(bracketRegex)).replace('\n', '').match(innerRegex)[2];
  }

  themed() {
    return themedRegex.test(this.comment);
  }
}
