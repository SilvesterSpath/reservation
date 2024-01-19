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
import Modal from 'react-modal';

const App = () => {
  Modal.setAppElement('#root');
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/events');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const events = await fetchEvents();

      setEvents(events);
    };

    fetchData();
  }, []);

  const handleRefresh = async () => {
    const events = await fetchEvents();
    setEvents(events);
  };

  return (
    <>
      <Router>
        <Navbar />
        <button onClick={handleRefresh}>Refresh</button>
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
