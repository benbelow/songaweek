import {getHost} from '../../../../services/UrlParsingService/UrlParsingService'

export const getHostIconUrl = (trackUrl) => {
  const host = getHost(trackUrl);
  return host.logoUrl;
};
