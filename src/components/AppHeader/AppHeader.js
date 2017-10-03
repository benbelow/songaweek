import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import PropTypes from 'prop-types';
import snoo from '../../snoo.png';
import '../App/App.css';
import { connect } from "react-redux";
import { toggleMenu } from "./HeaderActions";

class AppHeader extends Component {
  static propTypes = {
    toggleMenu: PropTypes.func,
  };

  appVersion = 0.5;

  render() {
    return (
      <div className="App-header">
        <Flexbox flexDirection='row' justifyContent='space-between'>
          <Flexbox flexDirection='row'>
            <img src={snoo} className="App-logo" alt="logo"/>
            <h2 onClick={() => window.open('https://www.reddit.com/r/songaweek/')} className='App-title'>
              The Song A Week Challenge
            </h2>
          </Flexbox>
          <p style={{ fontSize: 8 }}>v{this.appVersion}</p>
        </Flexbox>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleMenu: () => {
      dispatch(toggleMenu());
    }
  }
};

export default connect(null, mapDispatchToProps)(AppHeader);
