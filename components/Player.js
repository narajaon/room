import React, { useState } from 'react';
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

function Preview({ order = 0, isActive, cb }) {
  return (
    <PreviewWrapper>
      <Clip order={order} isActive={isActive} onClick={cb} />
    </PreviewWrapper>
  );
}

const clipList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];

function Player() {
  const [isActive, setIsActive] = useState(2);
  const [start, setStart] = useState(0);
  const [clips, setClips] = useState(clipList.slice(start, 5));

  const toggleState = (id) => () => {
    console.log(id);

    setIsActive(id);
  };

  return (
    <Wrapper>
      {clips.map(
        (id, i) => <Preview key={id} cb={toggleState(id)} order={i >= 2 ? clips.length - i : i}/>,
      )}
    </Wrapper>
  );
}

export default Player;
