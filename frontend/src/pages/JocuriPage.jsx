import { useEffect, useState } from "react";
import JocList from "../components/JocList.jsx";
import JocForm from "../components/JocForm.jsx";
import { createJoc, deleteJoc, fetchJocuri, updateJoc } from "../api.js";
import styles from "./JocuriPage.module.css";

// Pagina principală: formularul și librăria (tot ce era în App.jsx la Etapa 7)
export default function JocuriPage() {
  // Datele vin de la server (json-server, db.json), deci lista pornește goală
  const [jocuri, setJocuri] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const instalate = jocuri.filter((j) => j.instalat).length;

  return (
    <>
      <div className={styles.hero}>
        <h1>MAGAZINUL TĂU DIGITAL</h1>
        <p>Descoperă, achiziționează și joacă titlurile preferate pe Beam.</p>
      </div>

      <section className={`panel ${styles.store}`}>
        <h2>MAGAZIN & LIBRĂRIA MEA</h2>
        <p className="section-desc">
          Gestionează-ți jocurile, instalează titluri noi sau deschide un joc pentru detalii.
        </p>

        {/* Formularul în stânga, lista în dreapta */}
        <div className={styles.grid}>
          <div className={styles.formBox}>
            <h3 className={styles.subTitle}>Adaugă joc</h3>
            <JocForm onAdd={handleAdd} />
          </div>

          <div className={styles.listBox}>
            <h3 className={styles.subTitle}>Librăria mea</h3>
            <p className={styles.summary}>
              {jocuri.length} jocuri, dintre care {instalate} instalate
            </p>
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

      <section className={`panel ${styles.section}`}>
        <h2>ACTIVITATEA COMUNITĂȚII</h2>
        <p className="section-desc">
          Cele mai populare discuții și recenzii din hub-ul comunității Beam.
        </p>

        <div className={styles.commList}>
          <div className={styles.commCard}>
            <div className={`${styles.avatar} bg-rpg`}></div>
            <div className={styles.commText}>
              <span className={styles.commAuthor}>GamerX_99</span> a postat o recenzie pentru{" "}
              <strong>The Witcher 3</strong>
              <p className={styles.commQuote}>
                "Cel mai bun RPG pe care l-am jucat vreodată. Povestea este incredibilă!"
              </p>
            </div>
          </div>

          <div className={styles.commCard}>
            <div className={`${styles.avatar} bg-actiune`}></div>
            <div className={styles.commText}>
              <span className={styles.commAuthor}>ProPlayer_RO</span> a creat o discuție
              <p className={styles.commQuote}>
                "Ce setări de sensibilitate folosiți la mouse în Counter-Strike 2 după noul update?"
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
