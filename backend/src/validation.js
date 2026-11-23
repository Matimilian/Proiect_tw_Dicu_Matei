// Validare pe server: datele de la client nu sunt niciodată de încredere.
// GENURI trebuie să fie identice cu valorile din frontend/src/constants.js.
export const GENURI = ["actiune", "rpg", "strategie", "indie"];
const TITLU_MAX = 100;

// partial = true pentru PATCH (se verifică doar câmpurile trimise)
export function valideazaJoc(body, { partial = false } = {}) {
  const erori = [];
  const date = {};

  if (!partial || body.titlu !== undefined) {
    if (typeof body.titlu !== "string" || body.titlu.trim() === "") {
      erori.push("titlu este obligatoriu");
    } else if (body.titlu.trim().length > TITLU_MAX) {
      erori.push(`titlu are maximum ${TITLU_MAX} de caractere`);
    } else {
      date.titlu = body.titlu.trim();
    }
  }

  if (!partial || body.gen !== undefined) {
    const g = body.gen ?? "actiune";
    if (!GENURI.includes(g)) {
      erori.push(`gen trebuie să fie una din: ${GENURI.join(", ")}`);
    } else {
      date.gen = g;
    }
  }

  if (body.instalat !== undefined) {
    if (typeof body.instalat !== "boolean") {
      erori.push("instalat trebuie să fie true sau false");
    } else {
      date.instalat = body.instalat;
    }
  } else if (!partial) {
    date.instalat = false;
  }

  return { erori, date };
}

// Id-urile din adresă vin ca text; se acceptă doar numere întregi pozitive
export function parseId(value) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}
