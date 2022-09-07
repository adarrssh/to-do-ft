import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./AddNote.css";
import { addNoteItem } from '../../features/noteSlice';
import { useDispatch } from 'react-redux';

const AddNote = (props) => {
    const dispatch = useDispatch()
    const Navigate = useNavigate();
    const [newNotes, setNewNotes] = useState({ title: "", description: "" });


    const onhandleChange = e => {
        const { name, value } = e.target
        setNewNotes({
            ...newNotes,
            [name]: value
        })

    }

    const handleClick = (e) => {
        e.preventDefault();
        if(!newNotes.title && !newNotes.description){
            props.showAlert("Inputs required", "warning")

        }else{

            // console.log(newNotes.title, newNotes.description);
            Navigate('/notes')
            dispatch(addNoteItem(newNotes))
            setNewNotes({ title: "", description: "" })
        }
    }


    return (

        <div className='addNote-body'>

            <button className='btn btn-outline-primary center-btn' onClick={() => { Navigate('/notes') }}>Go back to notes</button>

            {/* <!-- Modal --> */}
            <div className="card">
                <div className="card-body">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Add a new note</h5>

                    </div>
                    <div className="card-grey-line">

                    </div>

                    <div className="mb-3">
                        <label>Title</label>
                        <input className="form-control my-3" name="title" onChange={onhandleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                        <textarea className="form-control my-3" name="description" onChange={onhandleChange} />
                        <button type="submit" onClick={handleClick} className="btn btn-outline-primary   my-3">Submit</button>
                        <button onClick={() => { Navigate('/notes') }} className="btn btn-outline-primary mx-3 my-3">Close</button>

                    </div>

                </div>
            </div>
        </div>

    )
}

export default AddNote


