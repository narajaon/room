import React, {
  useState, useRef, useEffect,
} from 'react';
import { css } from 'styled-components';

const elements = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const clipStyle = css`
  ${({
    value, width, height,
  }) => css`
    background-color: ${`#${((1 << 24) * ((value + 1) / 10) | 0).toString(16)}`};
    width: ${width}px;
    height: ${height}px;
  `}
`;

const flex = css`
  display: flex;
  overflow: hidden;
`;

function slide(arr, direction, padding) {
  if (!direction) return arr;

  if (direction === 'right') {
    return arr.slice(arr.length - padding).concat(arr.slice(0, arr.length - padding));
  }

  return arr.slice(padding).concat(arr.slice(0, padding));
}

function applyTransition(el, width, padding) {
  const transition = [
    { transform: `translate3D(${width * padding}px, 0, 0)` },
    { transform: 'translate3D(0, 0, 0)' },
  ];

  el.animate(transition, {
    duration: 500,
    easing: 'cubic-bezier(0,0,0.32,1)',
  });
}

function Clip({
  value, cb, width, height,
}) {
  useEffect(() => () => {
    console.log('unmounted');
  }, []);

  return <div value={value} width={width} height={height} onClick={cb} css={clipStyle}>{value}</div>;
}

function Player() {
  const paddings = [2, 1, 0, 1, 2];
  const WIDTH = 200;
  const HEIGHT = 150;

  const [clips, setClips] = useState(elements.slice(0, 5));
  const [direction, setDirection] = useState();
  const [clicked, setClicked] = useState();
  const indexOfClicked = clips.indexOf(clicked);
  const [padding, setPadding] = useState(0);
  const ref = useRef();

  const slideCB = (el) => () => {
    setClicked(el);
  };

  useEffect(() => {
    if (clicked === undefined || indexOfClicked === 2) {
      return;
    }

    if (indexOfClicked > 2) {
      setDirection('left');
    } else if (indexOfClicked < 2) {
      setDirection('right');
    }

    setPadding(paddings[indexOfClicked]);
  }, [clicked]);

  useEffect(() => {
    if (clicked === undefined) {
      return;
    }

    setClips((prev) => slide([...prev], direction, paddings[indexOfClicked]));
  }, [direction, padding, indexOfClicked]);

  useEffect(() => {
    Array.prototype.forEach.call(ref.current.children, (el) => {
      if (direction === 'left') {
        applyTransition(el, WIDTH, padding);
      } else if (direction === 'right') {
        applyTransition(el, WIDTH, -padding);
      }
    });
  }, [clicked, direction]);

  return (
    <div css={flex} ref={ref} padding={padding}>
      {clips.map((el, i) => <Clip key={el} value={el} width={WIDTH} height={HEIGHT} direction={direction} padding={padding} index={i} cb={slideCB(el)} />)}
    </div>
  );
}

export default Player;
