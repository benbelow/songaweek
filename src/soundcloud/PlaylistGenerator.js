import _ from 'lodash';
import SC from 'soundcloud';
import { setup } from '../soundcloud/soundcloud';

let initialized = false;

export const generatePlaylist = async (scUrls, playlistTitle, isPrivate) => {
  await init();
  let soundCloudIds = _.map(scUrls, u => Promise.resolve(getSoundCloudIdFromLink(u)));
  await Promise.all(soundCloudIds)
    .then(async values => {
      console.log('creating playlist...');
      await createPlaylist(values, playlistTitle, isPrivate);
      console.log('created playlist!');
    });
};

export const getPlaylistLinkForThread = async (playlistTitle) => {
  let existingPlaylists = await getExistingPlaylists();
  console.log(existingPlaylists);
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

function createPlaylist(trackIds, playlistTitle, isPrivate) {
  let sharing = isPrivate ? 'private' : 'public';
  const tracks = trackIds.map(id => {
    return { id: id }
  });
  return getExistingPlaylists()
    .then(playlists => {
      console.log(playlists);
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

async function getExistingPlaylists() {
  return SC.connect().then(function () {
    return SC.get("/me/playlists");
  });
}