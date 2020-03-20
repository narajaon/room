import React from 'react';
import axios from 'axios';
import Player from '../components/Player';

// eslint-disable-next-line react/prop-types
function Index({ clips }) {
  return <Player videos={clips} />;
}

Index.getInitialProps = async ({ req }) => {
  const { data: games } = await axios.get(`${req.api_url}games/top?first=2`, {
    headers: { 'Client-ID': req.client_id }
  });

  const res = await Promise.all(
    games.data.map(({ id }) =>
      axios.get(`${req.api_url}clips?game_id=${id}&first=3`, {
        headers: { 'Client-ID': req.client_id }
      })
    )
  );

  const clips = res.reduce((acc, { data }) => [...acc, ...data.data], []);

  return { clips };
};

export default Index;
