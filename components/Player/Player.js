import React, { useState, useRef, useContext, createContext } from 'react';
import styled, { css } from 'styled-components';
import Clip from './Clip';
import { WIDTH, HEIGHT, MULT, paddings } from './const';
import { clipClickHandler, playNext } from './slide';

const Container = styled.div`
  position: absolute;
  box-shadow: -1px 6px 16px -6px rgba(0, 0, 0, 0.75);

  ${({ padding, direction }) => {
    const scale = 1 - padding * 0.15;

    return css`
      background-color: black;
      z-index: ${2 - padding};
      width: ${WIDTH}px;
      height: ${HEIGHT}px;
      transform: translateX(${WIDTH * -direction * MULT}px)
        scale(${scale}, ${scale});
    `;
  }}
`;

const flex = css`
  display: flex;
  position: relative;

  ${({ width }) => css`
    right: ${width / 2}px;
  `}
`;

function Player({ videos }) {
  const [autoplay, setAutoplay] = useState(true);
  const [clips, setClips] = useState(videos);
  const ref = useRef();

  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
      `}
    >
      <div css={flex} ref={ref} height={HEIGHT} width={WIDTH}>
        {clips.map((clip, i) => (
          <Container
            key={clip.slug}
            padding={paddings[i]}
            direction={2 - i}
            onMouseEnter={() => setAutoplay(false)}
            onMouseLeave={() => setAutoplay(true)}
            onClick={clipClickHandler(clip.slug, clips, ref, setClips)}
          >
            <Clip
              clip={clip}
              width={WIDTH}
              height={HEIGHT}
              isMain={i === 2}
              cb={playNext(clips, ref, setClips)}
              autoplay={autoplay}
            />
          </Container>
        ))}
      </div>
      <span>{autoplay}</span>
    </div>
  );
}

export default Player;
