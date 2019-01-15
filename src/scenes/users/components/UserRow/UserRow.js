import React, { Component } from 'react';
import _ from 'lodash';
import { Card } from "material-ui";

import Badges from '../../Badges';
import { submissionsThisYear } from '../../services/UserSubmissionAnalyser';

class UserRow extends Component {
    render() {
        const { user } = this.props;

        return (
            <Card key={user.username}>
                <div>
                    <h4>{user.username}</h4>
                    <div>Total Submissions: {submissionsThisYear(user).length} ({user.submissionCount})</div>
                    <div>Total Themed Submissions: {user.themedSubmissionCount}</div>
                    {/*{this.badgesSection(u)}*/}
                </div>
            </Card>
        );
    }


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

export default UserRow;
