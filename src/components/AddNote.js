import React, { useContext, useState } from 'react'
import NoteContext from '../context/noteContext';

const AddNote = (props) => {

    const context = useContext(NoteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title:"",description:"",tag:""});

    const onChange =(event)=>{
        setNote({...note,[event.target.name]:event.target.value});
    }

    const handleClick = (event)=>{
        event.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""});
        props.alert("Note added successfully","success");
    }

  return (
    <div>
      <div className="container my-3">
      <h2 className='my-3'>Add a Note</h2>
      <form>
        <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name='title' value={note.title} aria-describedby="title" onChange={onChange}/>
        </div>
        <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange}/>
        </div>
        <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange}/>
        </div>
            <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add</button>
        </form>
      </div>
    </div>
  )
}

export default AddNote
