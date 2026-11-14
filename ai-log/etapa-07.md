# Stage 7: AI log

## Tools
- Claude (Anthropic)

## Conversations
- Implementarea Etapei 7 după ghidul „Formular și validare”, adaptată pe tema Beam (resursa `jocuri`).

## Key requests
- Funcția comună `request` în `src/api.js` și funcțiile `fetchJocuri`, `createJoc`, `updateJoc`, `deleteJoc` (GET, POST, PATCH, DELETE).
- Componenta `JocForm`: formular controlat cu câmpurile Titlu și Gen, validare (titlu obligatoriu, maximum 100 de caractere, gen din lista fixă), mesajul de eroare afișat sub câmpuri, nu cu `alert`.
- În `App.jsx`: `handleAdd`, iar bifarea și ștergerea trimise la server înainte de modificarea listei.
- Layout pe două coloane în secțiunea magazinului (formular în stânga, lista în dreapta), care trece pe o coloană pe telefon.
- Fișierul `tw.json` și atributele `data-testid` pentru verificarea automată.

## What I learned / what did not work
- Fără `e.preventDefault()`, formularul reîncarcă pagina și se pierde tot ce e pe ecran.
- Câmpul se golește doar după `await`, deci doar dacă salvarea a reușit; dacă serverul e oprit, textul rămâne și se poate încerca din nou.
- `handleAdd` nu prinde eroarea, ca ea să ajungă în formular și să fie afișată lângă câmpuri.
- Id-ul jocului nou vine de la json-server; în listă se pune obiectul întors de server, nu o copie făcută local.
- Ce nu a mers din prima: checkbox-ul nu se schimbă imediat la click, ci abia după răspunsul serverului, pentru că lista se actualizează doar cu ce a confirmat serverul. Este comportamentul dorit.
