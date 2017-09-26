const themeRegex = /:(.*?)\)/;
const weekRegex = /—(.*?)\(/;
const descriptionRegex = /\*\*\n\n([\s\S]*?)##/;

export function theme(thread) {
  const theme = themeRegex.exec(thread.title)[1];
  return theme.trim();
}

export function week(thread) {
  const week = weekRegex.exec(thread.title)[1];
  return week.trim();
}

export function description(thread) {
  const description = descriptionRegex.exec(thread.selftext)[1];
  return description.trim();
}