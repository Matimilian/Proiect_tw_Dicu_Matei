const ETICHETE_GEN = { 
  actiune: "Acțiune", 
  rpg: "RPG", 
  strategie: "Strategie", 
  indie: "Indie" 
};

export default function JocCard({ joc, onToggle, onDelete }) {
  const cardClass = !joc.instalat ? "item-card done" : "item-card";
  const statusClass = joc.instalat ? "status ready" : "status install";
  const statusText = joc.instalat ? "JOACĂ" : "INSTALEAZĂ";

  return (
    <li className={cardClass}>
      <label className="task-main game-info">
        <input
          type="checkbox"
          checked={joc.instalat}
          onChange={() => onToggle(joc.id)}
        />
        <div className={`game-thumb bg-${joc.gen}`}></div>
        <div>
          <h3>{joc.titlu}</h3>
          <span className="badge">{ETICHETE_GEN[joc.gen]}</span>
        </div>
      </label>

      <div className="card-actions">
        <span className={statusClass}>{statusText}</span>
        <button
          className="btn-danger"
          onClick={() => onDelete(joc.id)}
          aria-label={`Șterge ${joc.titlu}`}
        >
          Șterge
        </button>
      </div>
    </li>
  );
}