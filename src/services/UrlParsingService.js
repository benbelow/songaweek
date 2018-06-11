import { Hosts } from '../config/Hosts';

const urlRegex = /(((ftp|https?):\/\/)[-\w@:%_+.~#?,&//=]+)|((mailto:)?[_.\w-]+@([\w][\w-]+\.)+[a-zA-Z]{2,3})/g;

export function extractUrls(string) {
    return string.match(urlRegex);
}

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
    return url.includes("soundcloud.com");
};
const isClypUrl = url => url.includes("https://clyp.it") || url.includes("http://clyp.it");
const isYouTubeUrl = url => (url.includes("youtube.com") || url.includes("youtu.be/")) && !url.includes('playlist?');
const isBandcampUrl = url => url.includes("bandcamp.com");
export const isValidSubmissionUrl = url => getHost(url) !== undefined;
