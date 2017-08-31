import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import App from './components/app';
import NotFound from './components/NotFound';
import Header from './components/Header'

const Routes = (props) => (
  <Router>
    <div>
        <Header/>
        <Switch>
            <Route path="/" exact component={App} />
            <Route component={NotFound}/>
        </Switch>
    </div>
  </Router>
);

export default Routes;