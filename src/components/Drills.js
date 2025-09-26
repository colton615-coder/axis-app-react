// src/components/Drills.js

import { useState, useEffect } from 'react';

function Drills() {
  // State to hold the array of drill objects, loaded from localStorage
  const [drills, setDrills] = useState(() => {
    const savedDrills = localStorage.getItem('axis-app-drills');
    return savedDrills ? JSON.parse(savedDrills) : [];
  });

  // State for the form inputs
  const [newDrill, setNewDrill] = useState({
    title: '',
    category: 'Putting',
    description: ''
  });

  // State to track which drill's description is currently open
  const [openDrillId, setOpenDrillId] = useState(null);

  // Effect to save drills to localStorage whenever the drills array changes
  useEffect(() => {
    localStorage.setItem('axis-app-drills', JSON.stringify(drills));
  }, [drills]);

  // Handle changes in the form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDrill({ ...newDrill, [name]: value });
  };

  // Handle the form submission to add a new drill
  const handleAddDrill = (e) => {
    e.preventDefault();
    if (!newDrill.title || !newDrill.description) return; // Simple validation
    
    const drillToAdd = { ...newDrill, id: Date.now() };
    setDrills([...drills, drillToAdd]);
    
    // Reset form
    setNewDrill({ title: '', category: 'Putting', description: '' });
  };

  // Handle deleting a drill by its ID
  const handleDeleteDrill = (idToDelete) => {
    setDrills(drills.filter(drill => drill.id !== idToDelete));
  };
  
  // Handle toggling the accordion view
  const toggleDrill = (id) => {
    setOpenDrillId(openDrillId === id ? null : id);
  };

  return (
    <div className="drills-container">
      <h2>Add a New Drill</h2>
      <form onSubmit={handleAddDrill} className="drill-form">
        <input
          name="title"
          value={newDrill.title}
          onChange={handleInputChange}
          placeholder="Drill Title"
          required
        />
        <select name="category" value={newDrill.category} onChange={handleInputChange}>
          <option>Putting</option>
          <option>Chipping</option>
          <option>Pitching</option>
          <option>Irons</option>
          <option>Wedges</option>
          <option>Driving</option>
        </select>
        <textarea
          name="description"
          value={newDrill.description}
          onChange={handleInputChange}
          placeholder="Describe the drill..."
          required
        />
        <button type="submit">Save Drill</button>
      </form>

      <div className="drills-list">
        {drills.map(drill => (
          <div key={drill.id} className="drill-item">
            <div className="drill-header" onClick={() => toggleDrill(drill.id)}>
              <span>
                <strong>{drill.title}</strong>
                <span className="drill-category-badge">{drill.category}</span>
              </span>
              <button onClick={(e) => { e.stopPropagation(); handleDeleteDrill(drill.id); }} className="delete-btn">
                Delete
              </button>
            </div>
            {openDrillId === drill.id && (
              <div className="drill-content">
                <p>{drill.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Drills;
