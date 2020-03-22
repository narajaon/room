import React from 'react';
import axios from 'axios';
import Player from '../components/Player/Player';
import getRandom from '../lib/getRandomSubArray';

function Index({ videos, error }) {
  if (error) return null;

  return <Player videos={videos} />;
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

    return { videos: getRandom(clips, 5) };
  } catch (error) {
    console.log(error.message);
  }

  return { error: true };
};

export default Index;
