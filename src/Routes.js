import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LandingPage from './pages/LandingPage';

import UserHome from './pages/UserHome';

import AdminHome from './pages/AdminHome';

import NotFound from './pages/NotFound';

const Routes = () => (
<BrowserRouter >
    <Switch>
        <Route exact path="/" component={ LandingPage } />
        <Route exact path="/user" component={ UserHome } />
        <Route exact path="/admin" component={ AdminHome } />

        <Route path="*" component={ NotFound } />
    </Switch>
</BrowserRouter>
);

export default Routes;