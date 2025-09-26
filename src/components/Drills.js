// src/components/Drills.js

import { useState, useEffect } from 'react';

// The component now receives the 'addToPlan' function as a prop
function Drills({ addToPlan }) {
  const [drills, setDrills] = useState(() => {
    const savedDrills = localStorage.getItem('axis-app-drills');
    return savedDrills ? JSON.parse(savedDrills) : [];
  });

  const [newDrill, setNewDrill] = useState({
    title: '', category: 'Putting', description: ''
  });
  
  const [openDrillId, setOpenDrillId] = useState(null);

  useEffect(() => {
    localStorage.setItem('axis-app-drills', JSON.stringify(drills));
  }, [drills]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDrill({ ...newDrill, [name]: value });
  };

  const handleAddDrill = (e) => {
    e.preventDefault();
    if (!newDrill.title || !newDrill.description) return;
    const drillToAdd = { ...newDrill, id: Date.now() };
    setDrills([...drills, drillToAdd]);
    setNewDrill({ title: '', category: 'Putting', description: '' });
  };

  const handleDeleteDrill = (idToDelete) => {
    setDrills(drills.filter(drill => drill.id !== idToDelete));
  };
  
  const toggleDrill = (id) => {
    setOpenDrillId(openDrillId === id ? null : id);
  };

  return (
    <div className="drills-container">
      <h2>Add a New Drill to Your Library</h2>
      <form onSubmit={handleAddDrill} className="drill-form">
        {/* Form inputs are unchanged */}
        <input name="title" value={newDrill.title} onChange={handleInputChange} placeholder="Drill Title" required />
        <select name="category" value={newDrill.category} onChange={handleInputChange}>
          <option>Putting</option><option>Chipping</option><option>Pitching</option><option>Irons</option><option>Wedges</option><option>Driving</option>
        </select>
        <textarea name="description" value={newDrill.description} onChange={handleInputChange} placeholder="Describe the drill..." required />
        <button type="submit">Save to Library</button>
      </form>

      <div className="drills-list">
        <h3>Drill Library</h3>
        {drills.map(drill => (
          <div key={drill.id} className="drill-item">
            <div className="drill-header" onClick={() => toggleDrill(drill.id)}>
              <span><strong>{drill.title}</strong><span className="drill-category-badge">{drill.category}</span></span>
              <div>
                {/* This button now calls the function passed from App.js */}
                <button onClick={(e) => { e.stopPropagation(); addToPlan(drill); }} className="add-to-plan-btn">Add to Plan</button>
                <button onClick={(e) => { e.stopPropagation(); handleDeleteDrill(drill.id); }} className="delete-btn">Delete</button>
              </div>
            </div>
            {openDrillId === drill.id && (
              <div className="drill-content"><p>{drill.description}</p></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Drills;
