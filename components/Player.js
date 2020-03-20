import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import Clip from './Clip';

const HEIGHT = 500;
const WIDTH = HEIGHT * 1.77;
const MULT = 0.3;
const paddings = [2, 1, 0, 1, 2];

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

function slide(arr, direction, padding) {
  if (!direction) return arr;

  if (direction === 'right') {
    return arr
      .slice(arr.length - padding)
      .concat(arr.slice(0, arr.length - padding));
  }

  return arr.slice(padding).concat(arr.slice(0, padding));
}

function slideCB(id, clips, ref, cb) {
  const byVideoId = videoId => clip => videoId === clip.embed_url;

  return async () => {
    const indexOfClicked = clips.findIndex(byVideoId(id));
    if (indexOfClicked === 2) {
      return;
    }

    let direction;
    if (indexOfClicked > 2) {
      direction = 'left';
    } else if (indexOfClicked < 2) {
      direction = 'right';
    }

    const result = slide(clips, direction, paddings[indexOfClicked]);

    await Promise.all(
      Array.prototype.map.call(ref.current.children, (elem, index) => {
        const nextIndex = result.indexOf(clips[index]);
        const initPos = WIDTH * -(2 - index) * MULT;
        const nextPos = WIDTH * -(2 - nextIndex) * MULT;
        const initScale = 1 - paddings[index] * 0.15;
        const nextScale = 1 - paddings[nextIndex] * 0.15;

        let opacity = [1, 1];

        if (direction === 'left') {
          if ((index === 0 || index === 1) && paddings[indexOfClicked] === 2) {
            opacity = [1, 0];
          } else if (index === 0) {
            opacity = [1, 0];
          }
        } else if (direction === 'right') {
          if ((index === 3 || index === 4) && paddings[indexOfClicked] === 2) {
            opacity = [1, 0];
          } else if (index === 4) {
            opacity = [1, 0];
          }
        }

        const player = elem.animate(
          {
            transform: [
              `translateX(${initPos}px) scale(${initScale}, ${initScale})`,
              `translateX(${nextPos}px) scale(${nextScale}, ${nextScale})`
            ],
            opacity
          },
          {
            duration: 300,
            delay: 100
          }
        );

        return new Promise(res =>
          player.addEventListener('finish', () => {
            res();
            player.removeEventListener('finish', () => null);
          })
        );
      })
    );

    cb(result);
  };
}

function Player({ videos }) {
  const [clips, setClips] = useState(videos.slice(0, 5));
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
            key={clip.embed_url}
            padding={paddings[i]}
            direction={2 - i}
            onClick={slideCB(clip.embed_url, clips, ref, setClips)}
          >
            <Clip clip={clip} width={WIDTH} height={HEIGHT} isMain={i === 2} />
          </Container>
        ))}
      </div>
    </div>
  );
}

export default Player;
