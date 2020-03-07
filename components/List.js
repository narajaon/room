import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import FLIP from '../lib/flip';

const Element = styled.div`
  height: 100px;
  margin: 5px;
  text-align: center;
  border: 1px solid red;
`;

function List() {
  const [elements, setElements] = useState([0, 1]);
  const ref = useRef();

  useEffect(() => {
    console.log(ref.current.children);

    [].forEach.call(ref.current.children, (el) => {
      FLIP(el);
    });
  });

  return (
    <div>
      <button onClick={() => {
        FLIP(ref.current);
        setElements((prev) => [prev[1], prev[0]]);
      }}>FLIP</button>
      <div css={css`
        .totes-at-the-end {
          top: 100px;
          position: relative;
        }
      `}>
        <Element ref={ref}>ELEMENT</Element>
      </div>
    </div>
  );
}

export default List;
