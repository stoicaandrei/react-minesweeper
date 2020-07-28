import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from 'antd';

import { triggerReveal, triggerFlag, Cell as CellType } from 'state';

type props = {
  cell: CellType;
};

const Cell: React.FC<props> = ({ cell }) => {
  const dispatch = useDispatch();

  return (
    <Button
      type={cell.is_revealed ? 'primary' : undefined}
      danger={cell.is_revealed && cell.is_bomb}
      style={{ width: 30, height: 30 }}
      onClick={() => dispatch(triggerReveal(cell))}
      onContextMenu={e => {
        e.preventDefault();
        dispatch(triggerFlag(cell));
      }}
    >
      {cell.is_revealed
        ? cell.is_bomb
          ? 'B'
          : cell.value
        : cell.is_flagged
        ? 'F'
        : ' '}
    </Button>
  );
};

export default Cell;
