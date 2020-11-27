import 'regenerator-runtime/runtime';

// eslint-disable-next-line import/prefer-default-export
export const getYoutubeVideoForNode = async (label) => {
  const response = fetch(`http://localhost:3000/content/youtube?label=${label}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
  return response;
};
