import React, {Component} from 'react';
import {connect} from "react-redux";
import _ from 'lodash';
import SubmissionThread from "./SubmissionThread/SubmissionThread";

class SubmissionThreads extends Component {
  render() {
    return (
      <div>
        {_.map(this.props.submissionThreads, thread => {
          return (
            <SubmissionThread key={thread.url} thread={thread}/>
          );
        })}
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    submissionThreads: state.threads.submissionThreads,
  }
};

export default connect(mapStateToProps)(SubmissionThreads);