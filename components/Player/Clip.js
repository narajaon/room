import React from 'react';
import styled, { css } from 'styled-components';

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(215, 104, 135, 0.4);
  position: absolute;
`;

function Clip({ clip, width, height, isMain, cb, autoplay }) {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: black;
        height: 100%;
        width: 100%;
      `}
    >
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
      {autoplay && <Overlay />}
    </div>
  );
}

export default Clip;
