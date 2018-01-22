import React, {Component} from 'react';
import {connect} from "react-redux";
import _ from 'lodash';

import {fetchUsers} from "./UsersActions";
import {Card} from "material-ui";

class Users extends Component {
    componentDidMount() {
        this.props.fetchUsers();
    }

    render() {
        return (
            <div>
                <h1>Users</h1>
                {_.map(_.sortBy(this.props.users, 'submissionCount').reverse(), u => {
                    return (
                        <Card>
                            <div>
                                <h4>{u.username}</h4>
                                <div>Total Submissions: {u.submissionCount}</div>
                                <div>Total Themed Submissions: {u.themedSubmissionCount}</div>
                            </div>
                        </Card>
                    );
                })}
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
