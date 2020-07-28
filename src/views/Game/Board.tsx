import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Row, Col, Layout, Button } from 'antd';

import { boardSelectors, triggerReveal } from 'state';

import Cell from './Cell';

const Board: React.FC = () => {
  const dispatch = useDispatch();
  const board = useSelector(boardSelectors.board);

  return (
    <Layout>
      {board.cells.map((row, i) => (
        <Row key={i}>
          {row.map((cell, j) => (
            <Col key={j}>
              <Cell cell={cell} />
            </Col>
          ))}
        </Row>
      ))}
    </Layout>
  );
};

export default Board;
