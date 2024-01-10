import React from 'react';
import Navbar from './common/Navbar/Navbar';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import Home from './common/Home/Home';

const h1 = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default h1;
