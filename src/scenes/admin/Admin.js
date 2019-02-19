import React, { Component } from 'react';
import AutoRenew from 'material-ui/svg-icons/action/autorenew';
import { Divider, List, RaisedButton } from "material-ui";
import { connect } from "react-redux";

import { syncData } from "./AdminActions";

class Users extends Component {
  render() {
    return (
      <div>
        <h1>Admin</h1>
        <p>Super secret admin section of the site! Shh don't tell anyone</p>
        <List>
          <Divider/>
          {this.syncAllSection()}
          <Divider/>
        </List>
      </div>
    );
  };

  syncAllSection() {
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <RaisedButton>
        <AutoRenew
          style={{ marginLeft: 12, paddingTop: '5%', cursor: 'pointer' }}
          onClick={this.props.syncData}
        />
      </RaisedButton>
      <h3>SYNC ALL DATA</h3>
      <p>Fetches all submissions for all weeks since the start of the subreddit!</p>
    </div>;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    syncData: () => dispatch(syncData()),
  };
};

export default connect(() => {
}, mapDispatchToProps)(Users);
