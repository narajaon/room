import React, { useState, useMemo } from 'react';
import styled, { css } from 'styled-components';

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
  `}
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: grey;
`;

const PreviewWrapper = styled.div`
  height: 100px;
  width: 200px;
  background-color: green;
  position: relative;
  margin: 0 20px;
`;

function Preview({
  order, isActive, cb, title,
}) {
  return (
    <PreviewWrapper>
      {title}
      <Clip order={order} isActive={isActive} onClick={cb} />
    </PreviewWrapper>
  );
}

const clipList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];

function moveThruCircle(arr, direction, padding) {
  switch (direction) {
  case 'right':
    return arr.slice(padding).concat(arr.slice(0, padding));
  case 'left':
    return arr.slice(arr.length - padding).concat(arr.slice(0, arr.length - padding));
  default:
    return arr;
  }
}

function Player() {
  const index = clipList.indexOf('3');
  const [clips, setClips] = useState(clipList.slice(index, index + 5));
  const cbs = useMemo(() => [
    () => {
      setClips((prev) => moveThruCircle(prev, 'left', 2));
    },
    () => {
      setClips((prev) => moveThruCircle(prev, 'left', 1));
    },
    undefined,
    () => {
      setClips((prev) => moveThruCircle(prev, 'right', 1));
    },
    () => {
      setClips((prev) => moveThruCircle(prev, 'right', 2));
    },
  ]);

  return (
    <Wrapper>
      {clips.map(
        (id, i) => <Preview title={id} key={id} cb={cbs[i]} order={i >= 2 ? clips.length - i : i}/>,
      )}
    </Wrapper>
  );
}

export default Player;
