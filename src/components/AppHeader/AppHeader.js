import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { FlatButton } from 'material-ui';
import { withRouter } from 'react-router-dom';

import { toggleMenu } from "./HeaderActions";
import snoo from '../../assets/snoo.png';
import '../App/App.css';
import { version } from '../../../package.json';

const navButtonStyle = {
    backgroundColor: 'white',
    marginLeft: 16,
    marginRight: 16,
    height: '50%',
    marginTop: 'auto',
    marginBottom: 'auto'
};

class AppHeader extends Component {
    static propTypes = {
        toggleMenu: PropTypes.func,
        syncData: PropTypes.func,
    };

    appVersion = version;

    render() {
        return (
            <div className="App-header">
                <Flexbox flexDirection='row' justifyContent='space-between'>
                    <Flexbox flexDirection='row'>
                        <img src={snoo} className="App-logo" alt="logo"/>
                        <h2 onClick={() => window.open('https://www.reddit.com/r/songaweek/')} className='App-title'>
                            The Song A Week Challenge
                        </h2>
                        <div style={{ display: 'flex', paddingLeft: 25, justifyContent: 'center' }}>
                            <FlatButton style={navButtonStyle}
                                    onClick={() => this.props.history.push('/threads')}>
                                WEEKS
                            </FlatButton>
                            <FlatButton style={navButtonStyle}
                                    onClick={() => this.props.history.push('/users')}>
                                USERS
                            </FlatButton>
                            <FlatButton style={navButtonStyle}
                                    onClick={() => this.props.history.push('/stats')}>
                                STATS
                            </FlatButton>
                        </div>
                    </Flexbox>
                    <p style={{ fontSize: 10 }}>v{this.appVersion}</p>
                </Flexbox>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleMenu: () => dispatch(toggleMenu()),
    };
};

export default connect(null, mapDispatchToProps)(withRouter(AppHeader));
