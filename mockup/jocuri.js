const jocuri = [
  { id: 1, titlu: "The Witcher 3: Wild Hunt", instalat: true, gen: "rpg" },
  { id: 2, titlu: "Counter-Strike 2", instalat: false, gen: "actiune" },
  { id: 3, titlu: "Stardew Valley", instalat: true, gen: "indie" }
];

const GENURI = ["actiune", "rpg", "strategie", "indie"];

function listeazaTitluri(lista) {
  return lista.map((j) => j.titlu);
}

function numaraInstalate(lista) {
  return lista.filter((j) => j.instalat).length;
}

function cautaDupaTitlu(lista, text) {
  const textMic = text.toLowerCase();
  return lista.filter((j) => j.titlu.toLowerCase().includes(textMic));
}

function nextId(lista) {
  return lista.reduce((max, j) => Math.max(max, j.id), 0) + 1;
}

function adaugaJoc(lista, titlu, gen) {
  const titluCurat = titlu.trim();
  
  if (!titluCurat) {
    console.log("Titlul nu poate fi gol!");
    return lista;
  }
  
  if (!GENURI.includes(gen)) {
    console.log("Gen invalid: " + gen);
    return lista;
  }
  
  const jocNou = {
    id: nextId(lista),
    titlu: titluCurat,
    instalat: false,
    gen: gen
  };
  
  return [...lista, jocNou];
}

function comutaInstalat(lista, id) {
  return lista.map((j) =>
    j.id === id ? { ...j, instalat: !j.instalat } : j
  );
}

function stergeJoc(lista, id) {
  return lista.filter((j) => j.id !== id);
}

console.log("--- Citire ---");
console.log("Titluri:", listeazaTitluri(jocuri).join(", "));
console.log("Instalate:", numaraInstalate(jocuri));
console.log("Căutare 'witcher':", listeazaTitluri(cautaDupaTitlu(jocuri, "witcher")).join(", "));

console.log("--- Adăugare ---");
let listaNoua = adaugaJoc(jocuri, "Cyberpunk 2077", "rpg");
console.log("Lista nouă:", listaNoua.length, "jocuri");
console.log("Originalul a rămas cu:", jocuri.length, "jocuri");

console.log("--- Modificare și ștergere ---");
listaNoua = comutaInstalat(listaNoua, 2);
console.log("După instalarea id-ului 2, instalate:", numaraInstalate(listaNoua));
listaNoua = stergeJoc(listaNoua, 1);
console.log("După ștergerea id-ului 1:", listeazaTitluri(listaNoua).join(", "));

console.log("--- Validare ---");
adaugaJoc(listaNoua, "   ", "actiune");
adaugaJoc(listaNoua, "FIFA 24", "sport");