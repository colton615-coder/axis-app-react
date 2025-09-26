// src/components/Notepad.js

import { useState, useEffect } from 'react';

function Notepad() {
  // 1. Update useState to load initial notes from localStorage.
  // This function now only runs on the very first render.
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('axis-app-notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  
  const [newNote, setNewNote] = useState('');

  // 2. Add a useEffect hook to save notes whenever the 'notes' state changes.
  useEffect(() => {
    localStorage.setItem('axis-app-notes', JSON.stringify(notes));
  }, [notes]); // The [notes] dependency array tells React to run this effect only when 'notes' changes.

  const handleAddNote = () => {
    if (newNote.trim() === '') return;
    setNotes([...notes, newNote]);
    setNewNote('');
  };

  const handleDeleteNote = (indexToDelete) => {
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
