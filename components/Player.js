import React, {
  useState, useRef, useEffect,
} from 'react';
import { css } from 'styled-components';

const elements = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const clipStyle = css`
  position: absolute;

  ${({
    value, width, height, padding, direction,
  }) => {
    const scale = 1 - (padding * 0.15);

    return css`
      border: 3px solid ${`#${((1 << 24) * ((value + 1) / 10) | 0).toString(16)}`};
      z-index: ${2 - padding};
      width: ${width}px;
      height: ${height}px;
      transform: scale(${scale}, ${scale});
      transform: translateX(${width * -direction * 0.25}px) scale(${scale}, ${scale});

      &.translate-x {
        transform: translateX(${width * direction * 0.25}px) scale(${scale + 0.10}, ${scale + 0.10});
      }
    `;
  }
}
`;

const flex = css`
  display: flex;
  border: 1px red solid;
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
  value, cb, width, height, padding, direction,
}) {
  useEffect(() => () => {
    console.log('unmounted');
  }, []);

  return <div value={value} direction={direction} padding={padding} width={width} height={height} onClick={cb} css={clipStyle}>value: {value} padding: {padding}</div>;
}

function Player() {
  const WIDTH = 600;
  const HEIGHT = 300;
  const paddings = [2, 1, 0, 1, 2];

  const [clips, setClips] = useState(elements.slice(0, 5));
  const ref = useRef();

  const slideCB = (el, d, i) => ({ target }) => {
    const indexOfClicked = clips.indexOf(el);

    if (indexOfClicked === 2) return;

    let direction;
    if (indexOfClicked > 2) {
      direction = 'left';
    } else if (indexOfClicked < 2) {
      direction = 'right';
    }

    const first = target.getBoundingClientRect();

    target.classList.add('translate-x');

    const last = target.getBoundingClientRect();

    const invert = first.left - last.left;
    const deltaW = first.width / last.width;
    const deltaH = first.height / last.height;
    console.table({ first, last });

    const player = target.animate([
      { transform: `translateX(${invert}px) scale(${deltaW}, ${deltaH})` },
      { transform: 'translateX(0)' },
    ], {
      duration: 300,
      easing: 'cubic-bezier(0,0,0.32,1)',
    });

    player.addEventListener('finish', () => {
      setClips((prev) => slide([...prev], direction, paddings[indexOfClicked]));
    });
  };

  return (
    <div css={css`
      display: flex;
      justify-content: center;
    `}>
      <div css={flex} ref={ref} height={HEIGHT} width={WIDTH}>
        {clips.map((el, i) => <Clip key={el} value={el} width={WIDTH} height={HEIGHT} padding={paddings[i]} direction={2 - i} cb={slideCB(el, 2 - i, i)} />)}
      </div>
    </div>
  );
}

export default Player;
