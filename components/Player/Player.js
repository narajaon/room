import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import Clip from './Clip';
import { WIDTH, HEIGHT, MULT, paddings } from './const';
import { clipClickHandler } from './slide';

function Player({ videos }) {
  const [clips, setClips] = useState(videos);
  const ref = useRef();

  return (
    <Player.Container ref={ref}>
      {clips.map((clip, i) => (
        <Player.ClipContainer
          key={clip.slug}
          padding={paddings[i]}
          direction={2 - i}
          onClick={clipClickHandler(clip.slug, clips, ref, setClips)}
        >
          <Clip clip={clip} isMain={i === 2} />
        </Player.ClipContainer>
      ))}
    </Player.Container>
  );
}

Player.ClipContainer = styled.div`
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

Player.Container = styled.div`
  display: flex;
  position: relative;
  right: ${WIDTH / 2}px;
`;

export default Player;
