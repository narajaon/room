import React, {
  useState, useRef, useEffect,
} from 'react';
import { css } from 'styled-components';

const elements = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const WIDTH = 800;
const HEIGHT = 300;
const MULT = 0.30;
const paddings = [2, 1, 0, 1, 2];

const clipStyle = css`
  position: absolute;
  box-shadow: -1px 6px 16px -6px rgba(0,0,0,0.75);

  ${({
    value, width, height, padding, direction, mult,
  }) => {
    const scale = 1 - (padding * 0.15);

    return css`
      background-color: ${`#${((1 << 24) * ((value + 1) / 10) | 0).toString(16)}`};
      ${''}
      z-index: ${2 - padding};
      width: ${width}px;
      height: ${height}px;
      transform: translateX(${width * -direction * mult}px) scale(${scale}, ${scale});
    `;
  }
}
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
    return arr.slice(arr.length - padding).concat(arr.slice(0, arr.length - padding));
  }

  return arr.slice(padding).concat(arr.slice(0, padding));
}

function Clip({
  value, cb, width, height, padding, direction, mult,
}) {
  useEffect(() => () => {
    console.log('unmounted');
  }, []);

  return <div value={value} direction={direction} mult={mult} padding={padding} width={width} height={height} onClick={cb} css={clipStyle}>value: {value} padding: {padding}</div>;
}

const slideCB = (el, clips, ref, cb) => async () => {
  const indexOfClicked = clips.indexOf(el);

  if (indexOfClicked === 2) return;

  let direction;
  if (indexOfClicked > 2) {
    direction = 'left';
  } else if (indexOfClicked < 2) {
    direction = 'right';
  }

  const result = slide(clips, direction, paddings[indexOfClicked]);

  await Promise.all(Array.prototype.map.call(ref.current.children, (elem, index) => {
    const nextIndex = result.indexOf(clips[index]);
    const initPos = WIDTH * -(2 - index) * MULT;
    const nextPos = WIDTH * -(2 - nextIndex) * MULT;
    const initScale = 1 - (paddings[index] * 0.15);
    const nextScale = 1 - (paddings[nextIndex] * 0.15);

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

    const player = elem.animate({
      transform: [`translateX(${initPos}px) scale(${initScale}, ${initScale})`, `translateX(${nextPos}px) scale(${nextScale}, ${nextScale})`],
      opacity,
    }, {
      duration: 300,
      delay: 100,
      // easing: 'cubic-bezier(0.785, 0.605, 0.165, 0.860)',
    });

    return new Promise((res) => player.addEventListener('finish', () => {
      res();
    }));
  }));

  cb(result);
};

function Player() {
  const [clips, setClips] = useState(elements.slice(0, 5));
  const ref = useRef();

  return (
    <div css={css`
      display: flex;
      justify-content: center;
    `}>
      <div css={flex} ref={ref} height={HEIGHT} width={WIDTH}>
        {clips.map((el, i) => <Clip key={el} value={el} width={WIDTH} height={HEIGHT} padding={paddings[i]} direction={2 - i} mult={MULT} cb={slideCB(el, clips, ref, setClips)} />)}
      </div>
    </div>
  );
}

export default Player;
