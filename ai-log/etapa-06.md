# Stage 6: AI log

## Tools
- Claude (Anthropic)

## Conversations
- Implementarea Etapei 6 după ghidul „Date de la un API (useEffect)”, adaptată pe tema Beam.

## Key requests
- Mutarea listei de jocuri din `App.jsx` în `frontend/db.json` (resursa `jocuri`, 5 jocuri cu genuri și stări diferite).
- Scriptul `npm run api` cu json-server 0.17.4 pe portul 3001.
- Fișierul `src/api.js` cu `fetchJocuri`, singurul loc în care apare `fetch`, cu adresa citită din `VITE_API_URL`.
- Încărcarea datelor în `App.jsx` cu `useEffect`, cele trei stări (se încarcă, reușit, eroare) și curățarea efectului cu `ignore`.
- Stilurile `.info` și `.error`, cu culori pentru tema luminoasă și pentru cea întunecată.

## What I learned / what did not work
- `fetch` nu aruncă eroare la 404 sau 500, doar când serverul nu poate fi contactat, de aceea se verifică `res.ok`.
- Funcția dată lui `useEffect` nu poate fi `async`, așa că se definește `load` în interior și se apelează.
- În modul de dezvoltare apar două cereri către `/jocuri` în fila Network, din cauza `StrictMode`; `ignore` împiedică dublarea efectelor.
- Ce nu a mers din prima: json-server pornit pe un port ocupat sau oprit duce la mesajul „Failed to fetch”; acum pagina arată un mesaj de eroare clar, nu rămâne goală.
- Bifarea și ștergerea încă se pierd la refresh; se rezolvă în Etapa 7.
