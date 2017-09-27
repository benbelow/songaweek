import React from 'react';
import PropTypes from 'prop-types';
import Flexbox from 'flexbox-react';
import {Avatar, ListItem, RaisedButton} from "material-ui";

const SubmissionHeader = (props) => {
  const buttonStyle = {marginLeft: '4px', marginRight: '4px'};
  const openLink = () => window.open(props.link, '_blank');
  return (
    <Flexbox flexDirection='row' alignItems='flex-start'>
      <ListItem
        style={{textAlign: 'left'}}
        leftAvatar={<Avatar size={40} src={props.imageSrc}/>}
        primaryText={props.title}
        secondaryText={props.subtitle}
        onClick={openLink}
      />
      <Flexbox style={{margin: 'auto', padding: '8px'}} justifyContent="center" height='100%'>
        <RaisedButton
          style={buttonStyle}
          label="LISTEN"
          primary
          onClick={openLink}
        />
        <RaisedButton
          style={buttonStyle}
          label="MORE"
          secondary
          onClick={props.onExpand}
          disabled={!props.canExpand}
        />
        <RaisedButton
          style={buttonStyle}
          label="OPEN"
          secondary
          onClick={() => window.open(props.url)}
        />
      </Flexbox>
    </Flexbox>

  );
};

SubmissionHeader.defaultProps = {
  canExpand: false,
}

SubmissionHeader.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  onExpand: PropTypes.func.isRequired,
  canExpand: PropTypes.bool,
  url: PropTypes.string.isRequired,
};

export default SubmissionHeader;