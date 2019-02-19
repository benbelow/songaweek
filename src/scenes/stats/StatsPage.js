import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchUsers } from '../users/redux/UsersActions';

export class StatsPage extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    const { users } = this.props;
    const allSubmissions = _.flatten(users.map(u => u.submissions));
    const weeks = _.groupBy(allSubmissions, "threadId");

    return (
      <div>
        <h1>All Time</h1>
        <p>
          {`${users.length} Users`}
        </p>
        <p>
          {`${allSubmissions.length} Submissions`}
        </p>
        <p>
          {`${weeks && Object.values(weeks).length} Weeks`}
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users.users,
});

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StatsPage);
