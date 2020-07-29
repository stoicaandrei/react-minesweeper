import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Row, Layout } from 'antd';

import Board from './Board';

import { initBoard } from 'state';

const Game: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initBoard({ rows: 10, cols: 10, bombs: 10 }));
  }, [dispatch]);

  return (
    <Layout style={{ height: '100vh' }}>
      <Row justify="center" style={{ paddingTop: 100 }}>
        <Board />
      </Row>
    </Layout>
  );
};

export default Game;
