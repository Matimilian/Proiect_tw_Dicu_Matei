const jocuri = [
  { id: 1, titlu: "The Witcher 3: Wild Hunt", instalat: true, gen: "rpg" },
  { id: 2, titlu: "Counter-Strike 2", instalat: false, gen: "actiune" },
  { id: 3, titlu: "Stardew Valley", instalat: true, gen: "indie" }
];

export default function App() {
  const instalate = jocuri.filter((j) => j.instalat).length;

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">BEAM</div>
          <ul className="nav-links">
            <li><a href="#acasa">MAGAZIN</a></li>
            <li><a href="#librarie">COMUNITATE</a></li>
            <li><a href="#acasa">DESPRE</a></li>
            <li><a href="#acasa">ASISTENȚĂ</a></li>
          </ul>
        </div>
      </nav>

      <header id="acasa" className="app-header">
        <div className="header-content">
          <h1>MAGAZINUL TĂU DIGITAL</h1>
          <p>Descoperă, achiziționează și joacă titlurile preferate pe Beam.</p>
          <div className="app-count">
            Librărie: {jocuri.length} jocuri ({instalate} instalate)
          </div>
        </div>
      </header>

      <main className="container">
        <section id="librarie" className="panel store-panel">
          <h2>LIBRĂRIA MEA (Date brute JSON)</h2>
          {/* Etapa 3 cere afișarea datelor ca JSON brut */}
          <pre style={{ 
            color: "#66c0f4", 
            backgroundColor: "rgba(0,0,0,0.5)", 
            padding: "20px", 
            borderRadius: "4px",
            fontSize: "1rem"
          }}>
            {JSON.stringify(jocuri, null, 2)}
          </pre>
        </section>
      </main>
    </>
  );
}