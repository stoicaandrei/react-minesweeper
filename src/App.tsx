import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';

import { Helmet } from 'react-helmet-async';

import history from './state/history';

import { Game } from './views';

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
      >
        <style>{'body { background-color: #f0f2f5; }'}</style>
      </Helmet>
      <Game />
    </Router>
  );
};

App.defaultProps = {};

export default App;
