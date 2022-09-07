import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = 'https://to-do-bk.herokuapp.com/api/notes/fetchallnotes'

const initialState = {
  notesArray: [],
  isLoading: false
}



export const getNoteItems = createAsyncThunk(
  'cart/getNotes',
  async () => {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json()
    // console.log(response.json());
    return json

  }
);

export const addNoteItem = createAsyncThunk(
  'cart/createNotes',
  async (name) => {
    // console.log(name);
    const title = name.title;
    const description = name.description;
    const response = await fetch(`https://to-do-bk.herokuapp.com/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description })
    });

    const json = await response.json()
    // console.log(response);
    return json;

  }
);


export const deleteNotes = createAsyncThunk(
  'cart/deleteNotes',
  async (id) => {
    console.log(id);
    const response = await fetch(`https://to-do-bk.herokuapp.com/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json()

    return json;

  }
);

export const updateNotes = createAsyncThunk(
  'cart/updateNotes',
  async (name) => {
    const id = name.id
    const title = name.title;
    const description = name.description;
    console.log(id, title, description);

    const response = await fetch(`https://to-do-bk.herokuapp.com/api/notes/updateNote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description })
    });

    const note = await response.json();
    console.log(note[0].notes);

    return note[0].notes;

  }
);


const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers:{
    clearNote:(state)=>{
      state.notesArray=[];
    }
  },
  extraReducers(builder) {
    builder
      .addCase
      (getNoteItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNoteItems.fulfilled, (state, action) => {
        // console.log("fullfilled");

        state.isLoading = false;
        // console.log(action.payload);
        state.notesArray = action.payload[0].notes;
        return;
      })
      .addCase(getNoteItems.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addNoteItem.pending, (state, action) => {
        state.isLoading = true;
        // console.log("pending")
      })
      .addCase(addNoteItem.fulfilled, (state, action) => {
        // console.log("fullfilled");
        state.isLoading = false;
        state.notesArray = action.payload.notes[0].notes
        // console.log(action.payload.notes[0].notes);
      })
      .addCase(addNoteItem.rejected, (state, action) => {
        state.isLoading = false;
        // console.log("rejected");
      })
      .addCase(deleteNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("fullfilled");
        state.notesArray = action.payload[0].notes;
      })
      .addCase(updateNotes.pending, (state, action) => {
        state.isLoading = true;
        console.log("pending");
      })
      .addCase(updateNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("fullfilled");
        console.log(action.payload);
        state.notesArray = action.payload
      })
  }

})

export const {clearNote} = noteSlice.actions;

export default noteSlice.reducer;