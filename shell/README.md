# Señas App — Frontend

Frontend de la app educativa de lengua de señas (React 18 + Vite 6 + Tailwind).

## Requisitos

- Node.js 18+
- Backend en ejecución (`modulo-palabras/`, puerto 3001)

## Desarrollo local

```bash
cp .env.example .env   # VITE_API_URL=http://localhost:3001/api
npm install
npm run dev
```

App en **http://localhost:5173/**

## Estructura principal

| Ruta | Descripción |
|------|-------------|
| `src/app/pages/` | Páginas públicas y admin |
| `src/app/components/` | Componentes reutilizables |
| `src/app/data/` | Datos estáticos (juegos, assets) |
