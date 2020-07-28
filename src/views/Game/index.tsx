import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Board from './Board';

import { initBoard } from 'state';

const Game: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initBoard({ rows: 10, cols: 10, bombs: 10 }));
  }, [dispatch]);

  return (
    <div>
      <Board />
    </div>
  );
};

export default Game;
