// Example books URL: https://www.google.co.uk/books/edition/The_The_HTML_and_CSS_Workshop/gVjBDwAAQBAJ?hl=en&gbpv=0
// Last path param is the ID
export const extractGoogleBooksIdFromUrl = (url) => {
    // Check if param url is a valid url
    try {
        url = new URL(url);
      } catch (_) {
        return false;  
      }
    const urlObj = new URL(url);
    const searchParams = urlObj.pathname;
    const paramArray = searchParams.toString().split('/');
    const lastParam = paramArray.pop();

    // Match any string that is exactly 12 characters and contains only alphanumeric characters
    const regex = new RegExp('^[A-Za-z0-9]{12}$')
    if (lastParam.match(regex)) {
        return lastParam;
    } else {
        return false;
    }
}   

// Regex for matching a youtube id in a youtube url
// https://stackoverflow.com/questions/6903823/regex-for-youtube-id
export const extractYoutubeIdFromUrl = (url) => {
    try {
        new URL(url);
      } catch (_) {
        return false;  
      }
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gi;
    const regex = new RegExp(youtubeRegex);
    if (!url.match(regex)) {
        return false;
    }
    const matchArray = [...url.matchAll(regex)].pop();
    return matchArray[1];
}

// Generates a string of node labels from an array of nodes
// Using the keyword tutorial and appending node labels results in more accurate searches
export const generateQueryStringFromNodes = (nodes) => {
  let queryString = 'tutorial+'
  nodes.forEach((node, index) => {
    if (index == 0) {
    queryString += node.label;
    } else {
      queryString += '+' + node.label;
    }
  })
  return queryString;
}