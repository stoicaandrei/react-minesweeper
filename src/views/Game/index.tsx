import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Row as AntdRow, Button, Layout } from 'antd';

import Board from './Board';
import DifficultySelector from './DifficultySelector';

import { resetBoard, boardSelectors, initBoard } from 'state';
import { EASY } from './constants';

const Game: React.FC = () => {
  const dispatch = useDispatch();
  const { cols } = useSelector(boardSelectors.board);

  useEffect(() => {
    dispatch(initBoard(EASY));
  }, [dispatch]);

  const Row: React.FC<{
    paddingTop: number;
    justifyStart?: boolean;
  }> = props => (
    <AntdRow
      justify={props.justifyStart ? 'start' : 'center'}
      style={{
        textAlign: 'center',
        paddingTop: props.paddingTop,
      }}
    >
      {props.children}
    </AntdRow>
  );

  return (
    <div>
      <Row paddingTop={30}>
        <h1>Minesweeper</h1>
      </Row>
      <Row paddingTop={10}>
        <Button onClick={() => dispatch(resetBoard({}))}>Reset</Button>
      </Row>
      <Row paddingTop={0} justifyStart={window.innerWidth < 500 && cols > 10}>
        <Board />
      </Row>
      <Row paddingTop={10}>
        <DifficultySelector />
      </Row>
    </div>
  );
};

export default Game;
