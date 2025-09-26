import { useState, useEffect } from 'react';
import './App.css';

import Drills from './components/Drills';
import Notepad from './components/Notepad';
import PracticePlan from './components/PracticePlan';

function App() {
  const [activeTab, setActiveTab] = useState('Plan');
  
  const [plan, setPlan] = useState(() => {
    const savedPlan = localStorage.getItem('axis-app-plan');
    return savedPlan ? JSON.parse(savedPlan) : [];
  });

  // 1. Add new state for the session notes
  const [sessionNotes, setSessionNotes] = useState(() => {
    const savedNotes = localStorage.getItem('axis-app-sessionNotes');
    return savedNotes || ''; // Notes are a simple string
  });

  useEffect(() => {
    localStorage.setItem('axis-app-plan', JSON.stringify(plan));
  }, [plan]);

  // 2. Add new effect to save session notes when they change
  useEffect(() => {
    localStorage.setItem('axis-app-sessionNotes', sessionNotes);
  }, [sessionNotes]);

  const addToPlan = (drillToAdd) => {
    if (!plan.find(drill => drill.id === drillToAdd.id)) {
      setPlan([...plan, drillToAdd]);
    }
  };
  
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
        {/* 3. Pass the session notes and the function to update them down to the PracticePlan component */}
        {activeTab === 'Plan' && <PracticePlan plan={plan} removeFromPlan={removeFromPlan} sessionNotes={sessionNotes} setSessionNotes={setSessionNotes} />}
        {activeTab === 'Library' && <Drills addToPlan={addToPlan} />}
        {activeTab === 'Notepad' && <Notepad />}
      </main>
    </div>
  );
}

export default App;
