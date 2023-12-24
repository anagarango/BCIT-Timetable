'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heading } from '@anagarango/styled-components-starter-pack';

export default function CreateItems(){
  // localStorage.clear()
  const r = useRouter()

  const [courseTyping, setCourseTyping] = useState("")
  const [roomTyping, setRoomTyping] = useState("")
  const [facultyTyping, setFacultyTyping] = useState("")
  const [programSetsTyping, setProgramSetsTyping] = useState("")
  const [events, setEvents] = useState([])
  const [addingRoom, setAddingRoom] = useState([])
  const [addingCourse, setAddingCourse] = useState([])
  const [addingFaculty, setAddingFaculty] = useState([])
  const [addingProgramSets, setAddingProgramSets] = useState([])
  const [dataObject, setDataObject] = useState({})
  const [files, setFiles] = useState("");




  function handlePushingItemToCategoryArray(setCategory, categoryText, setCategoryText){
    setCategory((prevEvents) => [...prevEvents, categoryText]);
    setCategoryText("")
  }


  function handleDeletingCategories(category, stateCategory, setStateCategory){
    setStateCategory(stateCategory.filter((item) => item !== category));
  }


  function handleChange(e){
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = event => {
      setFiles(JSON.parse(event.target.result))
    }
    // fileReader.onload = e => {
    //   setFiles(JSON.parse(e.target.result));
    // };
  };
 



  useEffect(()=>{
    // function SecondCase(localStorageCategory, preloadedList){
    //   localStorage.setItem(localStorageCategory, JSON.stringify(preloadedList));
    //   return preloadedList
    // }

    setAddingRoom(JSON.parse(localStorage.getItem("Room")) !== null ? JSON.parse(localStorage.getItem("Room")) : [])
    setAddingCourse(JSON.parse(localStorage.getItem("Course")) !== null ? JSON.parse(localStorage.getItem("Course")) : [])
    setAddingFaculty(JSON.parse(localStorage.getItem("Faculty")) !== null ? JSON.parse(localStorage.getItem("Faculty")) : [])
    setAddingProgramSets(JSON.parse(localStorage.getItem("Program/Sets")) !== null ? JSON.parse(localStorage.getItem("Program/Sets")) :[])
    setEvents(JSON.parse(localStorage.getItem("Events")) !== null ? JSON.parse(localStorage.getItem("Events")) :[])

    setDataObject({
      Course: localStorage.getItem('Course'),
      Events:  localStorage.getItem('Events'),
      Faculty: localStorage.getItem('Faculty'),
      'Program/Sets': localStorage.getItem('Program/Sets'),
      Room: localStorage.getItem('Room'),
    })
  },[])


  useEffect(()=>{
    if(files){
      setAddingRoom(addingRoom.concat(files.Room))
      setAddingCourse(addingCourse.concat(files.Course))
      setAddingFaculty(addingFaculty.concat(files.Faculty))
      setAddingProgramSets(addingProgramSets.concat(files['Program/Sets']))
      setEvents(JSON.parse(localStorage.getItem('Events')).concat(files.Events))
    }
  },[files])


  useEffect(() => {
    // uPDATES lOCAL sTORAGE wHENEVER aDDINGrOOM sTATE cHANGES
    localStorage.setItem("Room", JSON.stringify(addingRoom))
    localStorage.setItem("Course", JSON.stringify(addingCourse))
    localStorage.setItem("Faculty", JSON.stringify(addingFaculty))
    localStorage.setItem("Program/Sets", JSON.stringify(addingProgramSets))
    localStorage.setItem("Events", JSON.stringify(events))


    setDataObject({
      Course: addingCourse,
      Events:  events,
      Faculty: addingFaculty,
      'Program/Sets': addingProgramSets,
      Room: addingRoom,
    })
  }, [addingRoom, addingCourse, addingFaculty, addingProgramSets, events])


  

  return(
    <div style={{margin:"15px"}}>
      <div style={{display:"flex", justifyContent:"space-between"}}>
        <div>
          <Heading>Create Items</Heading>
          <p style={{margin:"0 0 20px 0"}}>Use this page to create blocks of information to fill the containers you create on the schedules page.</p>
          <a href={`data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(dataObject, null, 2))}`} download="localStorageData.json" style={{padding:"10px", backgroundColor:"lightgreen", marginRight:"30px", border:"1px solid black"}}>Download Calendar Data</a>
          <input type="file" accept=".json" onChange={handleChange} />
        </div>
        <p style={{padding:"20px", backgroundColor:"lightblue", height:"fit-content", border:"1px solid black"}} onClick={()=>r.push("/fullcalendar")}>Go to Calendar</p>
      </div>
      
      <br />
      

      <div style={{backgroundColor:"#d3d3d3", padding: "25px", margin:"40px 0px"}}>
        <div>
          <h2 >Category 1: Room</h2>
          <h4 style={{marginTop:"20px"}}>Category Items</h4>
          <p>Enter a label for a new category item</p>
          <input
            type="text"
            value={roomTyping}
            onChange={(e) => setRoomTyping(e.target.value)}
            style={{marginTop:"10px"}}
          />
          <button style={{padding:"0px 5px"}} onClick={()=>handlePushingItemToCategoryArray(setAddingRoom, roomTyping, setRoomTyping)}>Add</button>
        </div>
        <div style={{marginTop:"30px", display:"flex", flexWrap:"wrap"}}>
          {addingRoom.map((o,i)=> {
            return(
              <div key={i} style={{display:"flex", alignItems:"center", padding:"5px", backgroundColor:"white", width:"fit-content", border:"1px solid black",  margin:"5px"}}>
                <p style={{marginRight:"10px"}}>{o}</p>
                <p onClick={()=>handleDeletingCategories(o, addingRoom, setAddingRoom)}>x</p>
              </div>
            )
          })}
        </div>
      </div>

      <div style={{backgroundColor:"#d3d3d3", padding: "25px", margin:"40px 0px"}}>
        <div>
        <h2 >Category 2: Course</h2>
          <h4 style={{marginTop:"20px"}}>Category Items</h4>
          <p>Enter a label for a new category item</p>
          <input
            type="text"
            value={courseTyping}
            onChange={(e) => setCourseTyping(e.target.value)}
            style={{marginTop:"10px"}}
          />
          <button style={{padding:"0px 5px"}} onClick={()=>handlePushingItemToCategoryArray(setAddingCourse, courseTyping, setCourseTyping)}>Add</button>
        </div>
        <div style={{marginTop:"30px", display:"flex", flexWrap:"wrap"}}>
          {addingCourse && addingCourse.map((o,i)=> {
            return(
              <div key={i} style={{display:"flex", alignItems:"center", padding:"5px", backgroundColor:"white", width:"fit-content", border:"1px solid black",  margin:"5px"}}>
                <p style={{marginRight:"10px"}}>{o}</p>
                <p onClick={()=>handleDeletingCategories(o, addingCourse, setAddingCourse)}>x</p>
              </div>
            )
          })}
        </div>
      </div>

      <div style={{backgroundColor:"#d3d3d3", padding: "25px", margin:"40px 0px"}}>
        <div>
        <h2 >Category 3: Faculty</h2>
          <h4 style={{marginTop:"20px"}}>Category Items</h4>
          <p>Enter a label for a new category item</p>
          <input
            type="text"
            value={facultyTyping}
            onChange={(e) => setFacultyTyping(e.target.value)}
            style={{marginTop:"10px"}}
          />
          <button style={{padding:"0px 5px"}} onClick={()=>handlePushingItemToCategoryArray(setAddingFaculty, facultyTyping, setFacultyTyping)}>Add</button>
        </div>
        <div style={{marginTop:"30px", display:"flex", flexWrap:"wrap"}}>
          {addingFaculty.map((o,i)=> {
            return(
              <div key={i} style={{display:"flex", alignItems:"center", padding:"5px", backgroundColor:"white", width:"fit-content", border:"1px solid black",  margin:"5px"}}>
                <p style={{marginRight:"10px"}}>{o}</p>
                <p onClick={()=>handleDeletingCategories(o, addingFaculty, setAddingFaculty)}>x</p>
              </div>
            )
          })}
        </div>
      </div>

      <div style={{backgroundColor:"#d3d3d3", padding: "25px", margin:"40px 0px"}}>
        <div>
        <h2 >Category 4: Program / Sets</h2>
          <h4 style={{marginTop:"20px"}}>Category Items</h4>
          <p>Enter a label for a new category item</p>
          <input
            type="text"
            value={programSetsTyping}
            onChange={(e) => setProgramSetsTyping(e.target.value)}
            style={{marginTop:"10px"}}
          />
          <button style={{padding:"0px 5px"}} onClick={()=>handlePushingItemToCategoryArray(setAddingProgramSets, programSetsTyping, setProgramSetsTyping)}>Add</button>
        </div>
        <div style={{marginTop:"30px", display:"flex", flexWrap:"wrap"}}>
          {addingProgramSets.map((o,i)=> {
            return(
              <div key={i} style={{display:"flex", alignItems:"center", padding:"5px", backgroundColor:"white", width:"fit-content", border:"1px solid black",  margin:"5px"}}>
                <p style={{marginRight:"10px"}}>{o}</p>
                <p onClick={()=>handleDeletingCategories(o, addingProgramSets, setAddingProgramSets)}>x</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}