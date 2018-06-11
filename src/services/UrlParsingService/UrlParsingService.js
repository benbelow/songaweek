import _ from 'lodash';

import { Hosts } from '../../config/Hosts';

const urlRegex = /(((ftp|https?):\/\/)[-\w@:%_+.~#?,&//=]+)|((mailto:)?[_.\w-]+@([\w][\w-]+\.)+[a-zA-Z]{2,3})/g;

export function extractUrls(string) {
    return string.match(urlRegex);
}

export const getHost = url => {
    const host = _.find(Hosts, h => h.urlRegex.test(url));
    if (!host) {
        console.log(`Could not find host for following submission: ${url}`)
    }
    return host;
};

export const isSoundCloudUrl = url => url.includes("soundcloud.com");
export const isValidSubmissionUrl = url => getHost(url) !== undefined;
