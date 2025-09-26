import { useState } from 'react';
import './App.css';

// Import our new components
import Drills from './components/Drills';
import Notepad from './components/Notepad';

function App() {
  const [activeTab, setActiveTab] = useState('Drills');

  return (
    <div className="App">
      <header className="App-header">
        <h1>Axis Golf Trainer</h1>
      </header>
      <nav className="App-nav">
        <button 
          className={activeTab === 'Drills' ? 'nav-tab active' : 'nav-tab'} 
          onClick={() => setActiveTab('Drills')}>
          Drills
        </button>
        <button 
          className={activeTab === 'Notepad' ? 'nav-tab active' : 'nav-tab'}
          onClick={() => setActiveTab('Notepad')}>
          Notepad
        </button>
        <button 
          className={activeTab === 'Analysis' ? 'nav-tab active' : 'nav-tab'}
          onClick={() => setActiveTab('Analysis')}>
          Swing Analysis
        </button>
      </nav>
      <main className="App-main">
        {/* Conditionally render the component based on the active tab */}
        {activeTab === 'Drills' && <Drills />}
        {activeTab === 'Notepad' && <Notepad />}
        {activeTab === 'Analysis' && <h2>Swing Analysis</h2>}
      </main>
    </div>
  );
}

export default App;
