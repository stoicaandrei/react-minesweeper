import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Row } from 'antd';

import { DIFFICULTIES, Difficulties, EASY } from './constants';

import { initBoard } from 'state';

const DifficultySelector: React.FC = () => {
  const dispatch = useDispatch();

  const [difficulty, setDifficulty] = useState<Difficulties>('Easy');

  useEffect(() => {
    dispatch(initBoard(DIFFICULTIES.Easy));
  }, [dispatch]);

  return (
    <div>
      {Object.keys(DIFFICULTIES).map(diff => (
        <Button
          key={diff}
          onClick={() => {
            setDifficulty(diff as Difficulties);
            dispatch(initBoard(DIFFICULTIES[diff as Difficulties]));
          }}
          type={diff === difficulty ? 'primary' : undefined}
        >
          {diff}
        </Button>
      ))}
    </div>
  );
};

export default DifficultySelector;
