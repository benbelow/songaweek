import {Hosts} from './Hosts';

export const isValidSubmissionUrl = url => {
  return getHost(url) !== undefined;
};

export const getHost = url => {
  if (isSoundCloudUrl(url)) {
    return Hosts.SOUNDCLOUD;
  } else if (isClypUrl(url)) {
    return Hosts.CLYP;
  } else if (isYouTubeUrl(url)) {
    return Hosts.YOUTUBE;
  } else if (isBandcampUrl(url)) {
    return Hosts.BANDCAMP;
  }
};

export const isSoundCloudUrl = url => {
  return url.includes("soundcloud.com")
};

const isClypUrl = url => {
  return url.includes("https://clyp.it") || url.includes("http://clyp.it");
};

const isYouTubeUrl = url => {
  return (url.includes("youtube.com") || url.includes("youtu.be/")) && !url.includes('playlist?');
};

const isBandcampUrl = url => {
  return url.includes("bandcamp.com");
};