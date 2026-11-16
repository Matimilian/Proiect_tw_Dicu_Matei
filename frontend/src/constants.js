// Valorile fixe ale câmpului "gen" și etichetele lor, într-un singur loc.
// Folosite de formular, de card și de pagina de detaliu.
export const GENURI = [
  { value: "actiune", label: "Acțiune" },
  { value: "rpg", label: "RPG" },
  { value: "strategie", label: "Strategie" },
  { value: "indie", label: "Indie" },
];

// { actiune: "Acțiune", rpg: "RPG", ... }, pentru afișarea etichetelor
export const ETICHETE_GEN = Object.fromEntries(
  GENURI.map((g) => [g.value, g.label])
);
