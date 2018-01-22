import React, {Component} from 'react';
import Flexbox from 'flexbox-react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import {syncData, toggleMenu} from "./HeaderActions";
import AutoRenew from 'material-ui/svg-icons/action/autorenew';
import snoo from '../../snoo.png';
import '../App/App.css';

class AppHeader extends Component {
    static propTypes = {
        toggleMenu: PropTypes.func,
        syncData: PropTypes.func,
    };

    appVersion = '0.6.1';

    render() {
        return (
            <div className="App-header">
                <Flexbox flexDirection='row' justifyContent='space-between'>
                    <Flexbox flexDirection='row'>
                        <img src={snoo} className="App-logo" alt="logo"/>
                        <h2 onClick={() => window.open('https://www.reddit.com/r/songaweek/')} className='App-title'>
                            The Song A Week Challenge
                        </h2>
                        <AutoRenew
                            style={{ marginLeft: 12, paddingTop: '5%', width: 40, height: 40, cursor: 'pointer' }}
                            color={'#FFFFFF'}
                            onClick={this.props.syncData}
                        />
                    </Flexbox>
                    <p style={{fontSize: 8}}>v{this.appVersion}</p>
                </Flexbox>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleMenu: () => dispatch(toggleMenu()),
        syncData: () => dispatch(syncData()),
    }
};

export default connect(null, mapDispatchToProps)(AppHeader);
