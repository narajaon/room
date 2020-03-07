import React, { useState, useMemo, useRef } from 'react';
import styled, { css } from 'styled-components';
import FLIP from '../lib/flip';

const Clip = styled.div`
  height: 200px;
  width: 400px;
  background-color: red;
  margin: 10px;
  position: absolute;
  /* should be (Wc - Wp) / 2 */
  left: -100px;
  box-shadow: 0px -1px 24px 0px rgba(0,0,0,0.75);

  ${({ isActive }) => isActive && css`
    background-color: yellow;
    border: 1px solid black;
  `}

  ${({ order }) => css`
    z-index: ${order};
    height: ${200 + order * 100}px;
    width: ${400 + order * 100}px;
  `}

  &.ongoing-flip {
    position: relative;
    transform: translateX(100px)
    /* left: 100px; */
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  ::before {
    content: ${({ order }) => order}
  }
`;

const PreviewWrapper = styled.div`
  height: 500px;
  width: 1000px;
  background-color: green;
  position: relative;
  margin: 0 20px;
`;

function Preview({
  order, isActive, cb, title, className,
}) {
  return (
    <PreviewWrapper className={className}>
      {title}
      <Clip order={order} isActive={isActive} onClick={cb} key={title}>{title}</Clip>
    </PreviewWrapper>
  );
}

const clipList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];

function moveThruCircle(direction, padding) {
  return (arr) => {
    switch (direction) {
    case 'right':
      return arr.slice(padding).concat(arr.slice(0, padding));
    case 'left':
      return arr.slice(arr.length - padding).concat(arr.slice(0, arr.length - padding));
    default:
      return arr;
    }
  };
}

function flipLeft(target) {
  console.log('left');

  FLIP(target,
    ({ first, last }) => ({ transform: `translateX(${first.right - last.right}px)` }),
    () => ({ transform: 'translateX(0)' }),
    { duration: 100, easing: 'cubic-bezier(0,0,0.32,1)' });
}

function flipRight(target) {
  console.log('right');

  FLIP(target,
    ({ first, last }) => ({ transform: `translateX(${first.right - last.right}px)` }),
    () => ({ transform: 'translateX(0)' }),
    { duration: 100, easing: 'cubic-bezier(0,0,0.32,1)' });
}

function flipAll(elements, cb) {
  [].forEach.call(elements, (el) => {
    cb(el);
  });
}

function Player() {
  const index = clipList.indexOf('3');
  const [clips, setClips] = useState(clipList.slice(index, index + 5));
  const ref = useRef();
  const cbs = useMemo(() => [
    ({ target }) => {
      // flipAll(ref.current.children, flipLeft);
      flipLeft(target);
      setClips(moveThruCircle('left', 2));
    },
    ({ target }) => {
      // flipAll(ref.current.children, flipLeft);
      flipLeft(target);
      setClips(moveThruCircle('left', 1));
    },
    undefined,
    ({ target }) => {
      // flipAll(ref.current.children, flipRight);
      flipRight(target);
      setClips(moveThruCircle('right', 1));
    },
    ({ target }) => {
      // flipAll(ref.current.children, flipRight);
      flipRight(target);
      setClips(moveThruCircle('right', 2));
    },
  ], []);

  // const cb2 = (i) => () => setClips((prev) => prev.filter((a, ind) => ind !== i));

  return (
    <Wrapper ref={ref}>
      {clips.map(
        (id, i) => <Preview
          key={id}
          title={id}
          cb={cbs[i]}
          order={i >= 2 ? clips.length - i : i}/>,
      )}
    </Wrapper>
  );
}

export default Player;
