// 'use client'

// import React from 'react'
// import { Scheduler } from "@aldabil/react-scheduler";


// export default function FullCalendarLibrary(){
//   console.log(moment().subtract(1, "hour").toDate())
//    // end: moment().add(1, "hour").toDate(),


//   const events = [
//     {
//       title: "Advanced Dynamic Content",
//       start: new Date("2023-07-24T08:30:00"),
//       end: new Date("2023-07-24T11:20:00"),
//       course: "MDIA 3109 Lab",
//       room: "SE14 120",
//       programSet: "D3 2 A",
//       instructor: "Henry Leung",
//       backgroundColor:"#465C7D"
//     },
//     {
//       title: "Law and Digital Publication",
//       start: new Date("2023-07-27T09:30:00"),
//       end: new Date("2023-07-27T12:20:00"),
//       course: "BLAW 4100 Lab",
//       room: "SW03 3615",
//       programSet: "D3 2 A",
//       instructor: "Joao Molinari",
//       backgroundColor:"#465C7D"
//     },
//     {
//       title: "Advanced Dynamic Content",
//       start: new Date("2023-07-27T14:30:00"),
//       end: new Date("2023-07-27T17:20:00"),
//       course: "MDIA 3109 Lab",
//       room: "SE14 120",
//       programSet: "D3 2 B",
//       instructor: "Henry Leung",
//       backgroundColor:"#CD7E7E"
//     },
//     {
//       title: "Law and Digital Publication",
//       start: new Date("2023-07-24T12:30:00"),
//       end: new Date("2023-07-24T15:20:00"),
//       course: "BLAW 4100 Lab",
//       room: "SW03 3615",
//       programSet: "D3 2 B",
//       instructor: "Joao Molinari",
//       backgroundColor:"#CD7E7E"
//     }
//   ]
//     return (
//       <Scheduler
//         view="week"
//         events={events}
//         fields
//       />
//     )
//   }

// function renderEventContent(eventInfo) {
//   return (
//     <>
//      <div style={{height: "100%", width: "100%", backgroundColor: eventInfo.event.extendedProps.backgroundColor, overflow:"clip", display:"flex", flexDirection:"column", alignItems:"center"}}>
//       <b style={{padding:"7px 5px", backgroundColor:"white", color:"black", border:"1px solid black", marginBottom:"5px"}}>{eventInfo.timeText}</b>
//       <p style={{padding:"7px 5px", backgroundColor:"white", color:"black", border:"1px solid black", marginBottom:"5px"}}>{eventInfo.event.extendedProps.course}</p>
//       <p style={{padding:"7px 5px", backgroundColor:"white", color:"black", border:"1px solid black", marginBottom:"5px"}}>{eventInfo.event.extendedProps.room}</p>
//       <p style={{padding:"7px 5px", backgroundColor:"white", color:"black", border:"1px solid black", marginBottom:"5px"}}>{eventInfo.event.extendedProps.programSet}</p>
//       <p style={{padding:"7px 5px", backgroundColor:"white", color:"black", border:"1px solid black", marginBottom:"5px"}}>{eventInfo.event.extendedProps.instructor}</p>
//     </div>
//     </>
//   )
// }