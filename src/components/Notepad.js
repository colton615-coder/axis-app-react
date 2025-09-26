// src/components/Notepad.js

import { useState } from 'react';

function Notepad() {
  // State to hold the array of notes
  const [notes, setNotes] = useState([]);
  
  // State to hold the text of the new note being typed
  const [newNote, setNewNote] = useState('');

  // Function to handle adding a new note
  const handleAddNote = () => {
    // Don't add empty notes
    if (newNote.trim() === '') return;
    
    // Add the new note to the existing notes array
    setNotes([...notes, newNote]);
    
    // Clear the input field
    setNewNote('');
  };

  // Function to handle deleting a note by its index
  const handleDeleteNote = (indexToDelete) => {
    // Create a new array excluding the note at the given index
    const updatedNotes = notes.filter((_, index) => index !== indexToDelete);
    setNotes(updatedNotes);
  };

  return (
    <div className="notepad-container">
      <h2>Practice Notepad</h2>
      <div className="note-form">
        <textarea 
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Write down your swing thoughts..."
        />
        <button onClick={handleAddNote}>Save Note</button>
      </div>
      <div className="notes-list">
        {notes.map((note, index) => (
          <div key={index} className="note-item">
            <span>{note}</span>
            <button onClick={() => handleDeleteNote(index)} className="delete-btn">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notepad;
