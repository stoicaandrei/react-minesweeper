import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Row, Col, message } from 'antd';

import { boardSelectors, triggerReveal } from 'state';

import Cell from './Cell';

const Board: React.FC = () => {
  const dispatch = useDispatch();
  const board = useSelector(boardSelectors.board);
  const gameStatus = useSelector(boardSelectors.gameStatus);
  const bombsLeft = useSelector(boardSelectors.bombsLeft);
  const startTime = useSelector(boardSelectors.startTime);

  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    setInterval(() => setElapsedTime(val => val + 1), 1000);
  }, [dispatch]);

  useEffect(() => {
    if (gameStatus === 'won') message.info('You won! :)');
    if (gameStatus === 'lost') message.error('You lost! :(');
  }, [gameStatus]);

  useEffect(() => {
    console.log(startTime);
    setElapsedTime(0);
  }, [startTime]);

  return (
    <div>
      <Row>Bombs left: {bombsLeft}</Row>
      <Row>Time: {String(elapsedTime).padStart(3, '0')}</Row>
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
    </div>
  );
};

export default Board;
