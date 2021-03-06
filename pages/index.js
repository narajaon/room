import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Player from '../components/Player/Player';
import getRandom from '../lib/getRandomSubArray';

function Index({ videos, error }) {
  if (error) return null;

  return (
    <Index.Container>
      <Player videos={videos} />;
    </Index.Container>
  );
}

Index.getInitialProps = async ({ req }) => {
  try {
    const { data: oAuth2 } = await axios.post(
      `https://id.twitch.tv/oauth2/token?client_id=${req.client_id}&client_secret=${req.client_secret}&grant_type=client_credentials`
    );

    const { data: games } = await axios.get(
      `${req.api_url}/games/top?first=15`,
      {
        headers: {
          'Client-ID': req.client_id,
          Authorization: `Bearer ${oAuth2.access_token}`
        }
      }
    );

    const res = await Promise.all(
      games.data.map(({ name }) =>
        axios.get(
          `${req.api_url_old}/clips/top?game=${name}&limit=10&trending=true`,
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

Index.Container = styled.div`
  display: flex;
  justify-content: center;
`;

export default Index;
