import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from 'lodash';
import moment from 'moment';
import { Card } from "material-ui";

import { fetchUsers } from "./UsersActions";
import Badges from './Badges';

class Users extends Component {
    componentDidMount() {
        this.props.fetchUsers();
    }

    render() {
        return (
            <div>
                <h1>Users</h1>
                {_.map(_.sortBy(this.users().filter(u => this.submissionsThisYear(u).length > 0), 'submissionCount').reverse(), u => {
                    return (
                        <Card key={u.username}>
                            <div>
                                <h4>{u.username}</h4>
                                <div>Total Submissions: {this.submissionsThisYear(u).length} ({u.submissionCount})</div>
                                <div>Total Themed Submissions: {u.themedSubmissionCount}</div>
                                {/*{this.badgesSection(u)}*/}
                            </div>
                        </Card>
                    );
                })}
            </div>
        );
    };

    submissionsThisYear = user => {
        if (!user.submissionsThisYear) {
            user.submissionsThisYear = user.submissions.filter(s => moment.unix(s.threadTimeCreated).year() === moment().year());
        }
        return user.submissionsThisYear;
    };

    users = () => this.props.users.filter(u => u.submissionCount > 1);

    badgesSection = (user) => {
        const badges = _.filter(Badges, b => b.test(user));
        return badges.length === 0 ? null : (
            <div>
                <h3>BADGES</h3>
                {badges.map(b => (<div>{b.name}</div>))}
            </div>
        );
    };
}

const mapStateToProps = state => ({
    users: state.users.users,
});

const mapDispatchToProps = dispatch => ({
    fetchUsers: () => dispatch(fetchUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
