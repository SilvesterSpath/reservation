import { useState } from 'react';
import './Home.css';

const Home = ({ events }) => {
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const getDayOfWeek = (dateString) => {
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const date = new Date(dateString);
    return daysOfWeek[date.getDay()];
  };

  // Function to handle event click
  const handleEventClick = (event, e) => {
    e.preventDefault();
    setSelectedEvent(event);
    setIsFormVisible(true);
  };

  // Function to handle form submission
  const handleFormSubmit = (formData) => {
    // Update the selected event with the new data
    const updatedEvents = calendarEvents.map((event) =>
      event.id === selectedEvent.id ? { ...event, ...formData } : event
    );

    // Update state with the modified events
    setCalendarEvents(updatedEvents);
    // You can handle the form data as needed (e.g., send to server)
    console.log('Form data submitted:', formData);
    // Close the form
    setIsFormVisible(false);
  };

  return (
    <>
      <div className='events-container'>
        {events.map((item) =>
          item.event === null ? (
            <div key={item.id} className='event-card'>
              <div>{getDayOfWeek(item.date)}</div>
              <div>{item.date}</div>
            </div>
          ) : (
            <div key={item.id} className='event-card'>
              <div>{getDayOfWeek(item.date)}</div>
              <div>{item.date}</div>
              <strong>{item.event.summary}</strong>
              <div className='event-details'>
                Start:{' '}
                {new Date(item.event.start.dateTime).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
                <br />
                End:{' '}
                {new Date(item.event.end.dateTime).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
              <br />
              {''}
              <button onClick={(e) => handleEventClick(item, e)}>
                Edit Event
              </button>
            </div>
          )
        )}
      </div>
      {/* Form Modal */}
      {isFormVisible && selectedEvent && (
        <div className='form-modal'>
          <div className='modal-content'>
            <span className='close' onClick={() => setIsFormVisible(false)}>
              &times;
            </span>
            <h2>Edit Event</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleFormSubmit({
                  description: e.target.elements.eventDescription.value,
                  attendeeEmail: e.target.elements.attendeeEmail.value,
                });
              }}
            >
              <label>
                Event Description:
                <textarea
                  name='eventDescription'
                  defaultValue={selectedEvent.description || ''}
                />
              </label>
              <br />
              <label>
                Attendee Email:
                <input
                  type='email'
                  name='attendeeEmail'
                  defaultValue={selectedEvent.attendeeEmail || ''}
                  placeholder='Enter email'
                />
              </label>
              <br />
              <button type='submit'>Submit</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
