import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import noteContext from '../context/noteContext';


const NoteItem = (props) => {

    const {Note} = props;
    const context = useContext(noteContext);
    const {deleteNote} = context;

    const handleDelete = ()=>{
      deleteNote(Note._id);
    }

  return (
    <div className='col-md-3'>
      <div className="card my-3">
        
        <div className="card-body">
            
            <div className="d-flex align-items-center">
                <h5 className="card-title">{Note.title}</h5>
                <FontAwesomeIcon className='mx-2' icon={faTrashCan} onClick={handleDelete}/>
                 <FontAwesomeIcon className='mx-2' icon={faPenToSquare} />
            </div>
            
            <p className="card-text">{Note.description}</p>
        </div>
        </div>
    </div>
  )
}

export default NoteItem
