import NoteContext from '../context/noteContext';
import { useContext, useEffect } from 'react';
import React from 'react'
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = () => {
    const context = useContext(NoteContext);
    const {Notes , getAllNotes} = context;

    useEffect(() => {
      getAllNotes()
      
    }, [])
    

  return (
    <>
    <AddNote />
    <div className="row my-3">
        <h2>Your Notes</h2>
        {
            Notes.map((Note)=>{
                return <NoteItem key={Note._id} Note={Note}/>
            })

        }
      </div>
      </>
  )
}

export default Notes
