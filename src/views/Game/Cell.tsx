import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from 'antd';

import { triggerReveal, triggerFlag, Cell as CellType } from 'state';

type props = {
  cell: CellType;
  disabled: boolean;
};

const Cell: React.FC<props> = ({ cell, disabled }) => {
  const dispatch = useDispatch();

  return (
    <Button
      type={cell.is_revealed ? 'primary' : undefined}
      danger={cell.is_revealed && cell.is_bomb}
      style={{
        height: 30,
        width: 30,
        borderRadius: 0,
      }}
      onMouseDown={e => {
        e.preventDefault();
        if (disabled) return;
        if (e.button === 0) dispatch(triggerReveal(cell));
      }}
      onContextMenu={e => {
        e.preventDefault();
        if (disabled) return;
        dispatch(triggerFlag(cell));
      }}
    >
      {cell.is_revealed
        ? cell.is_bomb
          ? 'B'
          : cell.value
          ? cell.value
          : ' '
        : cell.is_flagged
        ? 'F'
        : ' '}
    </Button>
  );
};

export default memo(Cell);
