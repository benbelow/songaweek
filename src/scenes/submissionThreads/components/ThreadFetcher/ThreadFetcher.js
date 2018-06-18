import {Component} from "react";
import {connect} from "react-redux";
import {fetchThreads} from "./redux/ThreadFetcherActions";

export class ThreadFetcher extends Component {
  componentDidMount() {
    this.props.fetchThreads();
  }

  render() {
    return null;
  }
}

const mapDispatchToProps = dispatch => ({
    fetchThreads: () => {
        dispatch(fetchThreads());
    },
});

export default connect(() => ({}), mapDispatchToProps)(ThreadFetcher);
