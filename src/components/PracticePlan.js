// src/components/PracticePlan.js

// 1. Accept sessionNotes and setSessionNotes as props
function PracticePlan({ plan, removeFromPlan, sessionNotes, setSessionNotes }) {
  return (
    <div>
      <h2>Today's Plan</h2>
      {plan.length === 0 ? (
        <p>Your practice plan is empty. Go to the Drill Library to add some drills!</p>
      ) : (
        <div className="drills-list">
          {plan.map(drill => (
            <div key={drill.id} className="drill-item">
              <div className="drill-header">
                <span>
                  <strong>{drill.title}</strong>
                  <span className="drill-category-badge">{drill.category}</span>
                </span>
                <button onClick={() => removeFromPlan(drill.id)} className="delete-btn">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 2. Add the Session Notes / Swing Analysis section */}
      <div className="session-notes">
        <h3>Session Notes & Swing Analysis</h3>
        <textarea 
          value={sessionNotes}
          onChange={(e) => setSessionNotes(e.target.value)}
          placeholder="Log your feel notes, swing thoughts, and analysis for this session here..."
        />
      </div>
    </div>
  );
}

export default PracticePlan;
