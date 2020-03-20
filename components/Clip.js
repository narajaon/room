import React, { useEffect, useRef } from 'react';
import { css } from 'styled-components';

function Clip({ clip, width, height, isMain }) {
  const iframeRef = useRef();

  useEffect(() => {
    if (isMain) {
      iframeRef.current.addEventListener('load', () => {
        console.log('LOADED');
        iframeRef.current.removeEventListener('load', () => null);
      });
    }
  }, [clip]);

  return (
    <div
      css={css`
        position: absolute;
      `}
    >
      {isMain ? (
        <iframe
          ref={iframeRef}
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
            height: 100%;
            width: ${width};
          `}
        />
      )}
    </div>
  );
}

export default Clip;
