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

## How to run
```bash
cd frontend
npm install
npm run dev