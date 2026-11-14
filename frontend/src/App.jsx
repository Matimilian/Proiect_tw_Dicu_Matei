import { useEffect, useState } from "react";
import JocList from "./components/JocList.jsx";
import JocForm from "./components/JocForm.jsx";
import { createJoc, deleteJoc, fetchJocuri, updateJoc } from "./api.js";

function temaInitiala() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  // Datele vin de la server (json-server, db.json), deci lista pornește goală
  const [jocuri, setJocuri] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tema, setTema] = useState(temaInitiala);

  // Rulează o singură dată, după prima randare
  useEffect(() => {
    let ignore = false; // nu se setează state dacă pagina s-a închis între timp

    async function load() {
      try {
        const data = await fetchJocuri();
        if (!ignore) setJocuri(data);
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, []);

  // Întâi serverul, apoi state-ul: pe ecran ajunge doar ce s-a salvat.
  // Fără try: eroarea ajunge înapoi în formular, care o afișează lângă câmpuri.
  async function handleAdd(joc) {
    const creat = await createJoc(joc); // serverul întoarce jocul cu id
    setJocuri((prev) => [...prev, creat]);
  }

  async function handleToggle(id) {
    const joc = jocuri.find((j) => j.id === id);
    try {
      setError(null);
      const actualizat = await updateJoc(id, { instalat: !joc.instalat });
      setJocuri((prev) => prev.map((j) => (j.id === id ? actualizat : j)));
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    try {
      setError(null);
      await deleteJoc(id);
      setJocuri((prev) => prev.filter((j) => j.id !== id));
    } catch (err) {
      setError(err.message);
    }
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

          {/* Etapa 7: formularul în stânga, lista în dreapta */}
          <div className="store-layout">
            <div className="store-form">
              <h3 className="sub-title">Adaugă joc</h3>
              <JocForm onAdd={handleAdd} />
            </div>

            <div className="store-list">
              <h3 className="sub-title">Librăria mea</h3>
              {loading && (
                <p className="info" data-testid="loading">
                  Se încarcă librăria...
                </p>
              )}
              {error && (
                <p className="error" data-testid="error">
                  {error}. Verifică dacă rulează <code>npm run api</code>.
                </p>
              )}
              {!loading && (
                <JocList
                  jocuri={jocuri}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                />
              )}
            </div>
          </div>
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