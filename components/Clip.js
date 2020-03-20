import React from 'react';
import { css } from 'styled-components';

function Clip({ clip, width, height, isMain }) {
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
          src={clip.thumbnail_url}
          css={css`
            width: 100%;
          `}
        />
      )}
    </div>
  );
}

export default Clip;
