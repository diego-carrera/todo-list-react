import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './containers/Home';
import NotFound from './containers/NotFound';
import Login from './containers/Login';
import AppliedRoute from './components/AppliedRoute';
import Register from './containers/Register';

const Routes = ({appProps}) => {
  return(
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps} />
      <AppliedRoute path="/login" exact component={Login} appProps={appProps} />
      <AppliedRoute path="/register" exact component={Register} appProps={appProps} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
