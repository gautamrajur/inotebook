import React, { useState } from "react";
// eslint-disable-next-line 
import { json } from "react-router-dom";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = 'http://localhost:4000'
  const notesInital = [ ];
  const [notes, setNotes] = useState(notesInital);

    //Get all notes
    const getAllNotes = async() => {

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiYzU0NTEwZWUzNzQxNTc1ZDM3NWIyIn0sImlhdCI6MTY3NDIwNDM0MH0.DAhkAbXs1dr7gR0w3tsgMEWnUBIVFjc_Ae3uuFsRMo0"
      },
   
    });
    const json = await response.json()
    console.log(json);
    setNotes(json)
   
  };
  //Add a note
  const addNote = async(title, description, tag) => {

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiYzU0NTEwZWUzNzQxNTc1ZDM3NWIyIn0sImlhdCI6MTY3NDIwNDM0MH0.DAhkAbXs1dr7gR0w3tsgMEWnUBIVFjc_Ae3uuFsRMo0"
      },
      body: JSON.stringify({title,description,tag})
    });
 
    console.log("adding a new note" + response);
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  //delete a note
  const deleteNote = async(id) => {

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiYzU0NTEwZWUzNzQxNTc1ZDM3NWIyIn0sImlhdCI6MTY3NDIwNDM0MH0.DAhkAbXs1dr7gR0w3tsgMEWnUBIVFjc_Ae3uuFsRMo0"
      },
      
    });

    const json =  response.json();
    console.log(json)
    //TODO: API call
    console.log("deleting the note with id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //Edit a note
  const editNote = async(id,title, description,tag) => {

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiYzU0NTEwZWUzNzQxNTc1ZDM3NWIyIn0sImlhdCI6MTY3NDIwNDM0MH0.DAhkAbXs1dr7gR0w3tsgMEWnUBIVFjc_Ae3uuFsRMo0"
      },
      body: JSON.stringify({title,description,tag})
    });

    const json = await response.json();
    console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes))
    //Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = notes[index];
      if(element._id === id){
        newNotes[index].title = title
        newNotes[index].description = description
        newNotes[index].tag = tag
        break;
      }
      
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getAllNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
