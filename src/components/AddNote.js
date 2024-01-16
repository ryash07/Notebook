import React, { useContext, useState } from 'react'
import NoteContext from '../context/noteContext';

const AddNote = () => {

    const context = useContext(NoteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title:"",description:"",tag:"default"});

    const onChange =(event)=>{
        event.preventDefault();
        setNote({...note,[event.target.name]:event.target.value});
    }

    const handleClick = (event)=>{
        event.preventDefault();
        console.log("first");
        addNote(note.title,note.description,note.tag);
    }

  return (
    <div>
      <div className="container my-3">
      <h2 className='my-3'>Add a Note</h2>
      <form>
        <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name='title' aria-describedby="title" onChange={onChange}/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" className="form-control" id="description" name='description' onChange={onChange}/>
        </div>
        <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
            <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default AddNote
