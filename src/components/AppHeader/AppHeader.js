import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import PropTypes from 'prop-types';
import snoo from '../../snoo.png';
import '../App/App.css';
import { connect } from "react-redux";
import { toggleMenu } from "./HeaderActions";
import Filters from "../Filters/Filters";

class AppHeader extends Component {
  static propTypes = {
    toggleMenu: PropTypes.func,
  };

  render() {
    return (
      <div className="App-header">
        <Flexbox flexDirection='row'>
          <img src={snoo} className="App-logo" alt="logo"/>
          <h2 onClick={() => window.open('https://www.reddit.com/r/songaweek/')} className='App-title'>
            The Song A Week Challenge
          </h2>
          <Flexbox style={{ margin: 'auto', padding: '8px' }} justifyContent="center" height='100%'>
            {/*<RaisedButton style={{ display: 'flex', float: 'right' }} label="MENU" onClick={this.props.toggleMenu}/>*/}
            <Filters/>
          </Flexbox>
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
