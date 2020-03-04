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

function Player() {
  const [isActive, setIsActive] = useState(2);

  const toggleState = (id) => () => {
    console.log(id);

    setIsActive(id);
  };

  return (
    <Wrapper>
      <Preview isActive={isActive === 0} cb={toggleState(0)} order={0}/>
      <Preview isActive={isActive === 1} cb={toggleState(1)} order={1}/>
      <Preview isActive={isActive === 2} cb={toggleState(2)} order={2}/>
      <Preview isActive={isActive === 3} cb={toggleState(3)} order={1}/>
      <Preview isActive={isActive === 4} cb={toggleState(4)} order={0}/>
    </Wrapper>
  );
}

export default Player;
