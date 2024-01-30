import NoteContext from '../context/noteContext';
import { useContext, useEffect, useRef, useState } from 'react';
import React from 'react'
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const context = useContext(NoteContext);
    const {Notes , getAllNotes , editNote} = context;
    const ref = useRef(null);
    const navigate = useNavigate();

    const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:""});

    useEffect(() => {
      if(localStorage.getItem('token')){
        getAllNotes()
        
      }else{
        navigate('/login');
      }
      // eslint-disable-next-line
    }, [])

    const onChange =(event)=>{
      setNote({...note,[event.target.name]:event.target.value});
  }
    
    const updateNote= (currentnode)=>{
      ref.current.click();
      setNote({id:currentnode._id,etitle:currentnode.title,edescription:currentnode.description,etag:currentnode.tag});
      
    }

    const handleClick = (event) =>{
      console.log("updating the node" + note.etitle);
      editNote(note.id,note.etitle,note.edescription,note.etag);
      event.preventDefault();
      props.alert("Note updated successfully","success");
    }

  return (
    <>
    <AddNote alert={props.alert}/>
   
      <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModal">
        Edit Node
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <h2 className='my-3'>Add a Note</h2>
            <form>
              <div className="mb-3">
                      <label htmlFor="etitle" className="form-label">Title</label>
                      <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="etitle" value={note.etitle} onChange={onChange}/>
              </div>
              <div className="mb-3">
                      <label htmlFor="edescription" className="form-label">Description</label>
                      <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange}/>
              </div>
              <div className="mb-3">
                      <label htmlFor="etag" className="form-label">Tag</label>
                      <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange}/>
              </div>
                  {/* <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button> */}
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick} data-bs-dismiss='modal'>Update Note</button>
            </div>
          </div>
        </div>
      </div>

    <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container">
          {
            Notes.length===0 ? "No notes to display" : ""
          }
        </div>
        {
            Notes.map((Note)=>{
                return <NoteItem key={Note._id} updateNote={updateNote} Note={Note} alert={props.alert}/>
            })

        }
      </div>
      </>
  )
}

export default Notes
