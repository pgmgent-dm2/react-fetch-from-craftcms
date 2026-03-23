# Fetch Data Basic

Minimale React-app met dummy data voor stap-voor-stap begrijpen van data-fetching en routing.
Kan later omgebouwd worden naar echte Craft CMS GraphQL.

## Structuur

```
src/
  api.js                    (GraphQL queries - nu nog ongebruikt)
  App.jsx                   (Main app met routing)
  main.jsx                  (React entrypoint)
  routing.js                (URL parsing)
  index.css                 (Styling)
  pages/
    ProjectsListPage.jsx    (Overzicht)
    ProjectDetailPage.jsx   (Detail op slug)
  components/
    ProjectCard.jsx         (Kaart UI)
  data/
    projects.json           (Dummy data)
```

## Dummy data → API

Deze app **start met dummy data** uit `src/data/projects.json`.
Dit maakt het voor studenten mogelijk eerst de React-structuur te begrijpen zonder API-complexiteit.

Beide page-componenten hebben TODOs waar later de API-calls kunnen worden ingeschakeld:
- `ProjectsListPage.jsx`
- `ProjectDetailPage.jsx`

### Voorbeeldflow: dummy → API

Vervang in de pages:
```javascript
// const list = projectsData;
const list = await fetchProjects();  // uit api.js
```

## Pagina's

- `/` toont alle projecten
- `/projects/:slug` toont detail & doet een afzonderlijke fetch op basis van slug

## Starten

1. Installeer dependencies:
   ```
   npm install
   ```
2. Start dev server:
   ```
   npm run dev
   ```
