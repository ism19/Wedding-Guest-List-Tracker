import {useState} from 'react'
import './App.css'

function EventList({eventList}) {
  if(eventList.length === 0) return <p className="no-events">No events</p>
  
  return (
      <ul className="event-list">  
        {eventList.map(event => 
          <li className="events" key={event.name}>
            <div className="event-name">
              {event.name}
            </div>
            <div className="event-capacity">
              {event.capacity} spots total • {event.capacity - event.guests.length} spots remaining
            </div>
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
    <div className="app">
      <div className="layout">
        <div className="left">
          <h3 id="my-events">My Events</h3>

          <div className="add-event">
            <input
              type="text"
              className="add-event-input"
              value={event}
              placeholder="Event name"
              onChange={e => setEvent(e.target.value)}
            />

            <input
              type="text"
              className="add-event-input"
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
        
        <div className="right">

        </div>
      </div>
    </div>
  )
}

export default App