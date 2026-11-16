# Stage 8: AI log

## Tools
- Claude (Anthropic)

## Conversations
- Implementarea Etapei 8 după ghidul „Navigare și stilizare pe componente”, adaptată pe tema Beam (resursa `jocuri`, ruta de detaliu `/jocuri/:id`).

## Key requests
- `BrowserRouter` în `main.jsx` și harta rutelor în `App.jsx`: `/`, `/jocuri/:id`, `/despre` și `*` pentru adresele inexistente, toate în interiorul rutei cu `Layout`.
- Componenta `Layout`: antetul cu logo, navigația cu `NavLink` (MAGAZIN, DESPRE), butonul pentru modul întunecat și subsolul, scrise o singură dată, cu `<Outlet />` pentru pagini.
- Mutarea conținutului din `App.jsx` (state, efect, funcțiile de adăugare, bifare și ștergere) neschimbat în `pages/JocuriPage.jsx`; contorul de jocuri a trecut din antet în panoul librăriei.
- Titlul din `JocCard` devenit `Link` spre `/jocuri/:id`, cu `data-testid="item-link"`; `<label>` din jurul titlului înlocuit cu un `div`, iar căsuța a primit `aria-label`.
- `fetchJoc(id)` în `api.js` și pagina `JocDetaliuPage`, cu `useParams`, efect cu dependența `[id]`, mesaj de încărcare, mesaj de eroare pentru un id inexistent și link înapoi la magazin.
- `DesprePage` (descrierea Beam, tehnologiile și secțiunea de asistență, mutate de pe pagina principală) și `NotFoundPage`.
- Împărțirea lui `App.css` în `index.css` (variabile, `body`, `.panel`, `.btn`, `.btn-danger`, `.error`, `.badge`, culorile genurilor) și câte un `.module.css` pentru fiecare componentă și pagină.
- `src/constants.js` cu genurile și etichetele lor, folosit de formular, card și pagina de detaliu.

## What I learned / what did not work
- `<a href>` reîncarcă tot documentul și pierde state-ul; `<Link to>` schimbă doar adresa, iar în fila Network nu mai apare nicio cerere de document HTML.
- Fără `end` pe `NavLink`-ul către `/`, linkul MAGAZIN ar rămâne marcat și pe pagina Despre, pentru că orice adresă începe cu `/`.
- `useParams()` întoarce id-ul ca text (`"3"`); pentru cererea către server nu contează, dar la comparații cu numere ar trebui `Number(id)`.
- Cu CSS Modules, `className="card"` nu mai aplică nimic: clasa trebuie scrisă `styles.card`, pentru că la build primește un nume unic. Clasele globale (`btn-danger`, `badge`, `error`) rămân scrise ca text.
- Într-un modul, o clasă globală se poate atinge cu `:global(.error)`, de exemplu pentru spațierea mesajului de eroare din formular.
- Am omis `setLoading(true)` din efectul paginii de detaliu: regula de lint `react-hooks/set-state-in-effect` îl raportează ca eroare, iar state-ul pornește oricum cu `loading = true`.
- Butonul pentru modul întunecat a trecut în `Layout`, ca să fie disponibil pe toate paginile.
