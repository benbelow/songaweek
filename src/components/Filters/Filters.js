import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { disableFilter, enableFilter } from "./FilterActions";
import { Toggle } from "material-ui";
import muiThemeable from 'material-ui/styles/muiThemeable';


class Filters extends Component {
  static propTypes = {
    themed: PropTypes.bool,
    enableFilter: PropTypes.func,
    disableFilter: PropTypes.func,
    muiTheme: PropTypes.object,
  };

  onThemedToggle = (e, isChecked) => {
    const filterName = "themed";
    if (isChecked) {
      this.props.enableFilter(filterName);
    } else {
      this.props.disableFilter(filterName);
    }
  };

  onPrivateToggle = (e, isChecked) => {
    const filterName = "private";
    if (isChecked) {
      this.props.enableFilter(filterName);
    } else {
      this.props.disableFilter(filterName);
    }
  };

  render() {
    return (
      <div style={{backgroundColor: '#444', position: 'sticky', top: '0', zIndex: 99, display: 'flex', justifyContent: 'left'}}>
        <Toggle style={{ margin: '4px', width: '25%', marginRight: 24 }} labelStyle={{color: this.props.muiTheme.palette.primary1Color}} label="Themed Only" onToggle={this.onThemedToggle}/>
        <div style={{backgroundColor: '#333', width: 3}} />
        <Toggle style={{ margin: '4px', width: '25%', marginRight: 24}} labelStyle={{color: this.props.muiTheme.palette.primary1Color}} label="Private Playlists?" onToggle={this.onPrivateToggle}/>
        <div style={{backgroundColor: '#333', width: 3}} />
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

export default connect(mapStateToProps, mapDispatchToProps)(muiThemeable()(Filters));