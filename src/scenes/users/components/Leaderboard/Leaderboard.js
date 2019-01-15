import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from 'lodash';

import { fetchUsers } from "../redux/UsersActions";
import UserRow from '../UserRow/UserRow';
import { submissionsThisYear } from '../../services/UserSubmissionAnalyser';

class Leaderboard extends Component {
    componentDidMount() {
        this.props.fetchUsers();
    }

    render() {
        const analysedUsers = this.users().map(u => {
            return {
                user: u,
                submissionsThisYear: submissionsThisYear(u)
            }
        });

        return (
            <div>
                <h1>Users</h1>
                <tr>
                    <th>Username</th>
                    <th>Yearly Submissions</th>
                    <th>Total Submissions</th>
                    <th>Total Themed submissions</th>
                </tr>
                {_.map(_.sortBy(analysedUsers.filter(u => u.submissionsThisYear.length > 0), ['submissionsThisYear', 'user.submissionCount']).reverse(), u => {
                    return <UserRow user={u.user} submissionsThisYear={u.submissionsThisYear}/>;
                })}
            </div>
        );
    };

    users = () => this.props.users.filter(u => u.submissionCount > 1);
}

const mapStateToProps = state => ({
    users: state.users.users,
});

const mapDispatchToProps = dispatch => ({
    fetchUsers: () => dispatch(fetchUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
