import { Link } from "react-router-dom";
import { ETICHETE_GEN } from "../constants.js";
import styles from "./JocCard.module.css";

export default function JocCard({ joc, onToggle, onDelete }) {
  const cardClass = !joc.instalat ? `${styles.card} ${styles.done}` : styles.card;
  const statusClass = joc.instalat
    ? `${styles.status} ${styles.ready}`
    : `${styles.status} ${styles.install}`;
  const statusText = joc.instalat ? "JOACĂ" : "INSTALEAZĂ";

  return (
    <li className={cardClass} data-testid="item" data-id={joc.id}>
      <div className={styles.main}>
        <input
          type="checkbox"
          checked={joc.instalat}
          onChange={() => onToggle(joc.id)}
          aria-label={`Marchează ${joc.titlu} ca instalat`}
          data-testid="item-toggle"
        />
        <div className={`${styles.thumb} bg-${joc.gen}`}></div>
        <div>
          {/* Titlul duce la pagina de detaliu, fără reîncărcare */}
          <Link to={`/jocuri/${joc.id}`} className={styles.title} data-testid="item-link">
            {joc.titlu}
          </Link>
          <span className="badge">{ETICHETE_GEN[joc.gen]}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <span className={statusClass}>{statusText}</span>
        <button
          className="btn-danger"
          onClick={() => onDelete(joc.id)}
          aria-label={`Șterge ${joc.titlu}`}
          data-testid="item-delete"
        >
          Șterge
        </button>
      </div>
    </li>
  );
}
