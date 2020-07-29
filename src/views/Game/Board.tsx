import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Row, Col, message } from 'antd';

import { boardSelectors, triggerReveal } from 'state';

import Cell from './Cell';

const Board: React.FC = () => {
  const dispatch = useDispatch();
  const board = useSelector(boardSelectors.board);
  const gameStatus = useSelector(boardSelectors.gameStatus);

  useEffect(() => {
    if (gameStatus === 'won') message.info('You won! :)');
    if (gameStatus === 'lost') message.error('You lost! :(');
  }, [gameStatus]);

  return (
    <div style={{ border: '2px solid black' }}>
      {board.cells.map((row, i) => (
        <Row key={i}>
          {row.map((cell, j) => (
            <Col key={j}>
              <Cell cell={cell} disabled={gameStatus !== 'playing'} />
            </Col>
          ))}
        </Row>
      ))}
    </div>
  );
};

export default Board;
