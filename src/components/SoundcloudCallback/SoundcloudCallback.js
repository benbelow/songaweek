import React from 'react';

class Callback extends React.Component {

  componentDidMount() {
    window.setTimeout(window.opener.SC.connectCallback, 1);
  }

  render() {
    return <div><p>This page should close soon.</p></div>;
  }
}

export default Callback;