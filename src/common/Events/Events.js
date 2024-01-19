import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modal from 'react-modal';
import { hasFormSubmit } from '@testing-library/user-event/dist/utils';

const localizer = momentLocalizer(moment);

function CalendarEvents({ events }) {
  const [expanded, setExpanded] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const startAccessor = (event) => {
    if (event && event.event) {
      return new Date(event.event.start.dateTime);
    }
    return null; // or return some default start date if needed
  };

  const endAccessor = (event) => {
    if (event && event.event) {
      return new Date(event.event.end.dateTime);
    }
    return null; // or return some default end date if needed
  };

  const titleAccessor = (event) => {
    if (event && event.event) {
      return event.event.summary;
    }
    return ''; // or return some default title if needed
  };

  const toggleDescription = () => {
    setModalOpen(!isModalOpen);
  };

  const handleFormSubmit = () => {
    console.log('submitting form');
  };

  const eventContent = ({ event }) => (
    <>
      <strong>{event.event.summary}</strong>
      <div>
        <span style={{ fontSize: '0.7em' }}>
          {moment(event.event.start.dateTime).format('h:mm a')} -{' '}
          {moment(event.event.end.dateTime).format('h:mm a')}
          {event.event.description && (
            <div
              style={{ cursor: 'pointer', color: 'blue' }}
              onClick={toggleDescription}
            >
              {isModalOpen ? (
                // Modal content
                <Modal
                  isOpen={isModalOpen}
                  onRequestClose={toggleDescription}
                  style={{
                    overlay: {
                      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fully opaque background
                      zIndex: 1000, // Higher z-index to ensure it's on top
                    },
                    content: {
                      backgroundColor: 'white',
                    },
                  }}
                >
                  <div className='form-modal'>
                    <div className='modal-content'>
                      <h2>Edit Event</h2>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleFormSubmit({
                            description:
                              e.target.elements.eventDescription.value,
                            attendeeEmail:
                              e.target.elements.attendeeEmail.value,
                          });
                        }}
                      >
                        <label>
                          Event Description:
                          <textarea
                            name='eventDescription'
                            defaultValue={/* selectedEvent.description || */ ''}
                          />
                        </label>
                        <br />
                        <label>
                          Attendee Email:
                          <input
                            type='email'
                            name='attendeeEmail'
                            defaultValue={
                              /* selectedEvent.attendeeEmail || */ ''
                            }
                            placeholder='Enter email'
                          />
                        </label>
                        <br />
                        <button type='submit'>Submit</button>
                      </form>
                    </div>
                  </div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: event.event.description,
                    }}
                  />
                </Modal>
              ) : (
                'Click to open details'
              )}
            </div>
          )}
        </span>
      </div>
    </>
  );

  return (
    <div className='calendar-events'>
      <div
        className='calendar-container'
        style={{ width: '95%', margin: '0 auto' }}
      >
        <h2>Upcoming Events</h2>
        <Calendar
          localizer={localizer}
          startAccessor={startAccessor}
          endAccessor={endAccessor}
          titleAccessor={titleAccessor}
          components={{ event: eventContent }}
          style={{ height: 600 }}
          events={events}
        />
      </div>

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
