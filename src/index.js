import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Search from './components/Search';
import User from './components/User';
import Followers from './components/Followers';
import Following from './components/Following';
import Repositories from './components/Repositories';
import Trend from './components/Trend';

const routes = (
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/" exact component={Search} />
        <Route path="/user/:username" component={User} />
        <Route path="/followers/:username" component={Followers} />
        <Route path="/following/:username" component={Following} />
        <Route path="/repositories/:username" component={Repositories} />
        <Route path="/trend" component={Trend} />
      </Switch>
    </Router>
  </React.StrictMode>
);

ReactDOM.render(routes, document.getElementById('root'));
