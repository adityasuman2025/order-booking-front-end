import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LandingPage from './components/LandingPage';
import NotFound from './components/NotFound';

const Routes = () => (
  <BrowserRouter >
    <Switch>
      <Route exact path="/" component={ LandingPage } />

      <Route path="*" component={ NotFound } />
    </Switch>
  </BrowserRouter>
);

export default Routes;