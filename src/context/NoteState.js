import NoteContext from "./noteContext";
import React, { useState } from 'react'

const NoteState = (props) => {

    const host = "http://localhost:5000";

    const intitialNotes = [
      {
        "_id": "65a431174b39d8ef29bb07c4",
        "user": "65a430974b39d8ef29bb07b9",
        "title": "Better EveryDay",
        "description": "My description2",
        "tag": "Target",
        "date": "2024-01-14T19:08:07.816Z",
        "__v": 0
      },
      {
        "_id": "65a4312c4b39d8ef29bb07c3",
        "user": "65a430974b39d8ef29bb07b9",
        "title": "Sorry For Today",
        "description": "My description2",
        "tag": "Target",
        "date": "2024-01-14T19:08:28.446Z",
        "__v": 0
      },
      {
        "_id": "65a431174b39d8ef29bb07c1",
        "user": "65a430974b39d8ef29bb07b9",
        "title": "Better EveryDay",
        "description": "My description2",
        "tag": "Target",
        "date": "2024-01-14T19:08:07.816Z",
        "__v": 0
      },
      {
        "_id": "65a4312c4b39d8ef29bb07",
        "user": "65a430974b39d8ef29bb07b9",
        "title": "Sorry For Today",
        "description": "My description2",
        "tag": "Target",
        "date": "2024-01-14T19:08:28.446Z",
        "__v": 0
      },
      {
        "_id": "65a431174b39d8ef29bb07",
        "user": "65a430974b39d8ef29bb07b9",
        "title": "Better EveryDay",
        "description": "My description2",
        "tag": "Target",
        "date": "2024-01-14T19:08:07.816Z",
        "__v": 0
      },
      {
        "_id": "65a4312c4b39d8ef29bb07c2",
        "user": "65a430974b39d8ef29bb07b9",
        "title": "Sorry For Today",
        "description": "My description2",
        "tag": "Target",
        "date": "2024-01-14T19:08:28.446Z",
        "__v": 0
      },
      {
        "_id": "65a431174b39d8ef29bb07c0",
        "user": "65a430974b39d8ef29bb07b9",
        "title": "Better EveryDay",
        "description": "My description2",
        "tag": "Target",
        "date": "2024-01-14T19:08:07.816Z",
        "__v": 0
      },
      {
        "_id": "65a4312c4b39d8ef29bb07c",
        "user": "65a430974b39d8ef29bb07b9",
        "title": "Sorry For Today",
        "description": "My description2",
        "tag": "Target",
        "date": "2024-01-14T19:08:28.446Z",
        "__v": 0
      }
    ]
    
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
          "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhNDMwOTc0YjM5ZDhlZjI5YmIwN2I5In0sImlhdCI6MTcwNTI1OTE4Mn0.ENwHHqg8FXVvFCxKhVyvkH51dNSXD5z8hdEK-67ihsk"
        },
        redirect: "follow", 
        referrerPolicy: "no-referrer", 
      });
      const json = await response.json(); 
      console.log(json);
      setNotes(json);
    }

    // Add a Note
    const addNote = async(title,description,tag)=>{

      //API call


      console.log("adding a new note");
      const note = {
        "_id": "65a4312c4b39d8ef29bb07c7",
        "user": "65a430974b39d8ef29bb07b9",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2024-01-14T19:08:28.446Z",
        "__v": 0
      }
      console.log(Notes.concat(note));
      setNotes(Notes.concat(note));
    }
    // Delete a Note
    const deleteNote = (id)=>{
      console.log("deleting a note " + id);
      const newNote = Notes.filter((note)=>note._id !== id);
      setNotes(newNote);
    }
    // Edit a Note
    const editNote = (id,title,description,tag)=>{
      //APi call

      // Logic to edit a note
      for (let index = 0; index < Notes.length; index++) {
        const element = Notes[index];
        if(element._id === id){
          element.title = title;
          element.description = description;
          element.tag = tag;
        }
        
      }
    }

  return (
    <NoteContext.Provider value={{Notes,addNote,deleteNote,editNote,getAllNotes}}>
        {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState
