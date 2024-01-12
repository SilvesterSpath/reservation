import React from 'react';

function CalendarEvents({ calendarEvents }) {
  return (
    <div className='calendar-events'>
      <h2>Upcoming Events</h2>

      {calendarEvents.map((event) => (
        <div key={event.id} className='event'>
          <h3>{event.summary}</h3>
          <p>
            {event.start.dateTime} - {event.end.dateTime}
          </p>
          <p>{event.description}</p>
        </div>
      ))}
    </div>
  );
}

export default CalendarEvents;
