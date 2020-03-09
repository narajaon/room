import React, {
  useState, useRef, useEffect,
} from 'react';
import { css } from 'styled-components';

const elements = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const clipStyle = css`
  transition: all 200ms linear;

  ${({
    value, WIDTH, HEIGHT,
  }) => css`
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

function applyTransition(el, width, padding) {
  el.animate([
    { transform: `translateX(${width * padding}px)` },
    { transform: 'translateX(0)' },
  ], {
    duration: 300,
    easing: 'cubic-bezier(0,0,0.32,1)',
  });
}

function Player() {
  const paddings = [2, 1, 0, 1, 2];
  const WIDTH = 200;
  const HEIGHT = 150;

  const [clips, setClips] = useState(elements.slice(0, 5));
  const [direction, setDirection] = useState();
  const [clicked, setClicked] = useState();
  const [padding, setPadding] = useState(0);
  const ref = useRef();

  const slideCB = (el) => () => {
    setClicked(el);
  };

  console.log('clicked', clicked);
  console.log('indexOf', clips.indexOf(clicked));
  console.log('padding', padding);

  useEffect(() => {
    if (clicked === undefined) {
      return;
    }

    if (clips.indexOf(clicked) > 2) {
      setDirection('left');
    } else if (clips.indexOf(clicked) < 2) {
      setDirection('right');
    } else {
      return;
    }

    setPadding(paddings[clips.indexOf(clicked)]);
  }, [clicked]);

  useEffect(() => {
    if (clicked === undefined) {
      return;
    }

    setClips((prev) => slide([...prev], direction, paddings[clips.indexOf(clicked)]));
    Array.prototype.forEach.call(ref.current.children, (el) => {
      if (direction === 'left') {
        applyTransition(el, WIDTH, padding);
      } else if (direction === 'right') {
        applyTransition(el, WIDTH, -padding);
      }
    });
  }, [direction, padding]);

  return (
    <div css={flex} ref={ref} padding={padding} WIDTH={WIDTH}>
      {clips.map((el) => <div key={el} value={el} WIDTH={WIDTH} HEIGHT={HEIGHT} onClick={slideCB(el)} css={clipStyle}>{el}</div>)}
    </div>
  );
}

export default Player;
