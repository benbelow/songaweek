import React from 'react';

export default props => {
    const earnedBadges = props.badges.filter(b => b.test(props.user));
    return (
        <div>
            {earnedBadges.map(b => b.icon &&
                <img
                    src={b.icon}
                    style={{ height: 30, width: 30, padding: 2 }}

                />)}
        </div>);
}
