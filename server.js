const express = require('express');
const cors = require('cors');
const {
  getDateRange,
  getEndOfMonth,
  getStartOfMonth,
  getEvents,
  auth,
} = require('./calendar');
const { writeToFile } = require('./utils/utils');
const { v4: uuidv4 } = require('uuid');

const app = express();

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5000'],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

let calendarEvents;
let fullCalendar;

async function main() {
  let authClient;

  try {
    authClient = await auth();
  } catch (err) {
    console.error('Auth error', err);
    return;
  }
  const eventsByDate = {};
  calendarEvents = await getEvents(authClient);

  calendarEvents.forEach((event) => {
    const startDate = new Date(event.start.dateTime || event.start.date);

    const date = startDate.toISOString().split('T')[0];

    eventsByDate[date] = event;
  });

  const today = new Date();
  console.log(today);
  const start = getStartOfMonth(today, 'Europe/Budapest');
  console.log(start);
  const end = getEndOfMonth(today, 'Europe/Budapest');
  console.log(end);

  const dateRange = getDateRange(start, end, 'Europe/Budapest').map(
    (date) => date.toISOString().split('T')[0]
  );

  fullCalendar = dateRange.map((date) => {
    // Generate a unique ID
    const uniqueID = uuidv4();
    const event = eventsByDate[date];
    return {
      id: uniqueID,
      date,
      event: event ? event : null,
    };
  });

  /*   // Call the async function to write 'calendarEvents' to a file
  await writeToFile('calendarEvents.json', calendarEvents);

  // Call the async function to write 'fullCalendar' to a file
  await writeToFile('fullCalendar.json', fullCalendar); */
}

main();

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
  res.json(fullCalendar);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
