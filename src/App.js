import {useState} from 'react'
import './App.css'

const Event = {
  name: "", 
  capacity: 0
}

function EventList({eventList}) {
  if(eventList.length === 0) return <p className="no-events">No events</p>
  
  return (
      <ul className="eventlist">  
        {eventList.map(event => 
          <span className="events" key={event.name}>
            {event.name}
          </span>
        )}
      </ul>
  )
}

function App() {
  const [eventList, setEventList] = useState([])
  
  return (
    <div>
      <h1>Events</h1>
      <EventList eventList={eventList}/>
    </div>
  )
}

export default App