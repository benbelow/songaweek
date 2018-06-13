import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import { Chip, Divider, Paper } from "material-ui";
import Submission from "../../../../../models/submission/submission";
import SubmissionHeader from "./SubmissionHeader";
import muiThemeable from 'material-ui/styles/muiThemeable';
import Flexbox from 'flexbox-react';
import { getHost } from '../../../../../services/UrlParsingService/UrlParsingService';

function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
}

const getHostIconUrl = (trackUrl) => {
    const host = getHost(trackUrl);
    return host && host.logoUrl;
};

class Submission extends Component {
    static propTypes = {
        comment: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = { isExpanded: false };
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
        const submission = new Submission(this.props.comment);
        const genre = submission.genre();
        const link = submission.markdownLink();
        const description = submission.description();

        const descriptionSection = () => {
            return (
                <div>
                    <Divider/>
                    <div style={{ maxWidth: '350px', margin: 'auto', padding: '8px' }}>
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

        const themed = submission.themed();
        const songTitle = submission.title();

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
                        link={submission.link()}
                        onExpand={() => this.setState({ isExpanded: !this.state.isExpanded })}
                        canExpand={!isEmptyOrSpaces(description)}
                        url={this.props.url}
                    />
                    {this.state.isExpanded ? descriptionSection() : undefined}
                    {chipSection()}
                </Paper>
            </Flexbox>
        );
    };
}

export default muiThemeable()(Submission);
