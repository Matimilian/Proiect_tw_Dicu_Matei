import JocCard from "./JocCard.jsx";

export default function JocList({ jocuri, onToggle, onDelete }) {
  if (jocuri.length === 0) {
    return (
      <p className="empty" data-testid="empty">
        Librăria ta este goală. Vizitează magazinul pentru a adăuga jocuri.
      </p>
    );
  }

  return (
    <ul className="item-list">
      {jocuri.map((joc) => (
        <JocCard
          key={joc.id}
          joc={joc}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}