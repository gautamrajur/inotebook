import React, { useContext } from "react";
import noteContext from "../Context/Notes/noteContext";

const Noteitems = (props) => {
  const context = useContext(noteContext);
  const {deleteNote} = context
  const { note, updateNote } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title"> {note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i className="mx-2 fa-solid fa-trash" onClick={()=> {deleteNote(note._id)}}></i>
          <i className="mx-2 fa-light fa-user-pen" onClick={()=>{updateNote(note)}}></i>
        </div>
      </div>
    </div>
  );
};

export default Noteitems;
