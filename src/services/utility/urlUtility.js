import DOMPurify from "dompurify";

export function makeLinksClickable(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const html = text.replace(urlRegex, (url) => {
    return `<a class="text-dark" href="${url}" target="_blank">${extractDomainFromUrl(
      url
    )}/cut</a>`;
  });
  return DOMPurify.sanitize(html);
}

export function extractDomainFromUrl(urlString) {
  const url = new URL(urlString);
  return `${url.protocol}//${url.hostname}`;
}
