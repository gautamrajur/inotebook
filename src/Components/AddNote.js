import React from 'react'
import { useContext , useState} from "react";
import noteContext from "../Context/Notes/noteContext";

const AddNote = () => {
  const context = useContext(noteContext);
  const {addNote } = context;
  const [note, setNote] = useState({title : "", description : "", tag : ""});

  const handleClick = (e)=> {
    e.preventDefault();
    addNote(note.title, note.description, note.tag)
  }
  const onChange = (e) => {
     setNote({...note, [e.target.name] : e.target.value})
  }
  return (
    <div className="container my-3">
        <h1>Add a Note</h1>
        <form>
          <div className="mb-3 my-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea className="form-control" id="description" name='description' rows="5" onChange={onChange} minLength={5} required  ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="Tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} minLength={5} required />
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>
    </div> 
  )
}

export default AddNote
