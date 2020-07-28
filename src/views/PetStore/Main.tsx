import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { List, Skeleton, Avatar, Button } from 'antd';

import { findPets, deletePet, petSelectors } from 'state';

const PetStore: React.FC = () => {
  const dispatch = useDispatch();
  const pets = useSelector(petSelectors.available);
  const waiting = useSelector(petSelectors.waiting);

  useEffect(() => {
    dispatch(findPets.started({ status: 'available' }));
  }, [dispatch]);

  return (
    <div>
      <List
        // loading={waiting}
        dataSource={pets}
        pagination={{ position: 'bottom' }}
        renderItem={item => (
          <List.Item
            actions={[
              <Button
                type="primary"
                key="delete"
                onClick={() => dispatch(deletePet.started({ id: item.id }))}
              >
                delete
              </Button>,
            ]}
          >
            <Skeleton avatar title={false} loading={false} active>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<a href="https://ant.design">{item.name}</a>}
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  );
};

export default PetStore;
