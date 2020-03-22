import React from 'react';
import styled, { css } from 'styled-components';

function Clip({ clip, width, height, isMain }) {
  return (
    <Clip.Container>
      {isMain ? (
        <iframe
          src={clip.embed_url}
          height={height}
          width={width}
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
