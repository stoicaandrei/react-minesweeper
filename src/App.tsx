import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';

import { Helmet } from 'react-helmet-async';

import history from './state/history';

import { Test } from './views';

const App: React.FC = () => {
  return (
    <Router history={history}>
      <Helmet
        defer={false}
        htmlAttributes={{ lang: 'en' }}
        encodeSpecialCharacters={true}
        defaultTitle={'Minesweeper'}
        titleTemplate={`%s | PM`}
        titleAttributes={{ itemprop: 'name', lang: 'en' }}
      />
      <Test />
    </Router>
  );
};

App.defaultProps = {};

export default App;
