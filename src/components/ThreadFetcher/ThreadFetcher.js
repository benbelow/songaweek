import {Component} from "react";
import {connect} from "react-redux";
import {fetchThreads} from "./ThreadFetcherActions";

class ThreadFetcher extends Component {
  componentDidMount() {
    this.props.fetchThreads();
  }

  render() {
    return null;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchThreads: () => {
      dispatch(fetchThreads());
    },
  };
};

export default connect(() => {return {}}, mapDispatchToProps)(ThreadFetcher);