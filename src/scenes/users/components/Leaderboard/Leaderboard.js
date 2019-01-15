import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from 'lodash';
import moment from 'moment';

import { fetchUsers } from "../redux/UsersActions";
import UserRow from '../UserRow/UserRow';
import { submissionsThisYear } from '../../services/UserSubmissionAnalyser';

import './Leaderboard.css';
import { Toggle } from 'material-ui';

class Leaderboard extends Component {
    componentDidMount() {
        this.props.fetchUsers();
    }

    state = {
        onlyActiveUsers: true,
    };

    render() {
        return (
            <div>
                <div style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <p>Show submissions from all time</p>
                    <Toggle
                        style={{ width: 30 }}
                        onToggle={() => this.setState({ onlyActiveUsers: !this.state.onlyActiveUsers })}
                        toggled={this.state.onlyActiveUsers}
                    />
                </div>

                <table>
                    <tr>
                        <th>Username</th>
                        <th>{moment().year()} Submissions</th>
                        <th>Total Submissions</th>
                        <th>Total Themed submissions</th>
                        <th>Accolades</th>
                    </tr>
                    {_.map(_.sortBy(this.users(), ['submissionsThisYear', 'user.submissionCount']).reverse(), u => {
                        return <UserRow user={u.user} submissionsThisYear={u.submissionsThisYear}/>;
                    })}
                </table>
            </div>
        );
    };

    users = () => {
        const { users } = this.props;
        const analysedUsers = users.map(u => ({
            user: u,
            submissionsThisYear: submissionsThisYear(u)
        }));
        return this.state.onlyActiveUsers ? analysedUsers.filter(u => u.submissionsThisYear.length > 0) : analysedUsers;
    }
}

const mapStateToProps = state => ({
    users: state.users.users,
});

const mapDispatchToProps = dispatch => ({
    fetchUsers: () => dispatch(fetchUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
