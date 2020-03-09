import React, { useState, useMemo, useRef } from 'react';
import styled, { css } from 'styled-components';

const elements = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const clipStyle = css`
  transition: all 500ms linear;

  ${({ value, WIDTH, HEIGHT }) => css`
    background-color: ${`#${((1 << 24) * ((value + 1) / 10) | 0).toString(16)}`};
    width: ${WIDTH}px;
    height: ${HEIGHT}px;
  `}
`;

const flex = css`
  display: flex;
`;

function slide(arr, direction, padding) {
  if (!direction) return arr;

  if (direction === 'right') {
    return arr.slice(arr.length - padding).concat(arr.slice(0, arr.length - padding));
  }

  return arr.slice(padding).concat(arr.slice(0, padding));
}

function Player() {
  const [clips, setClips] = useState(elements.slice(0, 5));
  const ref = useRef();
  const paddings = [2, 1, 0, 1, 2];
  const WIDTH = 500;
  const HEIGHT = 300;

  const slideCB = (index) => () => {
    let direction;

    if (index > 2) {
      direction = 'left';
    } else if (index < 2) {
      direction = 'right';
    }

    return setClips((prev) => slide([...prev], direction, paddings[index]));
  };

  return (
    <div css={flex} ref={ref}>
      {clips.map((el, i) => <div key={el} value={el} WIDTH={WIDTH} HEIGHT={HEIGHT} onClick={slideCB(i)} css={clipStyle}>{el}</div>)}
    </div>
  );
}

export default Player;
