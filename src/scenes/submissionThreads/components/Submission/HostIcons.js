import {getHost} from '../../../../services/UrlParsingService'
import {Hosts} from "../../../../config/Hosts";

const scLogoUrl = "https://images.vexels.com/media/users/3/137412/isolated/preview/1802b9d8ce3c819eebe90a86bbb61077-soundcloud-icon-logo-by-vexels.png";
const clypLogoUrl ="https://static.clyp.it/site/images/favicons/apple-touch-icon-precomposed.png";
const youtubeLogoUrl = "https://seeklogo.com/images/Y/youtube-icon-logo-05A29977FC-seeklogo.com.png";
const bandcampLogoUrl = "https://vignette2.wikia.nocookie.net/mlpfanart/images/0/07/Bandcamp_logo.png/revision/latest?cb=20120804030608";

const urls = new Map([
  [Hosts.SOUNDCLOUD, scLogoUrl],
  [Hosts.CLYP, clypLogoUrl],
  [Hosts.YOUTUBE, youtubeLogoUrl],
  [Hosts.BANDCAMP, bandcampLogoUrl],
]);

export const getHostIconUrl = (trackUrl) => {
  const host = getHost(trackUrl);
  return urls.get(host);
};
