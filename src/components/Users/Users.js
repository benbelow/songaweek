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
                {_.map(_.sortBy(this.users(), 'submissionCount').reverse(), u => {
                    return (
                        <Card key={u.username}>
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

    users = () => this.props.users.filter(u => u.submissionCount > 1);
}

const mapStateToProps = state => ({
    users: state.users.users,
});

const mapDispatchToProps = dispatch => ({
    fetchUsers: () => dispatch(fetchUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
