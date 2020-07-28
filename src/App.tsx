import React from 'react';

import { PetStore } from './views';

const App: React.FC = () => {
  return (
    <div>
      <PetStore />
    </div>
  );
};

App.defaultProps = {};

export default App;
