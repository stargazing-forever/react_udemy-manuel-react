import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';

import Admin from './components/Admin';
import Inicio from './components/Inicio';
import Login from './components/Login';
import Menu from './components/Menu';

function App() {
  return (
    <div className="container">
      <Router>
        <Menu />
        <Switch>
          <Route exact path="/" component={Inicio} />
          <Route path="/admin" component={Admin} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>

      
    </div>
  );
}

export default App;
