import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { disableFilter, enableFilter } from "./FilterActions";
import { AppBar, Drawer, Toggle } from "material-ui";

class Filters extends Component {
  static propTypes = {
    themed: PropTypes.bool,
    enableFilter: PropTypes.func,
    disableFilter: PropTypes.func,
  };

  onThemedToggle = (e, isChecked) => {
    const filterName = "themed";
    if (isChecked) {
      this.props.enableFilter(filterName);
    } else {
      this.props.disableFilter(filterName);
    }
  };

  render() {
    return (
      <div>
        <Toggle style={{ margin: '4px' }} label="Themed" onToggle={this.onThemedToggle}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    themed: state.filters.themed,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    enableFilter: filterName => {
      dispatch(enableFilter(filterName));
    },
    disableFilter: filterName => {
      dispatch(disableFilter(filterName));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Filters);