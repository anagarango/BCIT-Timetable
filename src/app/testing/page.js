'use client'

import React, { useEffect } from 'react'
import { useState, useRef } from 'react'




export default function Page(){

  const [selectingProgramSets, setSelectingProgramSets] = useState([])
  const [set, setSets] = useState([]);

  useEffect(()=>{
    setSelectingProgramSets(JSON.parse(localStorage.getItem("Program/Sets")) !== null ? JSON.parse(localStorage.getItem("Program/Sets")) : [])
  },[])

  function handleSelectSets(selectedSet){
    if(set.includes(selectedSet)){
      setSets((prevSet) => {
        return prevSet.filter((item) => item !== selectedSet);
      });

    } else{
      setSets((prevSet)=> {
        return [...prevSet, selectedSet]
      })
    }
   
  }

  return (
      <div style={{marginTop:"10px", display:"flex", flexWrap:"wrap"}}>
        Testing
        {selectingProgramSets.map((o,i)=> {
          return(
            <p key={i} onClick={()=> handleSelectSets(o)} style={{padding:"5px", width:"fit-content", border:"1px solid black", backgroundColor:set.includes(o) ? "#B5AEE9" : "white", marginRight:"10px"}}>{o}</p>
          )
        })}
      </div>
  )
}

//! now was working with this code
 
// useEffect(()=>{
//   setFilters([
//     JSON.parse(localStorage.getItem("Course")) !== null ? JSON.parse(localStorage.getItem("Course")) : localStorage.setItem("Course", JSON.stringify([])), 
//     JSON.parse(localStorage.getItem("Room")) !== null ? JSON.parse(localStorage.getItem("Room")) : localStorage.setItem("Room", JSON.stringify([])), 
//     JSON.parse(localStorage.getItem("Program/Sets")) !== null ? JSON.parse(localStorage.getItem("Program/Sets")) : localStorage.setItem("Program/Sets", JSON.stringify([])), 
//     JSON.parse(localStorage.getItem("Faculty")) !== null ? JSON.parse(localStorage.getItem("Faculty")) : localStorage.setItem("Faculty", JSON.stringify([]))
//   ]);

//   setFocusedIsChecked(JSON.parse(localStorage.getItem("Program/Sets")) !== null ? JSON.parse(localStorage.getItem("Program/Sets")) : localStorage.setItem("Program/Sets", JSON.stringify([])));

//   setEvents(JSON.parse(localStorage.getItem("Events")).length > 0 ? JSON.parse(localStorage.getItem("Events")) : eventsList)

// // if (JSON.parse(localStorage.getItem("Events")).length > 0) {
// //   setEvents(JSON.parse(localStorage.getItem("Events")));
// // } else {
// //   setEvents(eventsList);
// //   localStorage.setItem("Events", JSON.stringify(eventsList));
  
// // }
// // console.log(localStorage.setItem("Events", JSON.stringify(eventsList)))
// }, [])

// useEffect(() => {
//   localStorage.setItem("Events", JSON.stringify(events));
//   // console.log(localStorage.Events)
// }, [events]);