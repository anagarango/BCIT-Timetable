'use client'

import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import timeGridPlugin from '@fullcalendar/timegrid'
import moment from "moment";
import { getUniqueDomId } from '@fullcalendar/core/internal'
import { useState } from 'react'


export default function FullCalendarLibrary(){
  // console.log(moment().subtract(1, "hour").toDate())

   function formatEvents() {
    return events.map(appointment => {
      const {title, end, start} = appointment

      return {
        title, 
        start: new Date(start),
        end: new Date(end), 
        extendedProps: {...appointment}
      }
    })
  }

   function SelectedEvent(eventChangeInfo){
    setEvents((prevEvents) => {
      const updatedEvents = prevEvents.map((event) =>
        eventChangeInfo.event._def.extendedProps.id == event.id
          ? {
              ...event,
              title: eventChangeInfo.event.title,
              start: eventChangeInfo.event.start,
              end: new Date("2023-07-24T12:20:00")
            }
          : event
      );
      console.log(events);
      return updatedEvents;
    });
  }

  // const handleSelect = (info) => {
  //   console.log(info)
  //   const { start, end } = info;
  //   const eventNamePrompt = prompt("Enter, event name");
  //   if (eventNamePrompt) {
  //     setEventss([
  //       ...eventss,
  //       {
  //         start,
  //         end,
  //         title: eventNamePrompt,
  //         id: uuid(),
  //       },
  //     ]);
  //   }
  // };

  function handleAddEventSubmit(){
    if (newEventTitle.trim() && newEventStart && newEventEnd) {
      const newEvent = {
        id: getUniqueDomId(),
        title: newEventTitle.trim(),
        start: newEventStart.toISOString(),
        end: newEventEnd.toISOString(),
      };

      setEvents((prevEvents) => [...prevEvents, newEvent]);
      setAddEvent(false);
      setNewEventTitle("");
      setNewEventStart(null);
      setNewEventEnd(null);
    }
  }


  const eventsList = [
    {
      title: "Advanced Dynamic Content",
      start: new Date("2023-07-24T08:30:00"),
      end: new Date("2023-07-24T11:20:00"),
      course: "MDIA 3109 Lab",
      room: "SE14 120",
      programSet: "D3 2 A",
      instructor: "Henry Leung",
      backgroundColor:"#465C7D",
      id: getUniqueDomId()
    },
    {
      title: "Law and Digital Publication",
      start: new Date("2023-07-27T09:30:00"),
      end: new Date("2023-07-27T12:20:00"),
      course: "BLAW 4100 Lab",
      room: "SW03 3615",
      programSet: "D3 2 A",
      instructor: "Joao Molinari",
      backgroundColor:"#465C7D",
      id: getUniqueDomId()
    },
    {
      title: "Advanced Dynamic Content",
      start: new Date("2023-07-27T14:30:00"),
      end: new Date("2023-07-27T17:20:00"),
      course: "MDIA 3109 Lab",
      room: "SE14 120",
      programSet: "D3 2 B",
      instructor: "Henry Leung",
      backgroundColor:"#CD7E7E",
      id: getUniqueDomId()
    },
    {
      title: "Law and Digital Publication",
      start: new Date("2023-07-24T12:30:00"),
      end: new Date("2023-07-24T15:20:00"),
      course: "BLAW 4100 Lab",
      room: "SW03 3615",
      programSet: "D3 2 B",
      instructor: "Joao Molinari",
      backgroundColor:"#CD7E7E",
      id: getUniqueDomId()
    }
  ]

  const [events, setEvents] = useState(eventsList);
  const [addEvent, setAddEvent] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventStart, setNewEventStart] = useState(null);
  const [newEventEnd, setNewEventEnd] = useState(null);


    return (
      <div>
        <button onClick={()=>setAddEvent(true)} style={{padding:"20px 50px"}}>Add</button>
      <FullCalendar
        height="100vh"
        plugins={[
          resourceTimelinePlugin,
          dayGridPlugin,
          interactionPlugin,
          timeGridPlugin
        ]}
        initialView="timeGridWeek"
        weekends={true}
        slotMinTime="08:00:00"
        slotMaxTime="18:00:00"
        eventContent={renderEventContent}
        events={formatEvents()}
        expandRows
        dayHeaderFormat={{
          weekday:'short',
          month: 'short',
          day: 'numeric',
        }}
        titleFormat={{
          month: 'long',
          day: 'numeric',
        }}
        editable={true}
        selectable={true}
        // select={handleSelect}
        eventClick={e => SelectedEvent(e)}
      />
      {addEvent && <div style={{display:"flex", justifyContent:"center", alignItems:"center", position:"fixed", height:"100vh", width:"100vw", backgroundColor:"rgba(0,0,0,0.5)", top:"0px", left:"0px", zIndex:"100"}}>
        <div style={{display:"flex", flexDirection:"column", backgroundColor:"rgba(132,164,240,1)", height:"fit-content", width:"80vw", padding:"50px"}}>
          <p>Title</p>
          <input
              type="text"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
            />
          <p style={{marginTop:"20px"}}>Start</p>
          <input
              type="datetime-local"
              value={newEventStart}
              onChange={(e) => setNewEventStart(new Date(e.target.value))}
            />
          <p style={{marginTop:"20px"}}>End</p>
          <input
              type="datetime-local"
              value={newEventEnd}
              onChange={(e) => setNewEventEnd(new Date(e.target.value))}
            />
          <button onClick={handleAddEventSubmit}>Add</button>
        </div>
        </div>}
      </div>
    )
  }

function renderEventContent(eventInfo) {
  return (
    <>
     <div style={{height: "100%", width: "100%", backgroundColor: eventInfo.event.extendedProps.backgroundColor, overflow:"clip", display:"flex", flexDirection:"column", alignItems:"center"}}>
      <b style={{padding:"7px 5px", backgroundColor:"white", color:"black", border:"1px solid black", marginBottom:"5px"}}>{eventInfo.timeText}</b>
      <p style={{padding:"7px 5px", backgroundColor:"white", color:"black", border:"1px solid black", marginBottom:"5px"}}>{eventInfo.event.extendedProps.course}</p>
      <p style={{padding:"7px 5px", backgroundColor:"white", color:"black", border:"1px solid black", marginBottom:"5px"}}>{eventInfo.event.extendedProps.room}</p>
      <p style={{padding:"7px 5px", backgroundColor:"white", color:"black", border:"1px solid black", marginBottom:"5px"}}>{eventInfo.event.extendedProps.programSet}</p>
      <p style={{padding:"7px 5px", backgroundColor:"white", color:"black", border:"1px solid black", marginBottom:"5px"}}>{eventInfo.event.extendedProps.instructor}</p>
    </div>
    </>
  )
}