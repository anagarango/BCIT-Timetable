'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import timeGridPlugin from '@fullcalendar/timegrid'
import rrulePlugin from "@fullcalendar/rrule";
import { getUniqueDomId } from '@fullcalendar/core/internal'
import { useState, useRef } from 'react'
import { DateTime, Duration } from 'luxon';




export default function FullCalendarLibrary(){
  const calendarRef = useRef();  
  const r = useRouter()

  // useEffect(()=>{
  //   setEvents(calendarRef.current.props.events)
  // },[])

  const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const colors = ["#445A79", "#467D5C", "#F0E580", "#CD7E7E"]
  const eventFormat = {
    color:colors[0],
    course:"",
    daysOfWeek:[],
    endRecur:"",
    endTime:"",
    faculty:"",
    groupId:getUniqueDomId(),
    programSet:[],
    room:"",
    startRecur:"",
    startTime:"",
    title:"",
    uuid:getUniqueDomId()
  }


  function SelectedEvent(eventChangeInfo){
    var filteredSelectedEvent
    setEditingEvent(() => {
      events.map((filteringEvent) => {
        if(eventChangeInfo.event._def.extendedProps.uuid == filteringEvent.uuid){
          filteredSelectedEvent = filteringEvent
        }
      });
      return filteredSelectedEvent;
    })
  }

  function FilteringCapitalizingWordsErrorMessages(objectOfFields){
    var emptyFields = Object.keys(objectOfFields).filter(key => objectOfFields[key] == "");

    if(emptyFields.length > 0){
      const arrayOfMissingFields = []

      for(var x = 0; x < emptyFields.length; x++){
        var word = emptyFields[x].split(/(?=[A-Z])/).join(' ')
        var finalWord = word.replace(word[0], word[0].toUpperCase())
        if(finalWord == "End Recur"){
          arrayOfMissingFields.push("End Recurring Date")
        } else if(finalWord == "Start Recur"){
          arrayOfMissingFields.push("Start Recurring Date")
        } else if(finalWord == "Color"){
          arrayOfMissingFields.push("Colors")
        } else{
          arrayOfMissingFields.push(finalWord)
        }
        
      }

      setErrorMessage({
        message:"Missing fields in sections: ",
        missingFields: arrayOfMissingFields
      })
    }
  }



  function handleEditEventSubmit(editingEventInformation){
    if(Object.keys(editingEventInformation).filter(key => editingEventInformation[key] == "").length > 0){
      FilteringCapitalizingWordsErrorMessages(editingEventInformation)
      return
    }
    
    setEvents(() => {
      const updatedEvents = events.map((filteringEvent) =>
        editingEventInformation.uuid == filteringEvent.uuid
          ? editingEventInformation
          : filteringEvent
      );
      return updatedEvents;
    });

    setEventModal("");
    setErrorMessage({message:"", missingFields:[]})
  }



  function handleAddEventSubmit(){
    if(Object.keys(addingEvent).filter(key => addingEvent[key] == "").length > 0){
      FilteringCapitalizingWordsErrorMessages(addingEvent)
      return
    }
    
    var newEvent = addingEvent

    if(addingEvent.title.trim() && addingEvent.start && addingEvent.end && addingEvent.course.trim() && addingEvent.room.trim() && addingEvent.programSet.trim() && addingEvent.faculty.trim()){
      newEvent.uuid = getUniqueDomId()
    }

    setEvents((prevEvents) => [...prevEvents, newEvent]);
    setEventModal("")
    setAddingEvent(eventFormat)
    setErrorMessage({message:"", missingFields:[]})
  }


  
  function handleFilterClick(e, name){
    e.stopPropagation();
    setActiveFilter(name)
  }



  function handleRoomModal(clickedInstructor){
    setFocusedModalTitle(clickedInstructor)

    setFocusedModalInformation(() => {
      const focusedModal = [];
      events.map((filteringEvent) => {
        if(filteringEvent.faculty === clickedInstructor){
          focusedModal.push(filteringEvent)
        }
      });
      return focusedModal;
    });
  }


  
  function handleSelectEditing(selectedArrayItem, eventState, setEventState, objectKey){
    if(eventState[objectKey].includes(selectedArrayItem)){
      setEventState((prevState) => {
        const newState = { ...prevState };
        newState[objectKey] = newState[objectKey].filter((item) => item !== selectedArrayItem);
        return newState;
      });
    } else {
      setEventState((prevState) => {
        const newState = { ...prevState };
        newState[objectKey] = [...newState[objectKey], selectedArrayItem];
        return newState;
      });
    }
  }



  function handleFocusedCheckBox(checkedBoxName){
    if(focusedIsChecked.includes(checkedBoxName)){
      setFocusedIsChecked(focusedIsChecked.filter((item) => item !== checkedBoxName));
    } else {
      setFocusedIsChecked((prevState) => {
        const newState = [...prevState, checkedBoxName];
        return newState;
      });
    }
  }



  function handleDeletingEvent(eventData){
    setEvents(events.filter((item) => item.uuid !== eventData.uuid));

    setEventModal("")
  }

  

  const [eventModal, setEventModal] = useState("")
  const [editingEvent, setEditingEvent] = useState({})
  const [addingEvent, setAddingEvent] = useState(eventFormat)
  const [activeFilter, setActiveFilter] = useState("none")
  const [focusedModalInformation, setFocusedModalInformation] = useState([])
  const [focusedModalTitle, setFocusedModalTitle] = useState("")
  const [focusedIsChecked, setFocusedIsChecked] = useState([])
  const [errorMessage, setErrorMessage] = useState({message:"", missingFields:[]})

  const [events, setEvents] = useState(null)
  const [filters, setFilters] = useState([])
  const [minMaxTime, setMinMaxTime] = useState({
    s:"08:00:00",
    e:"20:00:00"
  });

  const [addXY, setAddXY] = useState({
    show:false,
    x:0,
    y:0,
    time:{start:null, end:null}
  })




  useEffect(()=>{
    setFilters([
      JSON.parse(localStorage.getItem("Course")) !== null ? JSON.parse(localStorage.getItem("Course")) : [], 
      JSON.parse(localStorage.getItem("Room")) !== null ? JSON.parse(localStorage.getItem("Room")) : [], 
      JSON.parse(localStorage.getItem("Program/Sets")) !== null ? JSON.parse(localStorage.getItem("Program/Sets")) : [], 
      JSON.parse(localStorage.getItem("Faculty")) !== null ? JSON.parse(localStorage.getItem("Faculty")) : []
    ]);

    setFocusedIsChecked(JSON.parse(localStorage.getItem("Program/Sets")) !== null ? JSON.parse(localStorage.getItem("Program/Sets")) : []);

    // console.log(localStorage.getItem("Events"));
    setEvents((JSON.parse(localStorage.getItem("Events")) && JSON.parse(localStorage.getItem("Events")).length > 0) ? JSON.parse(localStorage.getItem("Events")) : [])
  }, [])


  useEffect(() => {
    if(Array.isArray(events)){
      localStorage.setItem("Events", JSON.stringify(events));
    }
    // console.log(calendarRef.current);
  }, [events]);




  return (
    <div style={{display:"flex"}}>

      <div style={{padding:"0px 15px"}}>
        <h2>Active Filter</h2>
        {activeFilter == "none" ? 
          <></> 
          :
          <div style={{backgroundColor:"#D9D9D9", padding:"10px 5px"}}>
            <div style={{display:"flex", backgroundColor:"white", alignItems:"center"}}>
              <p onClick={()=>setActiveFilter("none")} style={{paddingRight:"10px"}}>X</p>
              <p>{activeFilter}</p>
            </div>
          </div>      
        }
      </div>
        

      <div style={{width:"120vw"}}>
        <div style={{position:"absolute", display:addXY.show?"block":"none", top:addXY.y, left:addXY.x, zIndex:999}}>
          <button onClick={()=>{
            setEventModal("add");
            setAddingEvent({
              ...addingEvent,
              startTime:addXY.time.start.toFormat("HH:mm"),
              endTime:addXY.time.end.toFormat("HH:mm"),
              startRecur:addXY.time.start.toFormat("yyyy")+"-01-01",
              endRecur:addXY.time.end.plus(Duration.fromObject({ years: 1 })).toFormat("yyyy")+"-01-01",
              daysOfWeek:[addXY.time.start.weekday.toString()]
            })
            console.log({
              ...addingEvent,
              startTime:addXY.time.start.toFormat("HH:mm"),
              endTime:addXY.time.end.toFormat("HH:mm"),
              startRecur:addXY.time.start.toFormat("yyyy")+"-01-01",
              endRecur:addXY.time.end.plus(Duration.fromObject({ years: 1 })).toFormat("yyyy")+"-01-01",
              daysOfWeek:[addXY.time.start.weekday.toString()]
            })

            setAddXY({...addXY, show:false});

          }} style={{padding:"15px 50px"}}>Add</button>
        </div>
        <FullCalendar
          ref={calendarRef}
          schedulerLicenseKey='CC-Attribution-NonCommercial-NoDerivatives'
          
          plugins={[
            rrulePlugin,
            resourceTimelinePlugin,
            dayGridPlugin,
            interactionPlugin,
            timeGridPlugin
          ]}
          initialView="timeGridWeek"
          weekends={true}
          slotMinTime={minMaxTime.s}
          slotMaxTime={minMaxTime.e}
          eventContent={renderEventContent}
          events={events}
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
          // editable={true}
          selectable={true}
          slotEventOverlap={false}
          eventClick={e => {SelectedEvent(e); setEventModal("edit")}}
          select={e=>{
            console.log(e);
            setAddXY({
              show:true,
              x:e.jsEvent.pageX,
              y:e.jsEvent.pageY,
              time:{
                start:DateTime.fromJSDate(e.start),
                end:DateTime.fromJSDate(e.end)
              }
            })
          }}
        />
          
        {eventModal == "edit" && 
          <div style={{display:"flex", justifyContent:"center", alignItems:"center",position:"fixed", height:"100vh", width:"100vw", top:"0px", left:"0px", zIndex:"100"}}>
            <div style={{position:"absolute", height:"100%", width:"100%", backgroundColor:"rgba(0,0,0,0.5)", top:"0px", left:"0px", zIndex:"-1"}} onClick={()=>{setEventModal(""); setEditingEvent({})}}></div>
            <div style={{backgroundColor:"#FFF7EC", height:"fit-content", width:"80vw", padding:"50px", maxHeight:"80%", overflow:"auto"}}>
              <p style={{fontWeight:errorMessage.missingFields.includes('Title') ? "900" : "700", color:errorMessage.missingFields.includes('Title') ? "#B60808" : "black"}}>Title</p>
              <input
                type="text"
                value={editingEvent.title}
                onChange={(e) => setEditingEvent((prevState) => ({...prevState, title: e.target.value}))}
              />

              <p style={{marginTop:"40px", fontWeight:700}}>Start Time</p>
              <input
                type="time"
                value={editingEvent.startTime}
                onChange={(e) => setEditingEvent((prevState) => ({...prevState, startTime: e.target.value}))}
              />

              <p style={{marginTop:"40px", fontWeight:700}}>End Time</p>
              <input
                type="time"
                value={editingEvent.endTime}
                onChange={(e) => setEditingEvent((prevState) => ({...prevState, endTime: e.target.value}))}
              />

              <p style={{marginTop:"40px", fontWeight:errorMessage.missingFields.includes('Days Of Week') ? "900" : "700", color:errorMessage.missingFields.includes('Days Of Week') ? "#B60808" : "black"}}>Days Of Week</p>
              <div style={{marginTop:"10px", display:"flex", flexWrap:"wrap"}}>
                {week.map((o,i)=> {
                  return(
                    <p key={i} onClick={()=> handleSelectEditing(i.toString(), editingEvent, setEditingEvent, "daysOfWeek")} style={{padding:"5px", backgroundColor:editingEvent.daysOfWeek.includes(i.toString()) ? "#B5AEE9" : "white", width:"fit-content", border:"1px solid black",  marginRight:"10px", marginBottom:"5px"}}>{o}</p>
                  )
                })}
              </div>

              <p style={{marginTop:"40px", fontWeight:700}}>Start Recurring Date</p>
              <input
                type="date"
                value={editingEvent.startRecur.slice(0, 10)}
                onChange={(e) => setEditingEvent((prevState) => ({...prevState, startRecur: e.target.value + 'T' + editingEvent.startTime}))}
              />

              <p style={{marginTop:"40px", fontWeight:700}}>End Recurring Date</p>
              <input
                type="date"
                value={editingEvent.endRecur.slice(0, 10)}
                onChange={(e) => setEditingEvent((prevState) => ({...prevState, endRecur: e.target.value + 'T' + editingEvent.endTime}))}
              />

              <p style={{marginTop:"40px", fontWeight:700}}>Course</p>
              <div style={{marginTop:"10px", display:"flex", flexWrap:"wrap"}}>
                {filters[0].length > 0 ? filters[0].map((o,i)=> {
                  return(
                    <p key={i} onClick={()=> setEditingEvent((prevState) => ({...prevState, course: o}))} style={{padding:"5px", backgroundColor:editingEvent.course == o ? "#B5AEE9" : "white", width:"fit-content", border:"1px solid black",  marginRight:"10px", marginBottom:"5px"}}>{o}</p>
                  )}) 
                  : 
                  <p onClick={()=> r.push("/")} style={{padding:"5px", backgroundColor:"#EC4444", width:"fit-content", border:"1px solid black",  marginRight:"10px", marginBottom:"5px", cursor:"pointer"}}>Add Items</p>
                }
              </div>

              <p style={{marginTop:"40px", fontWeight:700}}>Room</p>
              <div style={{marginTop:"10px", display:"flex", flexWrap:"wrap"}}>
                {filters[1].length > 0 ? filters[1].map((o,i)=> {
                  return(
                    <p key={i} onClick={()=> setEditingEvent((prevState) => ({...prevState, room: o}))} style={{padding:"5px", backgroundColor:editingEvent.room == o ? "#B5AEE9" : "white", width:"fit-content", border:"1px solid black",  marginRight:"10px", marginBottom:"5px"}}>{o}</p>
                  )}) 
                  : 
                  <p onClick={()=> r.push("/")} style={{padding:"5px", backgroundColor:"#EC4444", width:"fit-content", border:"1px solid black",  marginRight:"10px", marginBottom:"5px", cursor:"pointer"}}>Add Items</p>
                }
              </div>

              <p style={{marginTop:"40px", fontWeight:errorMessage.missingFields.includes('Program Set') ? "900" : "700", color:errorMessage.missingFields.includes('Program Set') ? "#B60808" : "black"}}>Program Set</p>
              <div style={{marginTop:"10px", display:"flex", flexWrap:"wrap"}}>
                {filters[2].length > 0 ? filters[2].map((o,i)=> {
                  return(
                    <p key={i} onClick={()=>handleSelectEditing(o, editingEvent, setEditingEvent, "programSet")} style={{padding:"5px", width:"fit-content", border:"1px solid black", backgroundColor:editingEvent.programSet.includes(o) ? "#B5AEE9" : "white", marginRight:"10px", marginBottom:"5px"}}>{o}</p>
                  )}) 
                  : 
                  <p onClick={()=> r.push("/")} style={{padding:"5px", backgroundColor:"#EC4444", width:"fit-content", border:"1px solid black",  marginRight:"10px", marginBottom:"5px", cursor:"pointer"}}>Add Items</p>
                }
              </div>
              
              <p style={{marginTop:"40px", fontWeight:700}}>Faculty</p>
              <div style={{marginTop:"10px", display:"flex", flexWrap:"wrap"}}>
                 {filters[3].length > 0 ? filters[3].map((o,i)=> {
                  return(
                    <p key={i} onClick={()=> setEditingEvent((prevState) => ({...prevState, faculty: o}))} style={{padding:"5px", backgroundColor:editingEvent.faculty == o ? "#B5AEE9" : "white", width:"fit-content", border:"1px solid black",  marginRight:"10px", marginBottom:"5px"}}>{o}</p>
                  )}) 
                  : 
                  <p onClick={()=> r.push("/")} style={{padding:"5px", backgroundColor:"#EC4444", width:"fit-content", border:"1px solid black",  marginRight:"10px", marginBottom:"5px", cursor:"pointer"}}>Add Items</p>
                }
              </div>

              <p style={{marginTop:"40px", fontWeight:700}}>Colors</p>
              <div style={{marginTop:"10px", display:"flex", flexWrap:"wrap", minHeight:"30px", alignItems:"center"}}>
                {colors.map((o,i)=> {
                  return(
                    <div key={i} onClick={()=> setEditingEvent((prevState) => ({...prevState, color: o}))} style={{backgroundColor:o, width:editingEvent.color == o ? "30px" : "20px", height:editingEvent.color == o ? "30px" : "20px", border:editingEvent.color == o ? "1px solid black" : "", marginRight:"10px"}} />
                  )
                })}
              </div>

              {errorMessage.missingFields.length > 0 && <p style={{backgroundColor:"#E29E9E", border:"1px solid #B60808", padding:"5px", color:"#B60808", marginTop:"40px"}}>
                {errorMessage.message}
                {errorMessage.missingFields.map((o,i)=>{
                  if(i == errorMessage.missingFields.length-1){
                    return(
                      <span key={i} style={{fontWeight:"700"}}>{o}.</span>
                     
                    )
                  } else {
                    return(
                      <span key={i} style={{fontWeight:"700"}}>{o}, </span>
                    )
                  }
                })}</p>
              }

              <button onClick={()=>handleEditEventSubmit(editingEvent)} style={{marginTop:"40px"}}>Save</button>
              <button onClick={()=>handleDeletingEvent(editingEvent)}>Delete</button>
              <button onClick={()=>{setEventModal(""); setEditingEvent({}); setErrorMessage({message:"", missingFields:[]})}}>Cancel</button>
            </div>
          </div>
        }

        {eventModal == "add" && 
          <div style={{display:"flex", justifyContent:"center", alignItems:"center", position:"fixed", height:"100vh", width:"100vw", top:"0px", left:"0px", zIndex:"100"}}>
            
            {/* MASK */}
            <div style={{position:"absolute", height:"100%", width:"100%", backgroundColor:"rgba(0,0,0,0.5)", top:"0px", left:"0px", zIndex:"-1"}} onClick={()=>{setEventModal(""); setAddingEvent(eventFormat)}}></div>

            <div style={{backgroundColor:addingEvent.color, height:"fit-content", width:"80vw", padding:"50px", maxHeight:"80%", overflow:"auto"}}>
              <p style={{fontWeight:errorMessage.missingFields.includes('Title') ? "900" : "700", color:errorMessage.missingFields.includes('Title') ? "#B60808" : "black"}}>Title</p>
              <input
                type="text"
                value={addingEvent.title}
                onChange={(e) => setAddingEvent((prevState) => ({...prevState, title: e.target.value}))}
              />

              <p style={{marginTop:"40px", fontWeight:errorMessage.missingFields.includes('Start Time') ? "900" : "700", color:errorMessage.missingFields.includes('Start Time') ? "#B60808" : "black"}}>Start Time</p>
              <input
                type="time"
                value={addingEvent.startTime}
                onChange={(e) => setAddingEvent((prevState) => ({...prevState, startTime: e.target.value}))}
              />

              <p style={{marginTop:"40px", fontWeight:errorMessage.missingFields.includes('End Time') ? "900" : "700", color:errorMessage.missingFields.includes('End Time') ? "#B60808" : "black"}}>End Time</p>
              <input
                type="time"
                value={addingEvent.endTime}
                onChange={(e) => setAddingEvent((prevState) => ({...prevState, endTime: e.target.value}))}
              />

              <p style={{marginTop:"40px", fontWeight:errorMessage.missingFields.includes('Days Of Week') ? "900" : "700", color:errorMessage.missingFields.includes('Days Of Week') ? "#B60808" : "black"}}>Days Of Week</p>
              <div style={{marginTop:"10px", display:"flex", flexWrap:"wrap"}}>
                {week.map((o,i)=> {
                  return(
                    <p key={i} onClick={()=> handleSelectEditing(i.toString(), addingEvent, setAddingEvent, "daysOfWeek")} style={{padding:"5px", backgroundColor:addingEvent.daysOfWeek.includes(i.toString()) ? "#B5AEE9" : "white", width:"fit-content", border:"1px solid black",  marginRight:"10px", marginBottom:"5px"}}>{o}</p>
                  )
                })}
              </div>

              <p style={{marginTop:"40px", fontWeight:errorMessage.missingFields.includes('Start Recurring Date') ? "900" : "700", color:errorMessage.missingFields.includes('Start Recurring Date') ? "#B60808" : "black"}}>Start Recurring Date</p>
              <input
                type="date"
                value={addingEvent.startRecur.slice(0, 10)}
                onChange={(e) => setAddingEvent((prevState) => ({...prevState, startRecur: e.target.value + 'T' + addingEvent.startTime}))}
              />

              <p style={{marginTop:"40px", fontWeight:errorMessage.missingFields.includes('End Recurring Date') ? "900" : "700", color:errorMessage.missingFields.includes('End Recurring Date') ? "#B60808" : "black"}}>End Recurring Date</p>
              <input
                type="date"
                value={addingEvent.endRecur.slice(0, 10)}
                onChange={(e) => setAddingEvent((prevState) => ({...prevState, endRecur: e.target.value + 'T' + addingEvent.endTime}))}
              />

              <p style={{marginTop:"40px", fontWeight:errorMessage.missingFields.includes('Course') ? "900" : "700", color:errorMessage.missingFields.includes('Course') ? "#B60808" : "black"}}>Course</p>
              <div style={{marginTop:"10px", display:"flex", flexWrap:"wrap", minHeight:"30px", alignItems:"center"}}>
                {filters[0].length > 0 ? filters[0].map((o,i)=> {
                  return(
                    <p key={i} onClick={()=> setAddingEvent((prevState) => ({...prevState, course: o}))} style={{padding:"5px", backgroundColor:addingEvent.course == o ? "#B5AEE9" : "white", width:"fit-content", border:"1px solid black",  marginRight:"10px", marginBottom:"5px"}}>{o}</p>
                  )}) 
                  : 
                  <p onClick={()=> r.push("/")} style={{padding:"5px", backgroundColor:"#EC4444", width:"fit-content", border:"1px solid black",  marginRight:"10px", marginBottom:"5px", cursor:"pointer"}}>Add Items</p>
                }
              </div>
              
              <p style={{marginTop:"40px", fontWeight:errorMessage.missingFields.includes('Room') ? "900" : "700", color:errorMessage.missingFields.includes('Room') ? "#B60808" : "black"}}>Room</p>
              <div style={{marginTop:"10px", display:"flex", flexWrap:"wrap", minHeight:"30px", alignItems:"center"}}>

                {filters[1].length > 0 ? filters[1].map((o,i)=> {
                  return(
                    <p key={i} onClick={()=> setAddingEvent((prevState) => ({...prevState, room: o}))} style={{padding:"5px", backgroundColor:addingEvent.room == o ? "#B5AEE9" : "white", width:"fit-content", border:"1px solid black",  marginRight:"10px", marginBottom:"5px"}}>{o}</p>
                  )}) 
                  : 
                  <p onClick={()=> r.push("/")} style={{padding:"5px", backgroundColor:"#EC4444", width:"fit-content", border:"1px solid black",  marginRight:"10px", marginBottom:"5px", cursor:"pointer"}}>Add Items</p>
                }
              </div>

              <p style={{marginTop:"40px", fontWeight:errorMessage.missingFields.includes('Program Set') ? "900" : "700", color:errorMessage.missingFields.includes('Program Set') ? "#B60808" : "black"}}>Program Set</p>
              <div style={{marginTop:"10px", display:"flex", flexWrap:"wrap", minHeight:"30px", alignItems:"center"}}>
                {filters[2].length > 0 ? filters[2].map((o,i)=> {
                  return(
                    <p key={i} onClick={()=>handleSelectEditing(o, addingEvent, setAddingEvent, "programSet")} style={{padding:"5px", width:"fit-content", border:"1px solid black", backgroundColor:addingEvent.programSet.includes(o) ? "#B5AEE9" : "white", marginRight:"10px", marginBottom:"5px"}}>{o}</p>
                  )}) 
                  : 
                  <p onClick={()=> r.push("/")} style={{padding:"5px", backgroundColor:"#EC4444", width:"fit-content", border:"1px solid black",  marginRight:"10px", marginBottom:"5px", cursor:"pointer"}}>Add Items</p>
                }
              </div>

              <p style={{marginTop:"40px", fontWeight:errorMessage.missingFields.includes('Faculty') ? "900" : "700", color:errorMessage.missingFields.includes('Faculty') ? "#B60808" : "black"}}>Faculty</p>
              <div style={{marginTop:"10px", display:"flex", flexWrap:"wrap", minHeight:"30px", alignItems:"center"}}>
                {filters[3].length > 0 ? filters[3].map((o,i)=> {
                  return(
                    <p key={i} onClick={()=> setAddingEvent((prevState) => ({...prevState, faculty: o}))} style={{padding:"5px", backgroundColor:addingEvent.faculty == o ? "#B5AEE9" : "white", width:"fit-content", border:"1px solid black", marginRight:"10px", marginBottom:"5px"}}>{o}</p>
                  )}) 
                  : 
                  <p onClick={()=> r.push("/")} style={{padding:"5px", backgroundColor:"#EC4444", width:"fit-content", border:"1px solid black",  marginRight:"10px", marginBottom:"5px", cursor:"pointer"}}>Add Items</p>
                }
              </div>
              
              <p style={{marginTop:"40px", fontWeight:errorMessage.missingFields.includes('Color') ? "900" : "700", color:errorMessage.missingFields.includes('Color') ? "#B60808" : "black"}}>Colors</p>
              <div style={{marginTop:"10px", display:"flex", flexWrap:"wrap", minHeight:"30px", alignItems:"center"}}>
                {colors.map((o,i)=> {
                  return(
                    <div key={i} onClick={()=> setAddingEvent((prevState) => ({...prevState, color: o}))} style={{backgroundColor:o, width:addingEvent.color == o ? "30px" : "20px", height:addingEvent.color == o ? "30px" : "20px", border:addingEvent.color == o ? "1px solid black" : "", marginRight:"10px"}} />
                  )
                })}
              </div>

              {errorMessage.missingFields.length > 0 && <p style={{backgroundColor:"#E29E9E", border:"1px solid #B60808", padding:"5px", color:"#B60808", marginTop:"40px"}}>
                {errorMessage.message}
                {errorMessage.missingFields.map((o,i)=>{
                  if(i == errorMessage.missingFields.length-1){
                    return(
                      <span key={i} style={{fontWeight:"700"}}>{o}.</span>
                     
                    )
                  } else {
                    return(
                      <span key={i} style={{fontWeight:"700"}}>{o}, </span>
                    )
                  }
                })}</p>
              }

              <button onClick={handleAddEventSubmit} style={{marginTop:"40px"}}>Add</button>
              <button onClick={()=>{setEventModal(""); setAddingEvent(eventFormat); setErrorMessage({message:"", missingFields:[]})}}>Cancel</button>
            </div>
          </div>
        }

        {eventModal == "focused" && 
          <div style={{display:"flex", justifyContent:"center", alignItems:"center", position:"fixed", height:"100vh", width:"100vw", backgroundColor:"#A6AFE7", top:"0px", left:"0px", zIndex:"100"}}>
            <div style={{width:"80%"}}>
              <h1 style={{textAlign:"center"}}>{focusedModalTitle}</h1>
              <FullCalendar
                ref={calendarRef}
                schedulerLicenseKey='CC-Attribution-NonCommercial-NoDerivatives'
                height="95vh"
                plugins={[
                  rrulePlugin,
                  resourceTimelinePlugin,
                  dayGridPlugin,
                  interactionPlugin,
                  timeGridPlugin
                ]}
                initialView="timeGridWeek"
                weekends={true}
                slotMinTime={minMaxTime.s}
                slotMaxTime={minMaxTime.e}
                eventContent={renderFocusedEventContent}
                events={focusedModalInformation}
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
                slotEventOverlap={false}
                // eventClick={e => {SelectedEvent(e); setEventModal("edit")}}

              />
            </div>
            <div style={{padding:"15px", border:"1px solid black", margin:"20px"}}>
              <button onClick={()=>{setEventModal("")}}>Cancel</button>
              <h2>Programs/Sets</h2>
              {filters[2] && filters[2].map((o,i)=>{
                return(
                  <div key={i} style={{display:"flex", justifyContent:"space-between"}}>
                    <p>{o}</p>
                    <input onClick={()=>{handleFocusedCheckBox(o)}} type="checkbox" checked={focusedIsChecked.includes(o) ? true : false} id={o} name={o} value={o} />
                  </div>
                )

              })}
              <div>
                
              </div>
            </div>
          </div>
        }

      </div>


      <div style={{padding:"0px 15px"}}>
        <h2>Programs</h2>
          {filters[3] && filters[3].map((o,i)=>{
            return(
              <div key={i} onClick={()=>{handleRoomModal(o); setEventModal("focused")}}  style={{padding:"10px", backgroundColor:"#D9D9D9", marginBottom:"20px", cursor:"pointer"}}>
                <h4>{o}</h4>
              </div>
            )
          })}
      </div>

    </div>
  )

  function renderEventContent(eventInfo) {
    // console.log("Evt info", eventInfo);
    return ( 
      <div style={{height: "100%", width:"100%", backgroundColor: eventInfo.backgroundColor, border:`2px solid ${eventInfo.borderColor}`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"space-between", padding:"2px", cursor:"pointer", opacity:activeFilter == eventInfo.event._def.extendedProps.faculty ? "1" : activeFilter == "none" ? "1" : "0.2"}} id={eventInfo.event._def.extendedProps.uuid}>
        <div style={{width: "100%", overflowY:"auto", overflowX:"clip", display:"flex", flexDirection:"column", alignItems:"center"}}>
          {/* <b style={{padding:"7px 5px", backgroundColor:"white", color:"black", border:"1px solid black", marginBottom:"5px"}}>{eventInfo.timeText}</b> */}
          <p style={{padding:"7px 5px", backgroundColor:"white", color:"black", border:"1px solid black", marginBottom:"5px"}}>{eventInfo.event.extendedProps.course}</p>
          <p style={{padding:"7px 5px", backgroundColor:"white", color:"black", border:"1px solid black", marginBottom:"5px"}}>{eventInfo.event.extendedProps.room}</p>
          <p style={{padding:"7px 5px", backgroundColor:"white", color:"black", border:"1px solid black", marginBottom:"5px"}}>
            {eventInfo.event.extendedProps.programSet.map((o,i)=>{
              if(eventInfo.event.extendedProps.programSet.length <= 1 || i == eventInfo.event.extendedProps.programSet.length-1){
                return(
                  `${o}`
                )
              } else {
                return(
                  `${o}, `
                )
              }
            })}
          </p>
          <div style={{display:"flex", alignItems:"center", padding:"7px 5px", backgroundColor:"white", color:"black", border:"1px solid black", marginBottom:"5px"}}>
            <p>{eventInfo.event.extendedProps.faculty}</p>
            <img onClick={(e)=>handleFilterClick(e, eventInfo.event._def.extendedProps.faculty)} src='/information.png' style={{height:"15px", cursor:"pointer", marginLeft:"5px"}} />
          </div>
        </div>
      </div>
    )
  }

  function renderFocusedEventContent(eventInfo) {
    return ( 
      <div style={{height: "100%", width:"100%", backgroundColor: eventInfo.backgroundColor, border:`2px solid ${eventInfo.borderColor}`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"space-between", padding:"2px", opacity:focusedIsChecked.some(set=> eventInfo.event._def.extendedProps.programSet.includes(set)) ? "1" : "0.2"}} id={eventInfo.event._def.extendedProps.uuid}>
        <div style={{width: "100%", overflow:"clip", display:"flex", flexDirection:"column", alignItems:"center"}}>
          <b style={{padding:"7px 5px", backgroundColor:"white", color:"black", border:"1px solid black", marginBottom:"5px"}}>{eventInfo.timeText}</b>
          <p style={{padding:"7px 5px", backgroundColor:"white", color:"black", border:"1px solid black", marginBottom:"5px"}}>{eventInfo.event.extendedProps.course}</p>
          <p style={{padding:"7px 5px", backgroundColor:"white", color:"black", border:"1px solid black", marginBottom:"5px"}}>{eventInfo.event.extendedProps.room}</p>
          <p style={{padding:"7px 5px", backgroundColor:"white", color:"black", border:"1px solid black", marginBottom:"5px"}}>
            {eventInfo.event.extendedProps.programSet.map((o,i)=>{
              if(eventInfo.event.extendedProps.programSet.length <= 1 || i == eventInfo.event.extendedProps.programSet.length-1){
                return(
                  `${o}`
                )
              } else {
                return(
                  `${o}, `
                )
              }
            })}
          </p>
          <div style={{display:"flex", alignItems:"center", padding:"7px 5px", backgroundColor:"white", color:"black", border:"1px solid black", marginBottom:"5px"}}>
            <p>{eventInfo.event.extendedProps.faculty}</p>
          </div>
          
        </div>
      </div>
    )
  }
}