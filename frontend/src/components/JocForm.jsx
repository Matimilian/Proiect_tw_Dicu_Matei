import { useState } from "react";
import { GENURI } from "../constants.js";
import styles from "./JocForm.module.css";

const TITLU_MAX = 100;

// Formular controlat: state-ul React este sursa de adevăr pentru câmpuri
export default function JocForm({ onAdd }) {
  const [titlu, setTitlu] = useState("");
  const [gen, setGen] = useState("actiune");
  const [eroare, setEroare] = useState("");
  const [trimite, setTrimite] = useState(false);

  function valideaza() {
    const t = titlu.trim();
    if (t === "") return "Titlul jocului este obligatoriu.";
    if (t.length > TITLU_MAX) return `Titlul are maximum ${TITLU_MAX} de caractere.`;
    if (!GENURI.some((g) => g.value === gen)) return "Alege un gen din listă.";
    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault(); // oprește reîncărcarea paginii
    const mesaj = valideaza();
    if (mesaj) {
      setEroare(mesaj);
      return;
    }
    setEroare("");
    setTrimite(true);
    try {
      await onAdd({ titlu: titlu.trim(), gen, instalat: false });
      // se golește doar dacă serverul a confirmat salvarea
      setTitlu("");
      setGen("actiune");
    } catch (err) {
      setEroare(err.message);
    } finally {
      setTrimite(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate data-testid="form">
      <label>
        Titlu
        <input
          type="text"
          value={titlu}
          onChange={(e) => setTitlu(e.target.value)}
          placeholder="Ex: Hollow Knight"
          maxLength={TITLU_MAX}
          aria-invalid={Boolean(eroare)}
          data-testid="form-title"
        />
      </label>
      <label>
        Gen
        <select
          value={gen}
          onChange={(e) => setGen(e.target.value)}
          data-testid="form-gen"
        >
          {GENURI.map((g) => (
            <option key={g.value} value={g.value}>
              {g.label}
            </option>
          ))}
        </select>
      </label>
      {eroare && (
        <p className="error" data-testid="form-error">
          {eroare}
        </p>
      )}
      <button type="submit" className="btn" disabled={trimite} data-testid="form-submit">
        {trimite ? "Se salvează..." : "Adaugă jocul"}
      </button>
    </form>
  );
}
