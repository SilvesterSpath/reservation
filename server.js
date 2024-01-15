const express = require('express');
const cors = require('cors');
/* const { google } = require('googleapis');
const keyFile = require('./config/calendar-410807.json'); */
const calendar = require('./calendar');

const app = express();

// ONLY IF index.js IN THE ROOT FOLDER - (beacuse of MIME Type)
/* app.get('*.js', (req, res) => {
  res.type('.js');
  res.sendFile(path.join(__dirname, req.url));
}); */

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5000'],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

let calendarEvents;

async function main() {
  let authClient;

  try {
    authClient = await calendar.auth();
  } catch (err) {
    console.error('Auth error', err);
    return;
  }

  calendarEvents = await calendar.getEvents(authClient);

  console.log(calendarEvents);
}

main();

/* // Set up JWT (JSON Web Token) authentication
const jwtClient = new google.auth.JWT({
  email: keyFile.client_email,
  key: keyFile.private_key,
  scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
});

let calendarEvents;

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
      maxResults: 12,
      singleEvents: true,
      orderBy: 'startTime',
      timeZone: 'Europe/Budapest',
    },
    (err, res) => {
      if (err) {
        console.error('Error fetching events:', err);
        return;
      }

      calendarEvents = res.data.items;

      console.log('Upcoming calendarEvents:');
      if (calendarEvents.length) {
        calendarEvents.forEach((event) => {
          const start = event.start.dateTime || event.start.date;
          console.log(`${start} - ${event.summary}`);
        });
      } else {
        console.log('No upcoming events found.');
      }
    }
  );
}); */

// Endpoint to fetch events for a specific date
app.get('/getEvents', async (req, res) => {
  console.log('getEvents');
  const date = req.query.date; // Assuming the client sends the date as a query parameter
  console.log(date);
  // Example: Sending a response with a message
  res
    .status(200)
    .json({ message: 'Successfully received a request with date ' + date });
});

// Endpoint to fetch events
app.get('/events', async (req, res) => {
  console.log('get_/events');
  // Example: Sending a response with a message
  res.json(calendarEvents);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
