import React from 'react';
import styled, { css } from 'styled-components';
import { WIDTH, HEIGHT } from './const';

function Clip({ clip, isMain }) {
  return (
    <Clip.Container>
      {isMain ? (
        <iframe
          src={clip.embed_url}
          height={HEIGHT}
          width={WIDTH}
          frameBorder="0"
          scrolling="no"
          allowFullScreen={false}
          preload="auto"
        />
      ) : (
        <img
          src={clip.thumbnails.medium}
          css={css`
            width: 100%;
          `}
        />
      )}
    </Clip.Container>
  );
}

Clip.Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  height: 100%;
  width: 100%;
`;

export default Clip;
