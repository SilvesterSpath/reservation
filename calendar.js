const { google } = require('googleapis');
const key = require('./config/calendar-410807.json');

const calendar = google.calendar({ version: 'v3' });

function auth() {
  const jwtClient = new google.auth.JWT({
    email: key.client_email,
    key: key.private_key,
    scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
  });

  return new Promise((resolve, reject) => {
    jwtClient.authorize((err, tokens) => {
      if (err) {
        reject(err);
      } else {
        resolve(jwtClient);
      }
    });
  });
}

async function getEvents(authClient) {
  const res = await calendar.events.list({
    auth: authClient,
    calendarId: 'spath.sz@gmail.com',
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  });

  return res.data.items;
}

module.exports = {
  auth,
  getEvents,
};
