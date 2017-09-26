const urlRegex = /(((ftp|https?):\/\/)[-\w@:%_+.~#?,&//=]+)|((mailto:)?[_.\w-]+@([\w][\w-]+\.)+[a-zA-Z]{2,3})/g;

export function containsUrl(string) {
  return urlRegex.test(string);
}

export function extractUrls(string) {
  return string.match(urlRegex);
}