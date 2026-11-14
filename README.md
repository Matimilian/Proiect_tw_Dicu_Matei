# Beam
Magazin digital pentru cumpararea jocurilor, marketplace pentru iteme digitale si workshop pentru moduri. Functioneaza ca un intermediar intre developer si utilizator.

## Data model
| Field | Type | Notes |
| ----------- | ------------ | ------------------------------------ |
| titlu | text | required, nu poate fi gol |
| instalat | boolean | toggled from the list, default false |
| gen | fixed values | actiune, rpg, strategie, indie |

Sample data used across all stages:
1. The Witcher 3: Wild Hunt, instalat, rpg
2. Counter-Strike 2, neinstalat, actiune
3. Stardew Valley, instalat, indie

## Stage 3: Vite and React project
The app now lives in `frontend/`, built with Vite. The data from stage 2 moved into the main component; the list is still printed raw.

## Stage 4: components
The list is rendered from the data, through two components:
`JocList` receives the whole array and renders one card per item.
`JocCard` receives a single item through props and displays it.

## Stage 5: local state and events
The list lives in React state. Checking and deleting work from the page, and the counters in the header follow automatically. A button in the header switches between light and dark mode. Changes are lost on refresh, which is what stage 6 and stage 10 fix.

## Stage 6: data from a mock API
The list of games is served by json-server from `frontend/db.json` (resource `jocuri`, route `/jocuri`). The app fetches it on load with `useEffect` and shows a loading state and an error state. All HTTP requests live in `frontend/src/api.js`; the API address comes from `VITE_API_URL` (see `frontend/.env.example`).

## How to run
```bash
cd frontend
npm install
npm run api    # terminal 1, http://localhost:3001/jocuri
npm run dev    # terminal 2, http://localhost:5173
```
Then open the address printed in the terminal (usually http://localhost:5173).

## Status
- [x] Stage 1: static mockup
- [x] Stage 2: data logic in JavaScript
- [x] Stage 3: Vite and React project
- [x] Stage 4: components rendered from data
- [x] Stage 5: local state and events
- [x] Stage 6: data from a mock API
- [ ] Stage 7: form and validation

## Stage 2 Checklist
| ID | Requirement | Where (permalink) | How to check |
| --- | --- | --- | --- |
| S2-R1 | JS file linked, logs on page load | `mockup/index.html` | open page, F12 |
| S2-R2 | 3+ items with id, name, state, tag | `mockup/jocuri.js` | read |
| S2-R3 | list, count, search, add, toggle, delete | `mockup/jocuri.js` | console output |
| S2-R4 | add rejects empty name and invalid tag | `mockup/jocuri.js` | last 2 console lines |
| S2-R5 | original array unchanged after add | `mockup/jocuri.js` | console line |
| S2-R6 | README Stage 2 section + AI log | `README.md`, `ai-log/etapa-02.md` | read |
| S2-R7 | commit "Stage 2" pushed | GitHub Commit History | commit history |

## Stage 3 Checklist
| ID | Requirement | Where (permalink) | How to check |
| --- | --- | --- | --- |
| S3-R1 | npm run dev starts without errors | `frontend/package.json` | npm install, npm run dev |
| S3-R2 | app name and counter computed from data | `frontend/src/App.jsx#L34-L62` | edit data, save |
| S3-R3 | data from README, not from the example | `frontend/src/App.jsx#L4-L8` | compare with README |
| S3-R4 | stage 1 styles reused | `frontend/src/App.css` | look at the page |
| S3-R5 | node_modules ignored, build passes | `frontend/.gitignore` | npm run build |
| S3-R6 | README Stage 3 section + AI log | `README.md`, `ai-log/etapa-03.md` | read |
| S3-R7 | commit "Stage 3" pushed | GitHub Commit History | commit history |

## Stage 4 Checklist
| ID | Requirement | Where (permalink) | How to check |
| --- | --- | --- | --- |
| S4-R1 | 2+ components in src/components/ | `frontend/src/components/` | open folder |
| S4-R2 | card receives data through props | `frontend/src/components/JocCard.jsx#L8-L39` | read |
| S4-R3 | map + key={id}, no console warnings | `frontend/src/components/JocList.jsx#L13-L23` | F12, Console |
| S4-R4 | message for empty list | `frontend/src/components/JocList.jsx#L4-L10` | set array to [] |
| S4-R5 | state changes the card look | `frontend/src/components/JocCard.jsx#L9-L11` | toggle a done flag |
| S4-R6 | README Stage 4 section + AI log | `README.md`, `ai-log/etapa-04.md` | read |
| S4-R7 | commit "Stage 4" pushed | GitHub Commit History | commit history |

## Stage 5 Checklist
| ID | Requirement | Where (permalink) | How to check |
| --- | --- | --- | --- |
| S5-R1 | list kept in useState, in App | `frontend/src/App.jsx#L15` | read |
| S5-R2 | toggling changes state and card look | `frontend/src/App.jsx#L18-L22`, `frontend/src/components/JocCard.jsx#L15-L20` | click a checkbox |
| S5-R3 | delete removes the item | `frontend/src/App.jsx#L24-L26`, `frontend/src/components/JocCard.jsx#L29-L36` | click Delete |
| S5-R4 | header counter derived, not in state | `frontend/src/App.jsx#L34` | toggle, watch header |
| S5-R5 | immutable updates (no push, splice, assignment) | `frontend/src/App.jsx#L18-L26` | read |
| S5-R6 | light/dark toggle: state + data-theme on html | `frontend/src/App.jsx#L16-L32`, `frontend/src/App.css#L25-L56` | click the button, both system themes |
| S5-R7 | no console warnings; README + AI log | `README.md`, `ai-log/etapa-05.md` | F12, Console |
| S5-R8 | commit "Stage 5" pushed | GitHub Commit History | commit history |

# Stage 1: AI log
## Tools
- Gemini
## Conversations
- Crearea layout-ului inițial pentru magazinul de jocuri.
## Key requests
- Modificarea unui șablon HTML/CSS pentru a se potrivi cu tema platformei Beam.
## What I learned / what did not work
I learned how to properly use github. What did not work but was a really easy debug was about the README. It didn't show properly on github, apparently i didn't save it in vscod so ofc it showed nothing.