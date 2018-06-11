import SC from 'soundcloud';

export function signIn() {
  // initiate auth popup
  SC.connect().then(function() {
    return SC.get('/me');
  })
    .then(function(me) {
      console.log("Logged in as " + me.username);
    });
}

export function setup() {
  if (window.location.hostname === "localhost") {
    console.log("setting up soundcloud...")
    SC.initialize({
      client_id: 'e2faf70422dd2a5bbc0240ade53aab4f',
      redirect_uri: 'http://localhost:8088/callback.html'
    });
  }
  else {
    SC.initialize({
      client_id: 'a3bc76cec61309bd955cdf30999390c4',
      redirect_uri: 'https://reddit-to-soundcloud.firebaseapp.com/callback.html'
    });
  }
}
;
