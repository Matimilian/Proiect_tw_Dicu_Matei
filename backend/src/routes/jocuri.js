import { Router } from "express";
import { parseId, valideazaJoc } from "../validation.js";

const router = Router();

// Etapa 9: datele stau în memorie și se pierd la repornire (Etapa 10 le mută în MariaDB)
let jocuri = [
  { id: 1, titlu: "The Witcher 3: Wild Hunt", instalat: true, gen: "rpg" },
  { id: 2, titlu: "Counter-Strike 2", instalat: false, gen: "actiune" },
  { id: 3, titlu: "Stardew Valley", instalat: true, gen: "indie" },
  { id: 4, titlu: "Elden Ring", instalat: false, gen: "actiune" },
  { id: 5, titlu: "Baldur's Gate 3", instalat: true, gen: "rpg" },
];
let nextId = 6;

// Validează :id și găsește jocul, sau răspunde cu 400 / 404
function gasesteIndex(req, res) {
  const id = parseId(req.params.id);
  if (!id) {
    res.status(400).json({ error: "Id invalid" });
    return -1;
  }
  const index = jocuri.findIndex((j) => j.id === id);
  if (index === -1) {
    res.status(404).json({ error: "Jocul nu există" });
  }
  return index;
}

// GET /jocuri
router.get("/", (req, res) => {
  res.json(jocuri);
});

// GET /jocuri/:id
router.get("/:id", (req, res) => {
  const index = gasesteIndex(req, res);
  if (index === -1) return;
  res.json(jocuri[index]);
});

// POST /jocuri
router.post("/", (req, res) => {
  const { erori, date } = valideazaJoc(req.body ?? {});
  if (erori.length > 0) {
    return res.status(400).json({ error: erori.join("; ") });
  }
  const joc = { id: nextId++, ...date };
  jocuri.push(joc);
  res.status(201).json(joc);
});

// PATCH /jocuri/:id (modificare parțială)
router.patch("/:id", (req, res) => {
  const index = gasesteIndex(req, res);
  if (index === -1) return;
  const { erori, date } = valideazaJoc(req.body ?? {}, { partial: true });
  if (erori.length > 0) {
    return res.status(400).json({ error: erori.join("; ") });
  }
  jocuri[index] = { ...jocuri[index], ...date };
  res.json(jocuri[index]);
});

// DELETE /jocuri/:id
router.delete("/:id", (req, res) => {
  const index = gasesteIndex(req, res);
  if (index === -1) return;
  jocuri.splice(index, 1);
  res.status(204).end();
});

export default router;
