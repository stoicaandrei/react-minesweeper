import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Row as AntdRow, Col, Layout } from 'antd';

import Board from './Board';

import { initBoard } from 'state';

const Game: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initBoard({ rows: 10, cols: 10, bombs: 10 }));
  }, [dispatch]);

  const Row: React.FC = props => (
    <AntdRow justify="center" style={{ textAlign: 'center', paddingTop: 30 }}>
      {props.children}
    </AntdRow>
  );

  return (
    <Layout style={{ height: '100vh' }}>
      <Row>
        <h1>Minesweeper</h1>
      </Row>
      <Row>
        <Board />
      </Row>
    </Layout>
  );
};

export default Game;
