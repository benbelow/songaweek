import React, { Component } from 'react';
import _ from 'lodash';

import Badges from '../../Badges';

class UserRow extends Component {
    render() {
        const { user, submissionsThisYear } = this.props;

        return (
            <tr key={user.username}>
                    <td>{user.username}</td>
                    <td>{submissionsThisYear.length}</td>
                    <td>{user.submissionCount}</td>
                    <td>{user.themedSubmissionCount}</td>
                    {/*{this.badgesSection(u)}*/}
            </tr>
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
