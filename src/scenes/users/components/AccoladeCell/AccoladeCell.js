import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';

export default props => {
  const earnedBadges = props.badges.filter(b => b.test(props.user));
  return (
    <div>
      {earnedBadges.map(b => b.icon &&
        <Tooltip
          title={b.name}
          placement="top"
        >
          <img
            src={b.icon}
            style={{ height: 30, width: 30, padding: 2, cursor: 'pointer' }}
            alt={b.name}
          />
        </Tooltip>)}
    </div>);
}
