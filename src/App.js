import {useState} from 'react'
import './App.css'

function EventList({eventList, selected, setSelected, editingEvent, setEditingEvent, editEvent, setEditEvent, editCapacity, setEditCapacity, saveEvent}) {
  if(eventList.length === 0) return <p className="no-events">No events</p>
  
  return (
      <ul className="event-list">  
        {eventList.map(event => editingEvent?.name === event.name ? (
          <li className={selected?.name === event.name ? "events-selected" : "events"} key = {event.name} onClick={() => setSelected(event)}>
            <div className="edit-fields">
              <input
                type="text"
                value={editEvent}
                placeholder="New name"
                onChange={e => setEditEvent(capitalize(e.target.value))}
              />
              <input
                type="text"
                value={editCapacity}
                placeholder="New capacity"
                onChange={e => setEditCapacity(e.target.value)}
              />
            </div>
            <div className="edit-actions">
              <button className="add-event-button" onClick={saveEvent}>Save</button>
              <button className="cancel-button" onClick={() => setEditingEvent(null)}>Cancel</button>
            </div>
          </li>
        ) : (
          <li className={(event.name === selected?.name) ? "events-selected" : "events"} key={event.name} onClick={() => setSelected(event)}>
            <div className="event-info">
              <div className="event-name">
                {event.name}
              </div>
              <div className="event-capacity">
                {event.capacity} spots total • {event.capacity - event.guests.reduce((total, guest) => total + guest.partySize, 0)} spots remaining
              </div>
            </div>
            <button className="edit-button" onClick={e => {
              e.stopPropagation()
              setEditingEvent(event)
              setEditEvent(event.name)
              setEditCapacity(event.capacity)
            }}>⋮</button>
          </li>
        )
        )}
      </ul>
  )
}

function GuestList({selected, selectedGuest, setSelectedGuest}) {
  if(!selected) return

  return (
    <div className="event-details">
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

function capitalize(str) {
  return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))  
    .join(" ")
}

function App() {
  const [eventList, setEventList] = useState([])
  const [capacity, setCapacity] = useState("")
  const [event, setEvent] = useState("")
  const [selected, setSelected] = useState(null) 
  const [selectedGuest, setSelectedGuest] = useState(null)
  const [guestName, setGuestName] = useState("")
  const [partySize, setPartySize] = useState("")
  const [editingEvent, setEditingEvent] = useState(null)
  const [editEvent, setEditEvent] = useState("")
  const [editCapacity, setEditCapacity] = useState("")

  function addEvent() {
    if(event.trim().length === 0 || isNaN(capacity) || capacity.trim().length === 0) return

    const newEvent = {
      name: event,
      capacity: Number(capacity),
      guests: []
    }
    
    setEventList([...eventList, newEvent])
    
    setEvent("")
    setCapacity("")
  }

  function saveEvent() {
    if(editEvent.trim().length === 0 || isNaN(editCapacity) || editCapacity.trim().length === 0) return

    const editedEvent = {
      name: editEvent,
      capacity: Number(editCapacity),
      guests: editingEvent.guests
    }

    const updatedList = eventList.map(event => {
      if(event.name === editingEvent.name) {
        return {...event, name: editEvent, capacity: editCapacity}
      }
      return event
    })

    setEventList(updatedList)
    setSelected({...selected, name: editEvent, capacity: editCapacity})

    setEditEvent("")
    setEditCapacity("")
  }

  function addGuest() {
    if (guestName.trim().length === 0 || isNaN(partySize) || partySize.trim().length === 0) return

    const newGuest = {
      name: guestName,
      partySize: Number(partySize)
    }

    const updatedList = eventList.map(event => {
      if(event.name === selected.name) {
        return {...event, guests: [...event.guests, newGuest]}
      }
      return event
    })

    setEventList(updatedList)
    setSelected({...selected, guests: [...selected.guests, newGuest]})

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
              onChange={e => setEvent(capitalize(e.target.value))}
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
            <EventList 
              eventList={eventList} 
              selected={selected} 
              setSelected={setSelected}
              editingEvent={editingEvent}
              setEditingEvent={setEditingEvent}
              editEvent={editEvent}
              setEditEvent={setEditEvent}
              editCapacity={editCapacity}
              setEditCapacity={setEditCapacity}
            />
          </div>

        </div>
        
        <div className="right">
          {selected && (
            <div className="selected-info">
              <div className="event-text">
                <h2>{selected.name}</h2>
                <p>{selected.capacity} spots total</p>
                <p>{selected.capacity - selected.guests.reduce((total, guest) => total + guest.partySize, 0)} spots remaining</p>
              </div>
              <div className="add-guest">
                <input 
                  type="text" 
                  className="guest-name-input"
                  value={guestName} 
                  placeholder="Name"
                  onChange={e => setGuestName(capitalize(e.target.value))}
                />
                <input
                  type="text"
                  className="party-size-input"
                  value={partySize}
                  placeholder="Party size"
                  onChange={e => setPartySize(e.target.value)}
                />
                <button className="add-guest-button" onClick={addGuest}>
                  Add Guest
                </button>
              </div>
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