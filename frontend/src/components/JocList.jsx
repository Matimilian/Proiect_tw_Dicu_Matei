import JocCard from "./JocCard.jsx";

export default function JocList({ jocuri }) {
  if (jocuri.length === 0) {
    return (
      <p style={{ color: "#8f98a0", padding: "10px 0" }}>
        Librăria ta este goală. Vizitează magazinul pentru a adăuga jocuri.
      </p>
    );
  }

  return (
    <ul className="item-list">
      {jocuri.map((joc) => (
        <JocCard key={joc.id} joc={joc} />
      ))}
    </ul>
  );
}