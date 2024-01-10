const express = require('express');
const cors = require('cors');

const { google } = require('googleapis');

// Load the service account key JSON file
const keyFile = require('./calendar-410807.json');

// Set up JWT (JSON Web Token) authentication
const jwtClient = new google.auth.JWT({
  email: keyFile.client_email,
  key: keyFile.private_key,
  scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
});

// Authorize the client and make the API request
jwtClient.authorize(async (err, tokens) => {
  if (err) {
    console.error('Error authorizing JWT client:', err);
    return;
  }

  // Create a Google Calendar API client
  const calendar = google.calendar({ version: 'v3', auth: jwtClient });
  try {
    const calendarList = await calendar.calendarList.list();
    console.log('calendarList', calendarList.data.items);
  } catch (error) {
    console.error('Error fetching calendar list:', error.message);
  }

  // Fetch events from the calendar
  calendar.events.list(
    {
      calendarId: 'spath.sz@gmail.com', // Use 'primary' for the primary calendar associated with the service account
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
      timeZone: 'Europe/Budapest',
    },
    (err, res) => {
      if (err) {
        console.error('Error fetching events:', err);
        return;
      }

      const events = res.data.items;
      console.log(res.data);
      console.log('Upcoming events:');
      if (events.length) {
        events.forEach((event) => {
          const start = event.start.dateTime || event.start.date;
          console.log(`${start} - ${event.summary}`);
        });
      } else {
        console.log('No upcoming events found.');
      }
    }
  );
});

const app = express();

// ONLY IF index.js IN THE ROOT FOLDER - (beacuse of MIME Type)
/* app.get('*.js', (req, res) => {
  res.type('.js');
  res.sendFile(path.join(__dirname, req.url));
}); */

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
