import _ from 'lodash';
import SC from 'soundcloud';
import { setup } from '../soundcloud/soundcloud';

let initialized = false;
let existingPlaylists;

export const generatePlaylist = async (scUrls, playlistTitle) => {
  await init();
  let soundCloudIds = _.map(scUrls, u => Promise.resolve(getSoundCloudIdFromLink(u)));
  await Promise.all(soundCloudIds)
    .then(async values => {
      console.log('creating playlist...');
      await createPlaylist(values, playlistTitle)
      console.log('created playlist!');
    })
    .then(async () => {
      console.log('caching playlists...')
      existingPlaylists = await getExistingPlaylists();
      console.log(existingPlaylists);
    })
};


// Need to poll SC again for url as the API response doesn't return a payload
// To avoid opening two login tabs, we cache the existing playlists after generation
// This method relies upon that cache to dig out the link to the new playlist
export const getPlaylistLinkForThread = (playlistTitle) => {
  let playlist = existingPlaylists.filter(p => p.title === playlistTitle)[0];
  return playlist.permalink_url;
};

function init() {
  if (!initialized) {
    setup();
    initialized = true;
  }
}

function getSoundCloudIdFromLink(link) {
  return fetch("https://api.soundcloud.com/resolve.json?url=" + link + "&client_id=a3bc76cec61309bd955cdf30999390c4")
    .then(res => res.json())
    .then(track => track.id);
}

function createPlaylist(trackIds, playlistTitle) {
  let sharing = 'public';
  const tracks = trackIds.map(id => {
    return { id: id }
  });
  return getExistingPlaylists()
    .then(playlists => {
      let existingTitles = playlists.map(p => p.title);
      if (!existingTitles.includes(playlistTitle)) {
        SC.connect().then(function () {
          SC.post('/playlists', {
            playlist: { title: playlistTitle, tracks: tracks, sharing: sharing }
          })
        });
      } else {
        const existingList = playlists.filter(p => p.title === playlistTitle)[0];
        const newTracks = tracks.filter(track => {
          return !existingList.tracks.map(t => t.id).includes(track.id)
        });
        const allTracks = newTracks.concat(existingList.tracks);

        SC.put('/playlists/' + existingList.id, {
          playlist: { tracks: allTracks, sharing: sharing }
        });
      }
    })
}

function getExistingPlaylists() {
  return SC.connect().then(function () {
    return SC.get("/me/playlists");
  });
}