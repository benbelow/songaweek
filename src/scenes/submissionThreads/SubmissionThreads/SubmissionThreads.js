import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button } from '@material-ui/core/es/index';

import SubmissionThread from "../components/SubmissionThread/SubmissionThread";

export class SubmissionThreads extends Component {
    state = {
        threadsToDisplay: 3,
    };

    render() {
        const threadsLoaded = this.props.submissionThreads.length > 0;

        return threadsLoaded ? (
            <div>
                {this.props.submissionThreads.slice(0, this.state.threadsToDisplay).map(thread =>
                    <SubmissionThread
                        key={thread.url}
                        thread={thread}
                    />
                )}

                <Button
                    onClick={() => this.setState({ threadsToDisplay: this.state.threadsToDisplay + 10 })}
                    style={{ marginBottom: 200, backgroundColor: '#AAAAAA' }}
                >
                    LOAD MORE THREADS
                </Button>
            </div>
        ) : <div>Loading threads...</div>;
    };
}

const mapStateToProps = state => {
    return {
        submissionThreads: state.threads.submissionThreads,
    };
};

export default connect(mapStateToProps)(SubmissionThreads);
