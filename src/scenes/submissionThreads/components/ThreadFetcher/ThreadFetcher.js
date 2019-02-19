import { Component } from "react";
import { connect } from "react-redux";
import { fetchThreadsFromDatabase } from "./redux/ThreadFetcherActions";
import { syncNewThreads } from '../../../admin/AdminActions';

export class ThreadFetcher extends Component {
  async componentDidMount() {
    await this.props.fetchThreads();
    await this.props.syncNewThreads(this.props.threads.submissionThreads);
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => ({
  threads: state.threads,
});

const mapDispatchToProps = (dispatch) => ({
  fetchThreads: async () => {
    await dispatch(fetchThreadsFromDatabase());
  },
  syncNewThreads: async (threads) => {
    await dispatch(syncNewThreads(threads));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ThreadFetcher);
