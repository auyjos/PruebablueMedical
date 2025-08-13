# BlueMed Dashboard - Aplicación Full Stack 2025

Una aplicación full-stack moderna construida con las últimas tecnologías (2025), que incluye un backend Node.js Express con **ES Modules** y un frontend React 19 con sistema de construcción Vite.

## 🚀 Resumen de la Arquitectura

### Backend (Node.js + Express con ES Modules)
- **Framework**: Express.js con ES Modules (JavaScript moderno)
- **Arquitectura**: Arquitectura en capas (Controladores, Servicios, Middleware)
- **API**: API RESTful con manejo de errores integral
- **Pruebas**: Mocha + Chai (24/24 pruebas pasando ✅)
- **Seguridad**: Helmet, CORS, Limitación de velocidad
- **Sistema de Módulos**: ES Modules (`import`/`export`) para consistencia
- **Puerto**: 3001

### Frontend (React 19 + Vite + TailwindCSS v4)
- **Herramienta de Construcción**: Vite 7.x (última versión 2025)
- **Framework**: React 19 con TypeScript
- **Estilos**: TailwindCSS v4 con configuración CSS-first
- **Gestión de Estado**: Patrón moderno de hooks de React
- **Componentes**: Diseño modular con hooks personalizados
- **Pruebas**: Vitest + Testing Library (31/31 pruebas pasando ✅)
- **Puerto**: 3000

## 🛠️ Stack Tecnológico

### Tecnologías Backend
- **Runtime**: Node.js 20
- **Framework**: Express.js con ES Modules
- **Sistema de Módulos**: ES Modules (`"type": "module"`)
- **Cliente HTTP**: Axios
- **Pruebas**: Mocha + Chai + Chai-HTTP
- **Utilidades**: Procesadores de datos personalizados
- **Seguridad**: Helmet, CORS, Limitación de velocidad
- **Linting**: ESLint con estándares modernos de JavaScript

### Tecnologías Frontend
- **Sistema de Construcción**: Vite 7.x
- **Framework**: React 19
- **Lenguaje**: TypeScript 5.x
- **Estilos**: TailwindCSS v4 (configuración CSS-first)
- **Cliente HTTP**: Axios
- **Pruebas**: Vitest + React Testing Library
- **Hooks**: Hooks personalizados para obtención de datos
- **Desarrollo**: Hot Module Replacement (HMR)

### DevOps y Despliegue
- **Contenedorización**: Docker + Docker Compose
- **Servidor Web**: Nginx (producción)
- **Entorno**: Construcciones Docker multi-etapa
- **Verificaciones de Salud**: Monitoreo integral
- **Pruebas**: Soporte de pruebas basadas en contenedores

## 📁 Estructura del Proyecto

```
blueMed/
├── backend/                 # Servidor API Node.js (ES Modules)
│   ├── src/
│   │   ├── app.js          # Aplicación Express (ES Modules)
│   │   ├── controllers/    # Manejadores de solicitudes
│   │   ├── services/       # Lógica de negocio
│   │   ├── middleware/     # Middleware personalizado
│   │   ├── routes/         # Rutas API
│   │   ├── utils/          # Funciones auxiliares
│   │   └── config/         # Configuración
│   ├── test/               # Suites de pruebas (ES Modules)
│   ├── server.js           # Punto de entrada del servidor
│   ├── Dockerfile          # Configuración de contenedor
│   └── package.json        # Dependencias + "type": "module"
│
├── frontend/               # SPA React 19
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── hooks/          # Hooks personalizados
│   │   ├── services/       # Servicios API
│   │   ├── tests/          # Estructura de pruebas organizada
│   │   ├── assets/         # Recursos estáticos
│   │   ├── App.tsx         # Componente raíz
│   │   ├── main.tsx        # Punto de entrada
│   │   └── index.css       # Configuración TailwindCSS v4
│   ├── dist/               # Salida de construcción
│   ├── vite.config.ts      # Configuración Vite
│   ├── vitest.config.ts    # Configuración de pruebas Vitest
│   ├── Dockerfile          # Configuración de contenedor
│   └── package.json        # Dependencias
│
├── docker-compose.yml      # Configuración multi-servicio
├── .gitignore              # Reglas globales de git ignore
└── README.md              # Este archivo
```

## 🎯 Características

### Características Backend (ES Modules)
- **JavaScript Moderno**: Soporte completo de ES Modules
- **API RESTful**: Diseño limpio de API con métodos HTTP apropiados
- **Procesamiento de Datos**: Utilidades avanzadas de transformación de datos
- **Manejo de Errores**: Gestión integral de errores
- **Seguridad**: CORS, Helmet, Limitación de velocidad
- **Verificaciones de Salud**: Monitoreo de salud API
- **Estadísticas**: Análisis de datos en tiempo real
- **Validación**: Middleware de validación de solicitudes
- **Cierre Elegante**: Gestión apropiada del ciclo de vida del servidor

### Características Frontend
- **UI Moderna**: Diseño limpio y responsivo con TailwindCSS v4
- **Tabla Interactiva**: Tabla de datos ordenable y buscable
- **Estadísticas en Tiempo Real**: Dashboard de estadísticas en vivo
- **Estados de Carga**: Indicadores de carga suaves
- **Manejo de Errores**: Mensajes de error amigables para el usuario
- **Búsqueda y Filtrado**: Funcionalidad de búsqueda con debounce
- **Diseño Responsivo**: Enfoque mobile-first
- **Pruebas de Componentes**: Cobertura de pruebas integral

### Características Modernas 2025
- **ES Modules en Todas Partes**: Sistema de módulos consistente en todo el stack
- **Sistema de Construcción Vite**: Desarrollo y construcciones ultrarrápidas
- **React 19**: Últimas características y optimizaciones de React
- **TailwindCSS v4**: Enfoque de configuración CSS-first
- **TypeScript**: Seguridad de tipos completa en todo el stack
- **Hooks Personalizados**: Patrones de lógica reutilizable
- **Hot Module Replacement**: Retroalimentación instantánea de desarrollo
- **Listo para Contenedores**: Docker optimizado para desarrollo y producción

## 🚀 Inicio Rápido

### Prerrequisitos
- **Node.js** 20+ 
- **npm** 9+
- **Docker** y **Docker Compose** (recomendado)

### Configuración de Desarrollo Local

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd blueMed
   ```

2. **Iniciar Backend (Terminal 1)**
   ```bash
   cd backend
   npm install
   npm run dev
   # Backend ejecutándose en http://localhost:3001
   ```

3. **Iniciar Frontend (Terminal 2)**
   ```bash
   cd frontend
   npm install
   npm run dev
   # Frontend ejecutándose en http://localhost:3000
   ```

### 🐳 Configuración Docker (Recomendado)

#### Para desarrollo
```bash
# Construir y levantar todos los servicios
docker-compose up --build

# Ejecutar en segundo plano
docker-compose up -d --build

# Ver logs en tiempo real
docker-compose logs -f

# Parar servicios
docker-compose down
```

## 🔨 Construir Imágenes Docker

### Construir imágenes individuales

#### Backend
```bash
# Desde la raíz del proyecto
docker build -t bluemed-backend:latest ./backend

# O desde el directorio backend
cd backend
docker build -t bluemed-backend:latest .
```

#### Frontend
```bash
# Desde la raíz del proyecto
docker build -t bluemed-frontend:latest ./frontend

# O desde el directorio frontend
cd frontend
docker build -t bluemed-frontend:latest .
```

### Construir todas las imágenes con Docker Compose
```bash
# Construir todas las imágenes
docker-compose build

# Construir sin usar cache
docker-compose build --no-cache

# Construir solo el backend
docker-compose build backend

# Construir solo el frontend
docker-compose build frontend
```

### Construir para diferentes entornos
```bash
# Desarrollo
docker-compose -f docker-compose.yml build

# Producción
docker-compose -f docker-compose.prod.yml build
```

## 🚀 Ejecutar Servicios

### Usando Docker Compose (Recomendado)

#### Desarrollo
```bash
# Levantar todos los servicios
docker-compose up

# Levantar en segundo plano
docker-compose up -d

# Levantar solo el backend
docker-compose up backend

# Levantar solo el frontend
docker-compose up frontend

# Levantar con reconstrucción
docker-compose up --build
```

### Usando Docker directamente

#### Backend
```bash
# Ejecutar el backend
docker run -p 3001:3001 \
  -e NODE_ENV=development \
  -e API_BASE_URL=https://687eade4efe65e5200875629.mockapi.io/api/v1 \
  bluemed-backend:latest

# Con variables de entorno desde archivo
docker run -p 3001:3001 --env-file backend/.env bluemed-backend:latest
```

#### Frontend
```bash
# Ejecutar el frontend
docker run -p 3000:3000 bluemed-frontend:latest
```

### Comandos útiles para servicios
```bash
# Ver logs de todos los servicios
docker-compose logs

# Ver logs de un servicio específico
docker-compose logs backend
docker-compose logs frontend

# Seguir logs en tiempo real
docker-compose logs -f backend

# Reiniciar un servicio
docker-compose restart backend

# Ver estado de servicios
docker-compose ps

# Parar todos los servicios
docker-compose down

# Parar y eliminar volúmenes
docker-compose down -v
```

## 🧪 Correr Pruebas desde Contenedores

### Pruebas del Backend en Contenedores

#### Opción 1: Usando Docker Compose (Recomendado)
```bash
# Ejecutar todas las pruebas del backend
docker-compose exec backend npm test

# Ejecutar pruebas en modo watch
docker-compose exec backend npm run test:watch

# Ejecutar linting
docker-compose exec backend npm run lint

# Ejecutar linting con corrección automática
docker-compose exec backend npm run lint:fix
```

#### Opción 2: Usando un contenedor temporal
```bash
# Ejecutar pruebas en un contenedor temporal
docker run --rm \
  -v $(pwd)/backend:/app \
  -w /app \
  node:20-alpine \
  npm test

# Con imagen personalizada
docker run --rm bluemed-backend:latest npm test
```

#### Opción 3: Crear un servicio de testing
```bash
# Crear archivo docker-compose.test.yml
version: '3.8'
services:
  backend-test:
    build: ./backend
    command: npm test
    environment:
      - NODE_ENV=test
    volumes:
      - ./backend:/app
    working_dir: /app

# Ejecutar pruebas
docker-compose -f docker-compose.test.yml up --build backend-test
```

### Pruebas del Frontend en Contenedores

#### Opción 1: Usando Docker Compose (Recomendado)
```bash
# Ejecutar todas las pruebas del frontend
docker-compose exec frontend npm test

# Ejecutar pruebas en modo CI (single run)
docker-compose exec frontend npm run test:ci

# Ejecutar pruebas de un archivo específico
docker-compose exec frontend npm test -- postsService.test.ts

# Ejecutar linting
docker-compose exec frontend npm run lint
```

#### Opción 2: Usando un contenedor temporal
```bash
# Ejecutar pruebas en un contenedor temporal
docker run --rm \
  -v $(pwd)/frontend:/app \
  -w /app \
  node:20-alpine \
  sh -c "npm ci && npm test"

# Con imagen personalizada
docker run --rm bluemed-frontend:latest npm run test:ci
```

### Ejecutar todas las pruebas del proyecto
```bash
# Script para ejecutar todas las pruebas
#!/bin/bash
echo "🧪 Ejecutando pruebas del Backend..."
docker-compose exec backend npm test

echo "🧪 Ejecutando pruebas del Frontend..."
docker-compose exec frontend npm run test:ci

echo "✅ Todas las pruebas completadas"
```

## 📝 API Endpoints

### Base URL: `http://localhost:3001/api`

#### Posts
- `GET /posts` - Fetch all users with their posts grouped
- `GET /posts?name=<name>` - Filter users by name
- `GET /posts/stats` - Get posts statistics

#### System
- `GET /health` - Health check
- `GET /` - API documentation

#### Example Responses

**GET /posts**
```json
{
  "success": true,
  "data": [
    {
      "name": "John Doe",
      "postCount": 5,
      "posts": [
        {
          "id": "1",
          "comment": "First post",
          "createdAt": "2025-01-01T10:00:00Z"
        }
      ]
    }
  ],
  "meta": {
    "count": 1,
    "filter": null,
    "timestamp": "2025-08-13T15:30:00Z"
  }
}
```

**GET /posts/stats**
```json
{
  "success": true,
  "data": {
    "totalUsers": 10,
    "totalPosts": 100,
    "averagePostsPerUser": 10.0,
    "topUser": {
      "name": "John Doe",
      "postCount": 15
    }
  }
}
```

## 🧪 Testing

### Backend Tests (ES Modules)
```bash
cd backend
npm test                    # 24/24 tests passing ✅
npm run test:watch         # Tests en modo watch
npm run lint               # ESLint verification
npm run lint:fix           # Auto-fix ESLint issues
```

**Test Coverage**: 24/24 tests passing
- ✅ Unit tests for data processors
- ✅ Integration tests for API endpoints
- ✅ Error handling validation
- ✅ ES Modules compatibility

### Frontend Tests (Vitest)
```bash
cd frontend
npm test                   # 31/31 tests passing ✅
npm run test:coverage     # Tests with coverage report
npm run test:ci           # Single run for CI
```

**Test Coverage**: 31/31 tests passing
- ✅ Component testing with React Testing Library
- ✅ Custom hooks testing
- ✅ Service layer testing
- ✅ Error boundary testing

### Container-based Testing
```bash
# Run all tests in containers
docker-compose exec backend npm test
docker-compose exec frontend npm run test:ci

# Total: 55/55 tests passing ✅
```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
NODE_ENV=development
PORT=3001
API_BASE_URL=https://687eade4efe65e5200875629.mockapi.io/api/v1
CORS_ORIGIN=http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

#### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_APP_NAME=BlueMed Dashboard
VITE_APP_VERSION=1.0.0
VITE_ENABLE_DEBUG=true
```

### Modern ES Modules Configuration

#### Backend package.json
```json
{
  "type": "module",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### TailwindCSS v4 Configuration

```css
/* frontend/src/index.css */
@import "tailwindcss";

@theme {
  --color-primary-50: #eff6ff;
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
}
```

## 🏗️ Development Guidelines

### Code Style
- **ES Modules**: Modern `import`/`export` syntax throughout
- **TypeScript**: Strict mode enabled
- **ESLint**: Modern JavaScript standards
- **Prettier**: Automated formatting
- **Modular Architecture**: Separation of concerns

### Component Patterns
- **Custom Hooks**: Reusable logic extraction
- **Props Interfaces**: Readonly prop types
- **Error Boundaries**: Graceful error handling
- **Estados de Carga**: Optimización de experiencia de usuario

### Diseño de API
- **RESTful**: Métodos HTTP estándar y códigos de estado
- **Formato de Respuesta Consistente**: Patrones de éxito/error
- **Manejo de Errores**: Mensajes de error descriptivos
- **Validación**: Sanitización y validación de entrada

## 📦 Construcción y Despliegue

### Construcción Local
```bash
# Construcción del frontend
cd frontend
npm run build
# Salida: directorio dist/

# Backend está listo para producción (ES Modules)
cd backend
npm start  # Ejecuta server.js
```

### Construcción Docker de Producción
```bash
# Construir imágenes de producción
docker-compose -f docker-compose.prod.yml build

# Desplegar con entorno apropiado
docker-compose -f docker-compose.prod.yml up -d
```

### Construcciones Docker Multi-etapa
Ambos Dockerfiles usan construcciones multi-etapa optimizadas:
- **Backend**: Node.js Alpine solo con dependencias de producción
- **Frontend**: Etapa de construcción + Nginx sirviendo archivos estáticos

## 🔍 Monitoreo y Salud

### Verificaciones de Salud
- **Backend**: `GET /api/health` con información de tiempo de actividad
- **Frontend**: Endpoint de salud de Nginx
- **Docker**: Comandos de verificación de salud integrados
- **Contenedor**: Reinicio automático en caso de falla

### Registro de Logs
- **Backend**: Logging estructurado con Morgan
- **Frontend**: Logging de consola en desarrollo
- **Docker**: Recolección centralizada de logs vía `docker-compose logs`

## 🚀 Optimizaciones de Rendimiento

### Backend (Node.js + ES Modules)
- **ES Modules**: Carga moderna de módulos
- **Compresión**: Middleware de compresión Gzip
- **Limitación de Velocidad**: Protección de API
- **Monitoreo de Salud**: Monitoreo proactivo
- **Cierre Elegante**: Limpieza apropiada

### Frontend (Vite + React 19)
- **Hot Module Replacement**: Actualizaciones instantáneas en desarrollo
- **Tree Shaking**: Eliminación de código muerto
- **Code Splitting**: Carga perezosa de componentes
- **Optimización de Assets**: Optimización de imágenes y CSS
- **Bundling Moderno**: Proceso de construcción optimizado de Vite

## 🐛 Solución de Problemas

### Problemas Comunes

#### Problemas con ES Modules
```bash
# Verificar configuración de ES modules
cd backend
node -e "console.log(require('./package.json').type)"
# Debería mostrar: "module"

# Verificar sintaxis de imports
grep -r "require(" src/  # No debería devolver resultados
grep -r "module.exports" src/  # No debería devolver resultados
```

#### Problemas con Docker
```bash
# Limpiar caché de Docker
docker system prune -a

# Reconstruir sin caché
docker-compose build --no-cache

# Verificar logs de contenedores
docker-compose logs backend
docker-compose logs frontend
```

#### Conflictos de Puertos
```bash
# Verificar qué está ejecutándose en los puertos
netstat -ano | findstr :3000
netstat -ano | findstr :3001

# Matar procesos si es necesario
taskkill /F /IM node.exe
```

## 📚 Aprende Más

### Tecnologías Utilizadas
- [Node.js ES Modules](https://nodejs.org/docs/latest-v20.x/api/esm.html)
- [Documentación Vite](https://vitejs.dev)
- [Características React 19](https://react.dev)
- [TailwindCSS v4](https://tailwindcss.com)
- [Guía Express.js](https://expressjs.com)
- [Docker Compose](https://docs.docker.com/compose)
- [Vitest Testing](https://vitest.dev)

### Mejores Prácticas Aplicadas
- **JavaScript Moderno**: Características ES2025+ con ES Modules
- **Patrones TypeScript**: Uso avanzado de tipos
- **Patrones React**: Hooks y optimización de rendimiento
- **Patrones Node.js**: Async/await con ES Modules
- **Patrones Docker**: Construcciones multi-etapa y optimización
- **Patrones de Pruebas**: Cobertura de pruebas integral

## 🤝 Contribuyendo

1. Hacer fork del repositorio
2. Crear una rama de características (`git checkout -b feature/CaracteristicaIncreible`)
3. Seguir los estándares de código (ES Modules, TypeScript)
4. Agregar pruebas para nuevas características
5. Asegurar que todas las pruebas pasen (`npm test` en ambos directorios)
6. Enviar un pull request

### Estándares de Desarrollo
- Usar ES Modules (`import`/`export`) en todas partes
- Seguir el modo estricto de TypeScript
- Mantener 100% de cobertura de pruebas
- Usar mensajes de commit convencionales
- Documentar nuevas características

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👥 Autores

- José Andrés Auyón Cóbar

## 🎯 Estado del Proyecto

### ✅ Características Completadas
- **Backend**: 24/24 pruebas pasando, migración a ES Modules completa
- **Frontend**: 31/31 pruebas pasando, características modernas de React 19
- **Docker**: Contenedorización completa con configuraciones de desarrollo y producción
- **Pruebas**: Cobertura de pruebas integral en todo el stack
- **Documentación**: Instrucciones completas de configuración y despliegue

### 📊 Métricas Técnicas
- **Total de Pruebas**: 55/55 pasando ✅
- **Cobertura Backend**: 100% endpoints API probados
- **Cobertura Frontend**: 100% componentes y hooks probados
- **Salud Docker**: Todos los servicios saludables
- **Rendimiento**: Tiempos de respuesta sub-segundo

---

**Construido con ❤️ usando las últimas tecnologías 2025 y ES Modules**

*Última actualización: 13 de agosto, 2025*