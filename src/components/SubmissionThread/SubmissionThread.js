import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardActions, CardHeader, CardText, Divider } from "material-ui";
import Flexbox from 'flexbox-react';
import { description, theme, week } from "./ThreadHelpers";
import ReactMarkdown from 'react-markdown';
import { connect } from "react-redux";
import _ from "lodash";
import { fetchSubmissions } from "./SubmissionThreadActions";
import Submission from "../Submission/Submission";
import Formatter from "../Submission/Formatter";


class SubmissionThread extends Component {
  static propTypes = {
    thread: PropTypes.object.isRequired,
    threadSubmissions: PropTypes.array,
    isThemedFilter: PropTypes.bool,
  };

  cardStyle = {
    margin: 16,
  };

  flexboxStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    alignContent: 'stretch'
  };

  constructor(props) {
    super(props);
    this.submissions = this.submissions.bind(this);
    this.fetchSubmissions = this.fetchSubmissions.bind(this);
  }

  themedFilter = submission => {
    if (!this.props.isThemedFilter) {
      return () => true;
    }
    const formatter = new Formatter(submission.comment);
    return formatter.themed();
  };

  submissions() {
    let currentThread = _.first(_.filter(this.props.threadSubmissions, ts => this.props.thread.id === ts.threadId));

    if (!currentThread) {
      return undefined;
    } else {
      return _.filter(currentThread.submissions, this.themedFilter);
    }
  }

  fetchSubmissions() {
    if (!this.submissions()) {
      this.props.fetchSubmissions(this.props.thread.id, this.props.thread.url)
    }
  }

  render() {
    const thread = this.props.thread;

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
        <CardActions/>
        <Divider/>
        <CardText expandable>
          <ReactMarkdown source={description(thread)}/>

          <Flexbox style={this.flexboxStyle}
                   flexDirection="column"
                   flexWrap="wrap"
                   flexBasis='content'
          >
            {_.map(this.submissions(), (s, i) => {
              return (
                <Submission key={s.author + i} author={s.author} comment={s.comment}/>
              )
            })}
          </Flexbox>

        </CardText>
      </Card>
    );
  };
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