# Fetch Data Basic

Minimale React-app die projecten ophaalt via de Craft CMS GraphQL endpoint.

## Pagina's

- `/` toont alle projecten
- `/projects/:slug` toont details van een project en doet een aparte API call op basis van slug

## Starten

1. Installeer dependencies:
   npm install
2. Start development server:
   npm run dev

## Environment variables

Gebruik `.env` met:

- `VITE_CRAFT_API_URL`
- `VITE_CRAFT_BEARER_TOKEN`
