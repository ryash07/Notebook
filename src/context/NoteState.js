import NoteContext from "./noteContext";
import React, { useState } from 'react'

const NoteState = (props) => {

    const host = "http://localhost:5000";

    const intitialNotes = []
    
    const [Notes , setNotes] = useState(intitialNotes);

    // Get all notes
    const getAllNotes = async()=>{

      // API call
      const url = `${host}/api/notes/fetchallnotes`;
      const response = await fetch(url, {
        method: "GET", 
        mode: "cors", 
        cache: "no-cache", 
        credentials: "same-origin", 
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem('token')
        },
        redirect: "follow", 
        referrerPolicy: "no-referrer", 
      });
      const json = await response.json(); 
      // console.log(json);
      setNotes(json);
    }

    // Add a Note
    const addNote = async(title,description,tag)=>{

      //API call
      const url = `${host}/api/notes/addnote`;
      const response = await fetch(url, {
        method: "POST", 
        mode: "cors", 
        cache: "no-cache", 
        credentials: "same-origin", 
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem('token')
        },
        redirect: "follow", 
        referrerPolicy: "no-referrer", 
        body: JSON.stringify({title,description,tag})
      });

      const note = await response.json()
      // console.log(note)

      
      // console.log(Notes.concat(note));
      setNotes(Notes.concat(note));
    }

    
    // Delete a Note
    const deleteNote = async(id)=>{
      // console.log("deleting a note " + id);

      //APi call
      const url = `${host}/api/notes/deletenote/${id}`;
      const response = await fetch(url, {
        method: "DELETE", 
        mode: "cors", 
        cache: "no-cache", 
        credentials: "same-origin", 
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem('token')
        },
        redirect: "follow", 
        referrerPolicy: "no-referrer",
      });
      const json = await response.json(); 
      console.log(json);

      const newNote = Notes.filter((note)=>note._id !== id);
      setNotes(newNote);
    }


    // Edit a Note
    const editNote = async(id,title,description,tag)=>{

      //APi call
      const url = `${host}/api/notes/updatenote/${id}`;
      const response = await fetch(url, {
        method: "PUT", 
        mode: "cors", 
        cache: "no-cache", 
        credentials: "same-origin", 
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem('token')
        },
        redirect: "follow", 
        referrerPolicy: "no-referrer",
        body: JSON.stringify({title,description,tag}) 
      });
      const json = await response.json(); 
      console.log(json);

      let newNotes = JSON.parse(JSON.stringify(Notes));

      // Logic to edit a note
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if(element._id === id){
          element.title = title;
          element.description = description;
          element.tag = tag;
          break;
        }
      }

      setNotes(newNotes);
    }

  return (
    <NoteContext.Provider value={{Notes,addNote,deleteNote,editNote,getAllNotes}}>
        {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState
