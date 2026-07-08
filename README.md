# Señas App — Vocabulario visual

App educativa de lengua de señas con juegos interactivos (flashcards, quiz, memoria, unir), diccionario visual y panel de administración para profesores.

Proyecto académico — PUCE / Vinculación 2026.

## Estructura del proyecto

| Carpeta | Descripción |
|---------|-------------|
| `modulo-palabras/` | Backend Express 5 + MongoDB (API REST) — puerto **3001** |
| `front-nuevo/` | Frontend React 18 + Vite 6 + Tailwind — puerto **5173** |

## Requisitos

- Node.js 20+ (recomendado)
- MongoDB Atlas (o MongoDB local)
- Cuenta Cloudinary (opcional, para subir imágenes y señas desde el panel admin)

## Desarrollo local

### 1. Backend

```bash
cd modulo-palabras
cp .env.example .env
npm install
npm run dev
```

Variables principales en `.env`:

- `MONGODB_URI`
- `JWT_SECRET`
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` (opcional)
- `FRONTEND_URL=http://localhost:5173`

API disponible en **http://localhost:3001/api**

### 2. Frontend

```bash
cd front-nuevo
cp .env.example .env
npm install
npm run dev
```

En `.env`:

```env
VITE_API_URL=http://localhost:3001/api
```

App en **http://localhost:5173/**

> **Windows:** si `npm run dev` falla por políticas de PowerShell, usa `npm.cmd run dev`.

## Rutas principales

### Públicas (estudiantes)

| Ruta | Descripción |
|------|-------------|
| `/` | Inicio con juegos y modo rápido |
| `/diccionario` | Diccionario con filtros por categoría y nivel |
| `/juegos` | Configuración del juego (categoría, nivel, cantidad) |
| `/juegos/flashcards` | Juego de flashcards |
| `/juegos/quiz` | Quiz de vocabulario |
| `/juegos/memoria` | Memoria (pares palabra–seña) |
| `/juegos/unir` | Unir palabra con su seña |

### Administración (profesores)

| Ruta | Descripción |
|------|-------------|
| `/admin-login` | Acceso con nombre y PIN |
| `/admin` | Panel simplificado del profesor |
| `/admin/flashcards` | Gestión de palabras (imagen + seña) |
| `/admin/categorias` | Categorías de vocabulario |
| `/admin/niveles` | Niveles por categoría |
| `/admin/analytics` | Estadísticas de uso |

## Características recientes

- Panel admin simplificado: menú con Palabras, Categorías, Niveles y Estadísticas
- Juegos con selección de **categoría y nivel**
- Subida a Cloudinary corregida (firma alineada entre backend y frontend)
- Tipografía ampliada para mejor lectura en niños
- Sesiones anónimas de estudiantes (sin login de alumnos)

## Producción

### Build del frontend

```bash
cd front-nuevo
npm run build
```

Genera la carpeta `front-nuevo/dist/` lista para Netlify, Vercel o hosting estático.

### Backend

```bash
cd modulo-palabras
npm start
```

Despliegue típico:

- **Frontend:** Netlify / Vercel (`front-nuevo/dist`)
- **Backend:** Render (`modulo-palabras/`, ver `render.yaml`)
- **Base de datos:** MongoDB Atlas
- **Medios:** Cloudinary

Configura `VITE_API_URL` en el frontend apuntando a la URL pública del backend, y `FRONTEND_URL` en el backend con la URL del frontend (para CORS).

## Scripts útiles

```bash
cd modulo-palabras
npm run seed    # datos de prueba
npm test        # pruebas del algoritmo SM-2
```

## Licencia

Proyecto académico — PUCE / Vinculación 2026.
