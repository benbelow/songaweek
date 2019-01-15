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
        return (
            <div>
                <h1>Users</h1>
                {_.map(_.sortBy(this.users().filter(u => submissionsThisYear(u).length > 0), 'submissionCount').reverse(), u => {
                    return <UserRow user={u}/>
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
