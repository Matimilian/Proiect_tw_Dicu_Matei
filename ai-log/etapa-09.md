# Stage 9: AI log

## Tools
- Claude (Anthropic)

## Conversations
- Implementarea Etapei 9 după ghidul „Backend propriu (Node.js și Express)”, adaptată pe tema Beam (resursa `jocuri`, ruta `/jocuri`).

## Key requests
- Proiectul `backend/` cu Express 5 și cors, `"type": "module"`, scripturile `start` și `dev` (`node --watch`), `.gitignore` și `.env.example` (`PORT`, `CORS_ORIGIN`).
- `src/routes/jocuri.js`: GET pe listă și pe id, POST (201), PATCH (200) și DELETE (204), cu cele cinci jocuri de până acum ținute în memorie și funcția `gasesteIndex` pentru 400 (id invalid) și 404 („Jocul nu există”).
- `src/validation.js`: `valideazaJoc` (titlu obligatoriu, maximum 100 de caractere, gen din `GENURI`, `instalat` boolean, implicit `false`), cu varianta parțială pentru PATCH, și `parseId`.
- `src/app.js` separat de `src/server.js`: `cors()`, `express.json()`, ruta `/health`, routerul `/jocuri`, ruta de 404 și tratarea centralizată a erorilor.
- În frontend: citirea `body.error` în funcția `request` din `api.js`, mesajul de eroare din `JocuriPage` actualizat, ștergerea `db.json`, a scriptului `api` și a pachetului `json-server`.

## What I learned / what did not work
- Ordinea din `app.js` contează: middleware-uri, rute, ruta de 404, apoi funcția cu patru parametri pentru erori; Express o recunoaște după numărul de parametri, deci `next` rămâne chiar dacă nu e folosit.
- `req.params.id` este text; fără `parseId`, comparația cu id-ul numeric nu găsește niciodată jocul.
- Lista albă de câmpuri: serverul păstrează doar `titlu`, `gen` și `instalat`, deci un `id` trimis de client este ignorat, iar id-ul îl dă serverul.
- Validarea din formular nu ajunge: cu curl se poate trimite orice, de aceea serverul verifică tot.
- CORS: deschisă de la `http://127.0.0.1:5173`, aplicația arată doar „Failed to fetch”, iar motivul real apare în consolă. Se rezolvă pe server, prin `CORS_ORIGIN`, nu în frontend.
- JSON greșit în corpul cererii ajunge la funcția de erori cu status 400, tot în forma `{ "error": "..." }`.
- Valorile din `GENURI` trebuie să fie aceleași în `validation.js` și în `constants.js`; altfel formularul trimite genuri pe care serverul le refuză.
