

import AddNote from "./AddNote";
import Noteitems from "./Noteitems";
import { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../Context/Notes/noteContext";

const Notes = () => {


  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
  const context = useContext(NoteContext);
  const { notes, getAllNotes, editNote } = context;

  useEffect(() => {
    getAllNotes()
  },[])

  const ref = useRef(null)
  const refClose = useRef(null)
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
  }
  const handleClick = (e) => {
    console.log("updating a note", note)
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>
      <AddNote />
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" ref={refClose} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3 my-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" value={note.etitle} onChange={onChange}   minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea className="form-control" id="edescription" name='edescription' rows="5" onChange={onChange} value={note.edescription}  minLength={5} required ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="Tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name='etag' onChange={onChange}  minLength={5} required value={note.etag} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Discard changes</button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h1>Your Notes</h1>
          <p className="mx-2">{notes.length===0 && 'No Notes to display'}</p>
         {notes.map((note) => {
          return <Noteitems key={note._id} updateNote={updateNote} note={note}></Noteitems>;
        })}
      </div>
    </>
  );
}



export default Notes
