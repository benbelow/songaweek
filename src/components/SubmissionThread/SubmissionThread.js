import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardText, Divider, RaisedButton } from "material-ui";
import Flexbox from 'flexbox-react';
import { description, theme, week } from "./ThreadHelpers";
import ReactMarkdown from 'react-markdown';
import { connect } from "react-redux";
import _ from "lodash";
import { fetchSubmissions } from "./SubmissionThreadActions";
import Submission from "../Submission/Submission";
import Formatter from "../Submission/Formatter";
import { extractUrls } from "../../helpers/UrlParser";
import { isSoundCloudUrl } from "../../helpers/UrlValidator"
import { generatePlaylist, getPlaylistLinkForThread } from "../../soundcloud/PlaylistGenerator";


class SubmissionThread extends Component {
  static propTypes = {
    thread: PropTypes.object.isRequired,
    threadSubmissions: PropTypes.array,
    isThemedFilter: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      playlistTitle: undefined,
      playlistLink: undefined,
      shouldShowPlaylist: false,
    }
    this.submissions = this.submissions.bind(this);
    this.fetchSubmissions = this.fetchSubmissions.bind(this);
    this.shouldShowGenerateScPlaylistButton = this.shouldShowGenerateScPlaylistButton.bind(this);
    this.generateSoundcloudPlaylist = this.generateSoundcloudPlaylist.bind(this);
  }

  cardStyle = {
    margin: 16,
  };

  flexboxStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    alignContent: 'stretch'
  };

  cachedSubmissions;

  themedFilter = submission => {
    if (!this.props.isThemedFilter) {
      return () => true;
    }
    const formatter = new Formatter(submission.comment);
    return formatter.themed();
  };

  submissions() {
    if (this.cachedSubmissions) {
      return this.cachedSubmissions;
    }

    let currentThread = _.first(_.filter(this.props.threadSubmissions, ts => this.props.thread.id === ts.threadId));

    if (!currentThread) {
      this.cachedSubmissions = null;
    } else {
      this.cachedSubmissions = _.filter(currentThread.submissions, this.themedFilter);
    }
    return this.cachedSubmissions;
  }

  fetchSubmissions() {
    if (!this.submissions()) {
      this.props.fetchSubmissions(this.props.thread.id, this.props.thread.url)
    }
  }

  shouldShowGenerateScPlaylistButton() {
    let submissions = this.submissions();
    return submissions && submissions.length > 0
      && _.filter(submissions, s => {
        return _.filter(extractUrls(s.comment), u => isSoundCloudUrl(u)).length > 0;
      }).length > 0;
  }

  generateSoundcloudPlaylist() {
    const title = this.props.thread.title;
    generatePlaylist(_.flatten(_.map(this.submissions(), s => {
        return _.filter(extractUrls(s.comment), u => isSoundCloudUrl(u))
      }))
      , title)
      .then(() => {
      console.log('Generated playlist');
        this.setState({
          ...this.state,
          shouldShowPlaylist: true,
          playlistTitle: title,
          playlistLink: getPlaylistLinkForThread(title),
        })
      });
  }

  render() {
    const thread = this.props.thread;
    const generateScPlaylistButton = (
      <RaisedButton
        style={{ marginBottom: '16px' }}
        label='Generate Soundcloud Playlist'
        onClick={this.generateSoundcloudPlaylist}/>
    );

    const scPlaylistLink = (
      <RaisedButton
        style={{ marginBottom: '16px', marginLeft: "16px"}}
        secondary
        label="Soundcloud Playlist"
        onClick={() => window.open(this.state.playlistLink)}/>
    );

    return (
      <Card
        style={this.cardStyle}
        onExpandChange={this.fetchSubmissions}
      >
        <CardHeader
          title={theme(thread)}
          subtitle={week(thread)}
          actAsExpander
          showExpandableButton
        />
        <Divider/>
        <CardText expandable>
          <ReactMarkdown source={description(thread)}/>

          {this.shouldShowGenerateScPlaylistButton() ? generateScPlaylistButton : undefined}
          {this.shouldShowPlaylistLink() ? scPlaylistLink : undefined}

          <Divider/>

          <Flexbox style={this.flexboxStyle}
                   flexDirection="column"
                   flexWrap="wrap"
                   flexBasis='content'
          >
            {_.map(this.submissions(), (s, i) => {
              return (
                <Submission
                  key={s.author + i}
                  author={s.author}
                  comment={s.comment}
                  url={`https://reddit.com/${s.subredditNamePrefixed}/comments/${s.threadId.replace('t3_', '')}/noop/${s.commentId.replace('t1_', '')}`}
                />
              )
            })}
          </Flexbox>

        </CardText>
      </Card>
    );
  };

  shouldShowPlaylistLink() {
    return this.state.shouldShowPlaylist && this.state.playlistLink;
  }
}

const mapStateToProps = state => {
  return {
    threadSubmissions: _.filter(state.submissionThread.threadSubmissions),
    isThemedFilter: state.filters.themed
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSubmissions: (id, url) => {
      dispatch(fetchSubmissions(id, url));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionThread);