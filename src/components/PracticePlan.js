// src/components/PracticePlan.js

function PracticePlan({ plan, removeFromPlan }) {
  if (plan.length === 0) {
    return (
      <div>
        <h2>Today's Plan</h2>
        <p>Your practice plan is empty. Go to the Drill Library to add some drills!</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Today's Plan</h2>
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
    </div>
  );
}

export default PracticePlan;
