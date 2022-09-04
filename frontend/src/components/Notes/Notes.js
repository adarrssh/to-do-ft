/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react'
import "./Notes.css"
import NotesEl from './NotesEl'
import { useNavigate } from 'react-router-dom'
import CreateIcon from '@mui/icons-material/Create';
import LoadNotes from './LoadNotes';

export const heading =()=>{
        
}

const Notes = (props) => {

    
    const Navigate = useNavigate()
    const ref = useRef(null)
    const refClose = useRef(null)
    const url = 'https://to-do-bk.herokuapp.com/api/notes/fetchallnotes'
    // stores the notes from api
    const [notes, setNotes] = useState([])

    const [updateNote, setUpdateNote] = useState({ id: "", etitle: "", edescription: "" });


    const onChange = (e) => {
        setUpdateNote({ ...updateNote, [e.target.name]: e.target.value })
    }



    // delte note function
    const delteNote = async (id) => {
        const response = await fetch(`https://to-do-bk.herokuapp.com/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = response.json();
        // console.log(json);
        props.showAlert("Note successfully deleted", "success")
        const filterNotes = notes.filter((note) => { return note._id !== id })
        setNotes(filterNotes)

    }

    // update Note
    const handleUpdateNote = async (e) => {
        const id = updateNote.id
        const title = updateNote.etitle;
        const description = updateNote.edescription;
        refClose.current.click()

        const response = await fetch(`https://to-do-bk.herokuapp.com/api/notes/updateNote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description })
        });

        const note = await response.json();

        props.showAlert("Note successfully updated", "success")

        setNotes(note[0].notes)

    }

    const updateNoteEl = async (currentNote) => {
        ref.current.click();
        const { title, description, _id } = currentNote
        console.log(title, description, _id);
        setUpdateNote({ id: _id, etitle: title, edescription: description })
    }



    useEffect(() => {
        if (!localStorage.getItem('token')) {
            Navigate('/login')
        } else {


            async function calldata(url) {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        "auth-token": localStorage.getItem('token')
                    }
                });
                const json = await response.json()
                // console.log(json[0].notes);
                setNotes(json[0].notes)
            }
            calldata(url);
        }
        // console.log(notes)
    }, [Navigate])

   

    return (
        <div className="container">
            <div className='row my-3'>
                <div className='heading-search'>
                    {/* this butotn is not working */}
                    <button type='button' onClick={() => { 
                        Navigate('/addnote')
                         }} className='btn btn-outline-primary' id='addNote' >
                        Add Note <CreateIcon className='create-icon' />
                    </button>
                </div>

                
                {
                    notes.length === 0 ?
                       <LoadNotes/> :
                        notes.map((note, key) => {
                            return (
                                <NotesEl key={key} note={note} delteNote={delteNote} updateNoteEl={updateNoteEl} />
                            )
                        })
                }

            </div>



            {/* Update Note popup */}

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={updateNote.etitle || ""} aria-describedby="emailHelp" onChange={onChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea type="text" className="form-control" id="edescription" name="edescription" value={updateNote.edescription || ""} onChange={onChange}
                                    />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-outline-primary" data-bs-dismiss="modal">Close</button>
                            <button
                                onClick={handleUpdateNote}
                                type="button" className="btn btn-outline-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>




        </div>
    )
}

export default Notes


