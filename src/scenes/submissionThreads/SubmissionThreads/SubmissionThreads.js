import React, { Component } from 'react';
import { connect } from "react-redux";
import SubmissionThread from "../components/SubmissionThread/SubmissionThread";

export class SubmissionThreads extends Component {
    render() {
        return (
            <div>
                {this.props.submissionThreads.map(thread =>
                    <SubmissionThread
                        key={thread.url}
                        thread={thread}
                    />
                )}
            </div>
        );
    };
}

const mapStateToProps = state => {
    return {
        submissionThreads: state.threads.submissionThreads,
    };
};

export default connect(mapStateToProps)(SubmissionThreads);
