import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = 'https://to-do-bk.herokuapp.com/api/notes/fetchallnotes'

const initialState ={
    notesArray:[],
    isLoading:false
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
      // console.log(response.json());
    return response.json();

    }
  );

  export const addNoteItem = createAsyncThunk(
    'cart/cretaeNotes',
     async (name) => {
      const {title,description}=name
      const response = await fetch(`https://to-do-bk.herokuapp.com/api/notes/addnote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({ title, description })
            });

    // console.log(response);
    return response.json();

    }
  );


const noteSlice = createSlice({
    name:'notes',
    initialState,
    reducers:{

    },
    extraReducers:{
      [getNoteItems.pending]:(state)=>{
        state.isLoading=true;
      },
      [getNoteItems.fulfilled]:(state,action)=>{
        console.log("fullfilled");

        state.isLoading=false;
        console.log(action.payload[0].notes);
        state.notesArray = action.payload[0].notes;
      },
      [getNoteItems.rejected]:(state,action)=>{
        state.isLoading=(false);
      }
    }
})


export default noteSlice.reducer;