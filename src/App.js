import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Layout from './UI/Layout/Layout';
import Login from './Components/Login/Login';
import Logout from './Components/Logout/Logout';
import CreateUser from './Components/CreateUser/CreateUser';

function App() {
  let routes = (
    <Switch>
      <Route path="/login" exact component={Login} />
      <Route path="/logout" exact component={Logout} />
      <Route path="/create-user" exact component={CreateUser} />
      <Route path="/" exact component={Layout} />
      <Redirect to="/" />
    </Switch>
  );

  return (
    <div>
      <header>
      </header>
      { routes }
    </div>
  );
}

export default withRouter(App);
