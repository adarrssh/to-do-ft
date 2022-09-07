/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react'
import "./Notes.css"
import NotesEl from './NotesEl'
import { useNavigate } from 'react-router-dom'
import CreateIcon from '@mui/icons-material/Create';
import LoadNotes from './LoadNotes';
import { useDispatch,useSelector } from 'react-redux';
import { getNoteItems } from '../../features/noteSlice';
import { deleteNotes,updateNotes } from '../../features/noteSlice';
import Spinner from '../Spinner/Spinner';

const Notes = (props) => {
    const {notesArray,isLoading} = useSelector((store)=>store.note)
    const dispatch = useDispatch()
    
    const Navigate = useNavigate()
    const ref = useRef(null)
    const refClose = useRef(null)

    const [updateNote, setUpdateNote] = useState({ id: "", etitle: "", edescription: "" });

    
    const onChange = (e) => {
        setUpdateNote({ ...updateNote, [e.target.name]: e.target.value })
    }



    
    // delte note function
    const delteNote = async (id) => {
        dispatch(deleteNotes(id))
    }

    // update Note
    const handleUpdateNote = async (e) => {
        const id = updateNote.id
        const title = updateNote.etitle;
        const description = updateNote.edescription;
        refClose.current.click()
        dispatch(updateNotes({id:id,title:title,description:description}))

    }
    
    const updateNoteEl = async (currentNote) => {
        ref.current.click();
        const { title, description, _id } = currentNote
        setUpdateNote({ id: _id, etitle: title, edescription: description })
    }
    
    
   useEffect(()=>{
    if(!localStorage.getItem("token")){
        Navigate('/login')
    }
   },[Navigate])

    return (
        <div className="container">
            <div className='row my-3'>
                <div className='heading-search'>
                    <button type='button' onClick={() => { 
                        Navigate('/addnote')
                         }} className='btn btn-outline-primary' id='addNote' >
                        Add Note <CreateIcon className='create-icon' />
                    </button>
                </div>

                
                {
                    notesArray.length === 0 ?
                       <LoadNotes/> :
                        notesArray.map((note, key) => {
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


