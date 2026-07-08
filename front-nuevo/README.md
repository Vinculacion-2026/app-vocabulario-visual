# Señas App — Frontend

Frontend de la app educativa de lengua de señas (React 18 + Vite 6 + Tailwind v4).

## Desarrollo local

```bash
cp .env.example .env   # VITE_API_URL=http://localhost:3001/api
npm install
npm run dev
```

App en **http://localhost:5173/**

En Windows, si PowerShell bloquea npm: `npm.cmd run dev`.

## Estructura principal

| Ruta | Descripción |
|------|-------------|
| `src/app/pages/` | Páginas públicas, juegos y admin |
| `src/app/components/` | Componentes reutilizables |
| `src/app/lib/` | Cliente API, sesión, navegación |
| `src/assets/imagenes/` | Imágenes y assets de juegos |

## Build para producción

```bash
npm run build
```

Salida en `dist/`.
