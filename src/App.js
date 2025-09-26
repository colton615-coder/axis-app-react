import { useState, useEffect } from 'react';
import './App.css';

import Drills from './components/Drills';
import Notepad from './components/Notepad';
import PracticePlan from './components/PracticePlan'; // Import our new component

function App() {
  const [activeTab, setActiveTab] = useState('Plan');
  
  // State for the practice plan now lives in the main App component
  const [plan, setPlan] = useState(() => {
    const savedPlan = localStorage.getItem('axis-app-plan');
    return savedPlan ? JSON.parse(savedPlan) : [];
  });

  // Effect to save the plan to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('axis-app-plan', JSON.stringify(plan));
  }, [plan]);

  // Function to add a drill to the plan
  const addToPlan = (drillToAdd) => {
    // Prevent adding the same drill twice
    if (!plan.find(drill => drill.id === drillToAdd.id)) {
      setPlan([...plan, drillToAdd]);
    }
  };
  
  // Function to remove a drill from the plan
  const removeFromPlan = (idToRemove) => {
    setPlan(plan.filter(drill => drill.id !== idToRemove));
  };

  return (
    <div className="App">
      <header className="App-header"><h1>Axis Golf Trainer</h1></header>
      <nav className="App-nav">
        <button className={activeTab === 'Plan' ? 'nav-tab active' : 'nav-tab'} onClick={() => setActiveTab('Plan')}>Today's Plan</button>
        <button className={activeTab === 'Library' ? 'nav-tab active' : 'nav-tab'} onClick={() => setActiveTab('Library')}>Drill Library</button>
        <button className={activeTab === 'Notepad' ? 'nav-tab active' : 'nav-tab'} onClick={() => setActiveTab('Notepad')}>Notepad</button>
      </nav>
      <main className="App-main">
        {/* Render components based on the active tab */}
        {activeTab === 'Plan' && <PracticePlan plan={plan} removeFromPlan={removeFromPlan} />}
        {activeTab === 'Library' && <Drills addToPlan={addToPlan} />}
        {activeTab === 'Notepad' && <Notepad />}
      </main>
    </div>
  );
}

export default App;
