import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Board from './Board';

import { initBoard } from 'state';

const Game: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initBoard({ rows: 3, cols: 3, bombs: 1 }));
  }, [dispatch]);

  return (
    <div>
      <Board />
    </div>
  );
};

export default Game;
