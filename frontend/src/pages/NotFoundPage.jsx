import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

// Prinde orice adresă care nu se potrivește cu rutele din App.jsx (path="*")
export default function NotFoundPage() {
  return (
    <section className={`panel ${styles.box}`} data-testid="not-found">
      <p className={styles.code}>404</p>
      <h2>Pagina nu există</h2>
      <p className="info">Adresa cerută nu duce nicăieri.</p>
      <Link to="/">Înapoi la magazin</Link>
    </section>
  );
}
