import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Row as AntdRow, Button, Layout } from 'antd';

import Board from './Board';
import DifficultySelector from './DifficultySelector';

import { resetBoard } from 'state';

const Game: React.FC = () => {
  const dispatch = useDispatch();

  const Row: React.FC<{ paddingTop: number }> = props => (
    <AntdRow
      justify="center"
      style={{
        textAlign: 'center',
        paddingTop: props.paddingTop,
      }}
    >
      {props.children}
    </AntdRow>
  );

  return (
    <Layout style={{ height: '100vh' }}>
      <Row paddingTop={30}>
        <h1>Minesweeper</h1>
      </Row>
      <Row paddingTop={10}>
        <Button onClick={() => dispatch(resetBoard({}))}>Reset</Button>
      </Row>
      <Row paddingTop={0}>
        <Board />
      </Row>
      <Row paddingTop={10}>
        <DifficultySelector />
      </Row>
    </Layout>
  );
};

export default Game;
