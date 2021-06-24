import React from 'react';
import { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';


const Login = lazy(() => import('../pages/Login/Login'));
const Tracklist = lazy(() => import('../components/Player/Tracklist/Tracklist'));
const Routes = () => (
  <Switch>
    <Route
      path='/login'
      exact
      render={() => (
        <Suspense fallback={<div>Loading...</div>}>
          <Login />
        </Suspense>
      )}
    />
    <Route
      path='/'
      exact
      render={() => (
        <Suspense fallback={<div>Loading...</div>}>
          <Tracklist />
        </Suspense>
      )}
    />
    <Redirect to='/' />
  </Switch>
);

export default Routes;
