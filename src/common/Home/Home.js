import { useState } from 'react';
import './Home.css';

const Home = ({ events }) => {
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Function to handle event click
  const handleEventClick = (event, e) => {
    e.preventDefault();
    setSelectedEvent(event);
    setIsFormVisible(true);
  };

  // Function to handle form submission
  const handleFormSubmit = (formData) => {
    // Update the selected event with the new data (this is just an example, you might have different logic)
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

  /*   const calendarId = 'spath.sz@gmail.com'; // Replace with your Gmail address
  const embedLink = `https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Europe%2FBudapest&src=${encodeURIComponent(
    calendarId
  )}&color=%237986CB&color=%230B8043&color=%230B8043`; */
  return (
    <>
      <div className='events-container'>
        {events.map((item) =>
          item.event === null ? (
            <div key={item.id}>Datea: item.date</div>
          ) : (
            <div key={item.id} className='event-card'>
              <p>
                <strong>{item.summary}</strong>
                <br />
                Start: {new Date(item.event.start.dateTime).toLocaleString()}
                <br />
                End: {new Date(item.event.end.dateTime).toLocaleString()}
              </p>
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
