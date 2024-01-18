import React, { useEffect, useState } from 'react';
import Navbar from './common/Navbar/Navbar';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import Home from './common/Home/Home';
import Events from './common/Events/Events';

const App = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch('/events');
      console.log('fetch_response', response);
      const data = await response.json();
      console.log(data);
      setEvents(data);
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const handleIframeClick = () => {
      console.log('Iframe clicked!');
    };

    window.addEventListener('message', (event) => {
      if (event.data === 'iframeClick') {
        handleIframeClick();
      }
    });

    return () => {
      window.removeEventListener('message', handleIframeClick);
    };
  }, []);

  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/'>
            <Home events={events} />
          </Route>
          <Route exact path='/events'>
            <Events events={events} />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
