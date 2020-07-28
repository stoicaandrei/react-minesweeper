import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Row, Col, Layout, Button } from 'antd';

import { boardSelectors, triggerReveal } from 'state';

const Board: React.FC = () => {
  const dispatch = useDispatch();
  const board = useSelector(boardSelectors.board);

  return (
    <Layout>
      {board.cells.map((row, i) => (
        <Row key={i}>
          {row.map((cell, j) => (
            <Col key={j}>
              <Button
                type={cell.is_revealed ? 'primary' : undefined}
                style={{ width: 30, height: 30 }}
                onClick={() => dispatch(triggerReveal({ x: i, y: j }))}
              >
                {cell.value}
              </Button>
            </Col>
          ))}
        </Row>
      ))}
    </Layout>
  );
};

export default Board;
