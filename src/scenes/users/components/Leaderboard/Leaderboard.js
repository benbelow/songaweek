import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from 'lodash';
import { Toggle } from 'material-ui';
import ReactTable from 'react-table';
import moment from 'moment';

import { fetchUsers } from "../../redux/UsersActions";
import { submissionsThisYear } from '../../services/UserSubmissionAnalyser';

import './Leaderboard.css';
import 'react-table/react-table.css';
import AccoladeCell from '../AccoladeCell/AccoladeCell';
import Badges from '../../content/Badges';
import YearBadges from '../../content/YearBadges';

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
                    <p>Only show this year's users</p>
                    <Toggle
                        style={{ width: 30 }}
                        onToggle={() => this.setState({ onlyActiveUsers: !this.state.onlyActiveUsers })}
                        toggled={this.state.onlyActiveUsers}
                    />
                </div>

                <ReactTable
                    sortable
                    filterable
                    defaultSortDesc
                    defaultPageSize={20}
                    columns={[
                        { Header: 'Username', accessor: 'username', defaultSortDesc: false },
                        {
                            Header: `Submissions in ${moment().year()}`,
                            id: 'yearlySubs',
                            accessor: u => u.submissionsThisYear.length,
                        },
                        {
                            Header: 'Submissions',
                            accessor: 'submissionCount',
                        },
                        { Header: 'Themed Submissions', accessor: 'themedSubmissionCount' },
                        {
                            Header: 'Years', Cell: row => {
                                return (
                                    <AccoladeCell
                                        user={row.original}
                                        badges={YearBadges}
                                    />
                                );
                            }
                        },
                        {
                            Header: 'Accolades', Cell: row => {
                                return (
                                    <AccoladeCell
                                        user={row.original}
                                        badges={Badges}
                                    />
                                );
                            }
                        },
                    ]}
                    data={_.orderBy(this.users(), ['submissionsThisYear', 'submissionCount'], ['desc', 'desc'])}
                />
            </div>
        );
    };

    users = () => {
        const { users } = this.props;
        const analysedUsers = users.map(u => {
                const themedSubmissions = _.filter(u.submissions, s => s.themed);
                return {
                    ...u,
                    submissionsThisYear: submissionsThisYear(u),
                    submissionCount: u.submissions.length,
                    themedSubmissionCount: themedSubmissions.length,
                    unthemedSubmissionCount: u.submissions.length - themedSubmissions.length,
                };
            }
        );
        return this.state.onlyActiveUsers ? analysedUsers.filter(u => u.submissionsThisYear.length > 0) : analysedUsers;
    };
}

const mapStateToProps = state => ({
    users: state.users.users,
});

const mapDispatchToProps = dispatch => ({
    fetchUsers: () => dispatch(fetchUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
