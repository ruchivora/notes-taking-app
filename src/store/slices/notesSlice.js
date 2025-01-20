import { createSlice } from '@reduxjs/toolkit';

const notesSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: { 
    addToList: (state, action) => {
      state.notesList = [...state.notesList, action.payload];
    },
    deleteFromList: (state, action) => {
      state.notesList = state.notesList.filter((note) => note.id !== action.payload);
    },
    updateNote: (state, action) => {
      const {id, note} = action.payload;
      const updatedList = state.notesList.map((noteItem) => {
        if(noteItem.id === id) {
          return {...note};
        }
        return noteItem;
      });
      state.notesList = updatedList
    }

  }
});

export function selectNoteById(state, id) {
  return state.notesListReducer.notesList.find(function (note) {
    return note.id === id;
  });
}

export const { addToList, deleteFromList, updateNote } = notesSlice.actions;

export const notesListReducer = notesSlice.reducer;