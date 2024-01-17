const express = require('express');
const cors = require('cors');
const calendar = require('./calendar');

const app = express();

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5000'],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

let calendarEvents;
/* let eventsArray; */

async function main() {
  let authClient;

  try {
    authClient = await calendar.auth();
  } catch (err) {
    console.error('Auth error', err);
    return;
  }
  const eventsByDate = {};
  calendarEvents = await calendar.getEvents(authClient);
  /*   console.log('Is calendarEvents an array?', Array.isArray(calendarEvents)); */

  calendarEvents.forEach((event) => {
    console.log(event.summary);
    const date = new Date(event.start.dateTime || event.start.date)
      .toISOString()
      .split('T')[0];
    eventsByDate[date] = {
      summary: event.summary,
      time: new Date(event.start.dateTime).toLocaleTimeString('en-US', {
        timeStyle: 'short',
        hour12: false,
      }),
    };
  });
  console.log('eventsByDate', eventsByDate);

  const today = new Date();
  const start = calendar.getStartOfMonth(today);
  const end = calendar.getEndOfMonth(today);

  const dateRange = calendar
    .getDateRange(start, end)
    .map((date) => date.toISOString().split('T')[0]);
  console.log('dateRange', dateRange);

  const fullCalendar = dateRange.map((date) => {
    const event = eventsByDate[date];
    return {
      date,
      event: event ? event.summary : null,
      time: event ? event.time : null,
    };
  });

  console.log(fullCalendar);
}

main();

// Usage

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
