import React from 'react';
import axios from 'axios';
import Player from '../components/Player';

// eslint-disable-next-line react/prop-types

function getRandom(arr, n) {
  const result = new Array(n);
  let len = arr.length;
  const taken = new Array(len);
  if (n > len)
    throw new RangeError('getRandom: more elements taken than available');
  while (n--) {
    const x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }

  return result;
}

function Index({ clips, error }) {
  if (error) return null;

  return <Player videos={clips} />;
}

Index.getInitialProps = async ({ req }) => {
  try {
    const { data: games } = await axios.get(
      `${req.api_url}games/top?first=15`,
      {
        headers: { 'Client-ID': req.client_id }
      }
    );

    const res = await Promise.all(
      games.data.map(({ name }) =>
        axios.get(
          `${req.api_url_old}clips/top?game=${name}&limit=10&trending=true`,
          {
            headers: {
              'Client-ID': req.client_id,
              Accept: 'application/vnd.twitchtv.v5+json'
            }
          }
        )
      )
    );

    const clips = res.reduce((acc, { data }) => [...acc, ...data.clips], []);

    return { clips: getRandom(clips, 5) };
  } catch (error) {
    console.log(error.message);
  }

  return { error: true };
};

export default Index;
