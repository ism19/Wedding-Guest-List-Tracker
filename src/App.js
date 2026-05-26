import {useState} from 'react'
import './App.css'

const Event = {
  name: "", 
  capacity: 0,
  guests: []
}

function EventList({eventList}) {
  if(eventList.length === 0) return <p className="no-events">No events</p>
  
  return (
      <ul className="event-list">  
        {eventList.map(event => 
          <li className="events" key={event.name}>
            {event.name} - {event.capacity} spots total • {event.capacity - event.guests.length} spots remaining
          </li>
        )}
      </ul>
  )
}

function App() {
  const [eventList, setEventList] = useState([])
  const [capacity, setCapacity] = useState("")
  const [event, setEvent] = useState("")

  function addEvent() {
    if(event.trim().length === 0) return

    const newEvent = {
      name: event,
      capacity: Number(capacity), //change to number instead
      guests: []
    }
    
    setEventList([...eventList, newEvent])
    
    setEvent("")
    setCapacity("")
  }

  return (
    <div>
      <h3>My Events</h3>
      <div className="add-event">
        <input
          type="text"
          value={event}
          placeholder="Event name"
          onChange={e => setEvent(e.target.value)}
        />

        <input
          type="text"
          value={capacity}
          placeholder="Max capacity"
          onChange={e => setCapacity(e.target.value)}
        />

        <button className="add-button" onClick={addEvent}>
          Add Event
        </button>
      </div>
      
      <div className="events-grid">
        <EventList eventList={eventList}/>
      </div>

    </div>
  )
}

export default App