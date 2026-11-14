import { useState } from "react";
import JocList from "./components/JocList.jsx";

const JOCURI_INITIALE = [
  { id: 1, titlu: "The Witcher 3: Wild Hunt", instalat: true, gen: "rpg" },
  { id: 2, titlu: "Counter-Strike 2", instalat: false, gen: "actiune" },
  { id: 3, titlu: "Stardew Valley", instalat: true, gen: "indie" }
];

function temaInitiala() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  const [jocuri, setJocuri] = useState(JOCURI_INITIALE);
  const [tema, setTema] = useState(temaInitiala);

  function handleToggle(id) {
    setJocuri((prev) =>
      prev.map((j) => (j.id === id ? { ...j, instalat: !j.instalat } : j))
    );
  }

  function handleDelete(id) {
    setJocuri((prev) => prev.filter((j) => j.id !== id));
  }

  function handleTema() {
    const noua = tema === "dark" ? "light" : "dark";
    setTema(noua);
    document.documentElement.dataset.theme = noua;
  }

  const instalate = jocuri.filter((j) => j.instalat).length;

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">BEAM</div>
          <ul className="nav-links">
            <li><a href="#magazin">MAGAZIN</a></li>
            <li><a href="#comunitate">COMUNITATE</a></li>
            <li><a href="#despre">DESPRE</a></li>
            <li><a href="#asistenta">ASISTENȚĂ</a></li>
          </ul>
        </div>
      </nav>

      <header className="app-header">
        <button
          className="theme-toggle"
          onClick={handleTema}
          aria-pressed={tema === "dark"}
        >
          {tema === "dark" ? "Mod luminos" : "Mod întunecat"}
        </button>
        <div className="header-content">
          <h1>MAGAZINUL TĂU DIGITAL</h1>
          <p>Descoperă, achiziționează și joacă titlurile preferate pe Beam.</p>
          <div className="app-count">
            Librărie: {jocuri.length} jocuri ({instalate} instalate)
          </div>
        </div>
      </header>

      <main className="container">
        <section id="magazin" className="panel store-panel section-block">
          <h2>MAGAZIN & LIBRĂRIA MEA</h2>
          <p className="section-desc">Gestionează-ți jocurile, instalează titluri noi sau pornește direct în aventură.</p>
          <JocList
            jocuri={jocuri}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        </section>

        <section id="comunitate" className="panel comm-panel section-block">
          <h2>ACTIVITATEA COMUNITĂȚII</h2>
          <p className="section-desc">Cele mai populare discuții și recenzii din hub-ul comunității Beam.</p>
          
          <div className="comm-list">
            <div className="comm-card">
              <div className="avatar bg-rpg"></div>
              <div className="comm-text">
                <span className="comm-author">GamerX_99</span> a postat o recenzie pentru <strong>The Witcher 3</strong>
                <p className="comm-quote">"Cel mai bun RPG pe care l-am jucat vreodată. Povestea este incredibilă!"</p>
              </div>
            </div>

            <div className="comm-card">
              <div className="avatar bg-actiune"></div>
              <div className="comm-text">
                <span className="comm-author">ProPlayer_RO</span> a creat o discuție
                <p className="comm-quote">"Ce setări de sensibilitate folosiți la mouse în Counter-Strike 2 după noul update?"</p>
              </div>
            </div>
          </div>
        </section>

        <section id="despre" className="panel about-panel section-block">
          <h2>DESPRE BEAM</h2>
          <div className="about-content">
            <div className="about-text">
              <p>Beam este platforma digitală supremă pentru gaming, creată pentru a conecta jucătorii cu dezvoltatorii de top din întreaga lume.</p>
              <ul className="about-features">
                <li>🎮 Acces instantaneu la mii de jocuri</li>
                <li>🔄 Actualizări automate de fundal</li>
                <li>🌍 Comunitate globală masivă și Workshop pentru moduri</li>
                <li>☁️ Salvarea progresului în Cloud</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="asistenta" className="panel support-panel section-block">
          <h2>ASISTENȚĂ BEAM</h2>
          <p className="section-desc">Întâmpini dificultăți cu un joc sau cu platforma? Echipa noastră de suport este aici 24/7.</p>
          
          <div className="support-actions">
            <button className="btn-support">Contactează Suportul</button>
            <button className="btn-support btn-secondary">Întrebări Frecvente (FAQ)</button>
            <button className="btn-support btn-secondary">Rambursări</button>
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <p>© 2026 Beam Corporation. Toate drepturile rezervate. Toate mărcile comerciale sunt proprietatea respectivilor deținători.</p>
      </footer>
    </>
  );
}