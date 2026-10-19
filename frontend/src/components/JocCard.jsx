const ETICHETE_GEN = { 
  actiune: "Acțiune", 
  rpg: "RPG", 
  strategie: "Strategie", 
  indie: "Indie" 
};

export default function JocCard({ joc }) {
  const cardClass = !joc.instalat ? "item-card done" : "item-card";
  const statusClass = joc.instalat ? "status ready" : "status install";
  const statusText = joc.instalat ? "JOACĂ" : "INSTALEAZĂ";

  return (
    <li className={cardClass}>
      <div className="game-info">
        <div className={`game-thumb bg-${joc.gen}`}></div>
        <div>
          <h3>{joc.titlu}</h3>
          <span className="badge">{ETICHETE_GEN[joc.gen]}</span>
        </div>
      </div>
      <span className={statusClass}>{statusText}</span>
    </li>
  );
}