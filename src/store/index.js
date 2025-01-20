import { configureStore } from '@reduxjs/toolkit'
import { notesListReducer } from './slices/notesSlice'

/* Preload the notesList from localStorage */
const preloadedState = {
  notesListReducer : {
    notesList: getListFromLocalStorage()
  },
};

function getListFromLocalStorage() {
  try {
    const data = localStorage.getItem('notesList');
    return data ? JSON.parse(data) : []; 
  } catch (error) {
    console.error("Could not load state from localStorage:", error);
    return []; 
  }
};

/* Create the store */
export const store = configureStore({
  reducer: {
    notesListReducer
  },
  preloadedState
})

/* Subscribe to store to save in localStorage */
function subscribeToStore(store) {
  store.subscribe(function() {
    try {
      const state = store.getState(); 
      const notesList = state.notesListReducer.notesList; 
      const serializedState = JSON.stringify(notesList); 
      localStorage.setItem("notesList", serializedState);

    } catch (error) {
      console.error("Could not save state to localStorage:", error);
    }
  });
}

subscribeToStore(store);