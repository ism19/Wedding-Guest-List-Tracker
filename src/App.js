import {useState} from 'react'
import './App.css'

function EventList({eventList, selected, setSelected}) {
  if(eventList.length === 0) return <p className="no-events">No events</p>
  
  return (
      <ul className="event-list">  
        {eventList.map(event => 
          <li className={(event.name === selected?.name) ? "events-selected" : "events"} key={event.name} onClick={() => setSelected(event)}>
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

function GuestList({selected, selectedGuest, setSelectedGuest}) {
  if(!selected) return

  return (
    <div className="event-details">
      <h2>{selected.name}</h2>
      <p>{selected.capacity} spots total</p>
      <p>{selected.capacity - selected.guests.length} spots remaining</p>
      <ul className="guest-list">
        {selected.guests.map(guest => (
          <li className="guest" key={guest.name}>
            {guest.name} • party of {guest.partySize}
          </li>
        ))
        }
      </ul>
    </div>
  )      
}

function App() {
  const [eventList, setEventList] = useState([])
  const [capacity, setCapacity] = useState("")
  const [event, setEvent] = useState("")
  const [selected, setSelected] = useState(null) 
  const [selectedGuest, setSelectedGuest] = useState(null)
  const [guestName, setGuestName] = useState("")
  const [partySize, setPartySize] = useState("")

  function addEvent() {
    if(event.trim().length === 0) return

    const newEvent = {
      name: event,
      capacity: Number(capacity),
      guests: []
    }
    
    setEventList([...eventList, newEvent])
    
    setEvent("")
    setCapacity("")
  }

  function addGuest() {
    const newGuest = {
      name: guestName,
      party: Number(partySize)
    }

    selected.guests.push(newGuest)

    setGuestName("")
    setPartySize("")
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

            <button className="add-event-button" onClick={addEvent}>
              Add Event
            </button>
          </div>
          
          <div className="events-grid">
            <EventList eventList={eventList} selected={selected} setSelected={setSelected}/>
          </div>

        </div>
        
        <div className="right">
          {selected && (
            <div className="add-guest">
              <input 
                type="text" 
                className="guest-name-input"
                value={guestName} 
                placeholder="name"
                onChange={e => setGuestName(e.target.value)}
              />
              <input
                type="text"
                className="party-size-input"
                value={partySize}
                placeholder="party size"
                onChange={e => setPartySize(e.target.value)}
              />
              <button className="add-guest-button" onClick={addGuest}>
                Add Guest
              </button>
            </div>
            )
          }
          
          <GuestList 
            selected={selected} 
            selectedGuest={selectedGuest} 
            setSelectedGuest={setSelectedGuest}
          />
        </div>
      </div>
    </div>
  )
}

export default App