import React from 'react';

function CalendarEvents({ events }) {
  return (
    <div className='calendar-events'>
      <h2>Upcoming Events</h2>

      {events.map(
        (item) =>
          item.event !== null && (
            <div key={item.id} className='event'>
              <h3>{item.event.summary}</h3>
              <p>
                {item.event.start.dateTime} - {item.event.end.dateTime}
              </p>
              <p>{item.event.description}</p>
            </div>
          )
      )}
    </div>
  );
}

export default CalendarEvents;
