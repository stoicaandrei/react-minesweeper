import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Row } from 'antd';

import { DIFFICULTIES, EASY } from './constants';

import { boardSelectors, initBoard, Difficulty } from 'state';

const DifficultySelector: React.FC = () => {
  const dispatch = useDispatch();

  const dif = useSelector(boardSelectors.difficulty);

  const [difficulty, setDifficulty] = useState<Difficulty>(dif);

  return (
    <div>
      {Object.keys(DIFFICULTIES).map(diff => (
        <Button
          key={diff}
          onClick={() => {
            setDifficulty(diff as Difficulty);
            dispatch(initBoard(DIFFICULTIES[diff as Difficulty]));
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
