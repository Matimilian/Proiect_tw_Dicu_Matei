import styles from "./DesprePage.module.css";

// Pagina de prezentare: ce este Beam și cum a fost construit
export default function DesprePage() {
  return (
    <>
      <section className={`panel ${styles.about}`}>
        <h2>DESPRE BEAM</h2>
        <p className={styles.lead}>
          Beam este un magazin digital pentru jocuri, construit pas cu pas, pe parcursul
          semestrului, în cadrul proiectului de Tehnologii Web. Platforma conectează
          jucătorii cu dezvoltatorii și îți ține librăria de jocuri într-un singur loc.
        </p>
        <ul className={styles.features}>
          <li>🎮 Acces instantaneu la mii de jocuri</li>
          <li>🔄 Actualizări automate de fundal</li>
          <li>🌍 Comunitate globală masivă și Workshop pentru moduri</li>
          <li>☁️ Salvarea progresului în Cloud</li>
        </ul>
        <p className={styles.stack}>
          Stack: React, Vite, React Router, Node.js, Express, MariaDB, Docker.
        </p>
      </section>

      <section className={`panel ${styles.support}`}>
        <h2>ASISTENȚĂ BEAM</h2>
        <p className="section-desc">
          Întâmpini dificultăți cu un joc sau cu platforma? Echipa noastră de suport este aici 24/7.
        </p>
        <div className={styles.actions}>
          <button className="btn">Contactează Suportul</button>
          <button className={`btn ${styles.secondary}`}>Întrebări Frecvente (FAQ)</button>
          <button className={`btn ${styles.secondary}`}>Rambursări</button>
        </div>
      </section>
    </>
  );
}
