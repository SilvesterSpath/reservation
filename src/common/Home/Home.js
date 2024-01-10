// Home.js

import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    // Fetch data when the component mounts
    fetch('http://localhost:3000/getEvents?date=2010-10-10')
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error('Error:', error));
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts
  return (
    <iframe
      id='calendar'
      title='Google Calendar'
      src='https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Europe%2FBudapest&src=c3BhdGguc3pAZ21haWwuY29t&src=ZW4uaHVuZ2FyaWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=aHUuaHVuZ2FyaWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%237986CB&color=%230B8043&color=%230B8043'
      width='800'
      height='600'
      frameBorder='0'
      scrolling='no'
    />
  );
};

export default Home;
