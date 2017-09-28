import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import { Chip, Divider, Paper } from "material-ui";
import Formatter from "./Formatter";
import SubmissionHeader from "./SubmissionHeader";
import { getHostIconUrl } from "./HostIcons";
import muiThemeable from 'material-ui/styles/muiThemeable';
import Flexbox from 'flexbox-react';

function isEmptyOrSpaces(str) {
  return str === null || str.match(/^ *$/) !== null;
}

class Submission extends Component {
  static propTypes = {
    comment: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { isExpanded: false }
  }

  chipStyle = {
    margin: '8px',
  };

  chipContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  };

  render() {
    const formatter = new Formatter(this.props.comment);
    const genre = formatter.genre();
    const link = formatter.markdownLink();
    const description = formatter.description();

    const descriptionSection = () => {
      return (
        <div>
          <Divider/>
          <div style={{ maxWidth: '350px', margin: 'auto' }}>
            <ReactMarkdown source={description}/>
          </div>
        </div>
      );
    };

    const chipSection = () => {
      return (
        <div>
          <Divider/>
          <div style={this.chipContainerStyle}>
            {genre ? <Chip style={this.chipStyle}
                           backgroundColor={this.props.muiTheme.palette.primary2Color}> {genre} </Chip> : undefined}
            <Chip
              style={this.chipStyle}
              backgroundColor={themed ? this.props.muiTheme.palette.primary1Color : this.props.muiTheme.palette.disabledColor}
            >
              {themed ? 'Themed' : 'Not Themed'}
            </Chip>
          </div>
        </div>
      );
    };

    const themed = formatter.themed();
    const songTitle = formatter.title();

    if (typeof link === 'undefined' || !link) {
      return null;
    }
    return (
      <Flexbox margin="8px" marginRight='auto' marginLeft='auto'>
        <Paper>
          <SubmissionHeader
            style={{ position: 'absolute' }}
            title={songTitle}
            subtitle={this.props.author}
            imageSrc={getHostIconUrl(link)}
            link={formatter.link()}
            onExpand={() => this.setState({ isExpanded: !this.state.isExpanded })}
            canExpand={!isEmptyOrSpaces(description)}
            url={this.props.url}
          />
          {this.state.isExpanded ? descriptionSection() : undefined}
          {chipSection()}
        </Paper>
      </Flexbox>
    )
  };
}

export default muiThemeable()(Submission);