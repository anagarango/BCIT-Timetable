import { getUniqueDomId } from '@fullcalendar/core/internal'

export const eventsList = [
    {
      title: "Advanced Dynamic Content",
      start: "2023-07-31T08:30:00",
      end: "2023-07-31T11:20:00",
      course: "MDIA 2100",
      room: "SE14 120",
      programSet: ["D3 Set B"],
      faculty: "Henry Leung",
      color:"#465C7D",
      uuid: getUniqueDomId(),
      groupId: getUniqueDomId(),
      daysOfWeek: [ '1' ],
      startTime: '12:30:00',
      endTime: '17:20:00',
      startRecur:"2023-07-31T12:30:00",
      endRecur:"2023-08-31T12:30:00"
    },
    {
      title: "Advanced Photoshop",
      course: "MDIA 1055",
      room: "SE14 120",
      programSet: ["D3 Set C"],
      faculty: "Daemon Baldwin",
      color:"#467D5C",
      uuid: getUniqueDomId(),
      groupId: getUniqueDomId(),
      daysOfWeek: [ '1' ],
      startTime: '08:30:00',
      endTime: '11:20:00',
      startRecur:"2023-07-31T08:30:00",
      endRecur:"2023-08-31T11:20:00"
    },
    {
      title: "Business Comunnications",
      course: "COMM 1118",
      room: "SE06 106",
      programSet: ["D3 Set C"],
      faculty: "Bahareh Shahabi",
      color:"#467D5C",
      uuid: getUniqueDomId(),
      groupId: getUniqueDomId(),
      daysOfWeek: [ '2' ],
      startTime: '08:30:00',
      endTime: '11:20:00',
      startRecur:"2023-07-31T08:30:00",
      endRecur:"2023-08-31T11:20:00"
    },
    {
      title: "Project Management",
      course: "MKTG 1102",
      room: "SW05 1850",
      programSet: ["D3 Set C"],
      faculty: "Linda Butterfield",
      color:"#467D5C",
      uuid: getUniqueDomId(),
      groupId: getUniqueDomId(),
      daysOfWeek: [ '5' ],
      startTime: '09:30:00',
      endTime: '12:20:00',
      startRecur:"2023-07-25T09:30:00",
      endRecur:"2023-08-31T12:20:00"
    },
    {
      title: "Advanced Dynamic Content",
      course: "MDIA 2100",
      room: "SE14 120",
      programSet: ["D3 Set A"],
      faculty: "Henry Leung",
      color:"#CD7E7E",
      uuid: getUniqueDomId(),
      groupId: getUniqueDomId(),
      daysOfWeek: [ '4' ],
      startTime: '14:30:00',
      endTime: '17:20:00',
      startRecur:"2023-07-27T14:30:00",
      endRecur:"2023-08-27T17:20:00"
    },
    {
      title: "Project Management",
      course: "MKTG 1102",
      room: "SW05 1850",
      programSet: ["D3 Set A"],
      faculty: "Linda Butterfield",
      color:"#CD7E7E",
      uuid: getUniqueDomId(),
      groupId: getUniqueDomId(),
      daysOfWeek: [ '2' ],
      startTime: '10:30:00',
      endTime: '13:20:00',
      startRecur:"2023-07-24T10:30:00",
      endRecur:"2023-08-24T13:30:00"
    },
    {
      title: "Design Fundamentals",
      course: "MDIA 1055",
      room: "NE01 338",
      programSet: ["D3 Set A","D3 Set B","D3 Set C"],
      faculty: "Darinka Aguirre Amador",
      color:"#F0E580",
      uuid: getUniqueDomId(),
      groupId: getUniqueDomId(),
      daysOfWeek: [ '3' ],
      startTime: '12:30:00',
      endTime: '17:20:00',
      startRecur:"2023-07-31T12:30:00",
      endRecur:"2023-08-31T12:30:00"
    }
  ]

export const coursesList = [
  "COMM 1118",
  "COMP 1170",
  "MDIA 1055",
  "MDIA 1106",
  "MDIA 1620",
  "MDIA 2100",
  "MDIA 2536",
  "MKTG 1102",
  "OPTM 1173"
]

export const roomsList = [
  "SW01 1021",
  "SW01 2020",
  "SW03 1710",
  "SW05 1850",
  "SE06 106",
  "SE14 120",
  "SE14 121",
  "NE01 338"
]

export const facultyList = [
  "Bahareh Shahabi",
  "Chris Chehelamirani",
  "Daemon Baldwin",
  "Darinka Aguirre Amador",
  "Monika Szucs",
  "Mahmoud Abdel-Hai",
  "Shahab Pourtalebi",
  "Margaret Vicic",
  "Linda Butterfield"
]

export const programSetsList = [
  "D3 Set A",
  "D3 Set B",
  "D3 Set C"
]