import React from 'react';

export default () => {
  return (<div>
      <h1>Connect with SoundCloud</h1>
      <body onload="window.setTimeout(window.opener.SC.connectCallback, 1);">
      <p>
        This popup should automatically close in a few seconds
      </p>
      </body>
    </div>
  );

}