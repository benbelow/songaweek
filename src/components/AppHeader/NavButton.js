import React from 'react';
import { FlatButton } from 'material-ui';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

const navButtonStyle = {
    backgroundColor: 'white',
    marginLeft: 16,
    marginRight: 16,
    height: '50%',
    marginTop: 'auto',
    marginBottom: 'auto'
};

export const NavButton = (props) => (
    <FlatButton style={navButtonStyle}
                onClick={() => props.history.push(`/${props.path}`)}>
        {props.value}
    </FlatButton>
);

NavButton.PropTypes = {
    value: PropTypes.string,
    path: PropTypes.string,
};

export default withRouter(NavButton);
