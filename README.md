# Rick & Morty API Explorer

## Objetivo
Comprender y aplicar los conceptos de HTTP/HTTPS, métodos REST (específicamente GET), códigos de estado y CORS desde el entorno del frontend. Esta práctica implementa una página web responsiva y semántica que realiza peticiones a la API de Rick and Morty, registrando, analizando y documentando los resultados obtenidos.

## Descripción del Proyecto
Explorador web interactivo que permite realizar peticiones HTTP GET hacia la API pública de Rick and Morty, accediendo a tres tipos de recursos:
- **Personajes**: 826 personajes de la serie
- **Ubicaciones**: 126 ubicaciones del universo Rick and Morty
- **Episodios**: 51 episodios de la serie

La aplicación registra y muestra información detallada sobre cada petición, incluyendo tiempos de respuesta, códigos de estado, headers y políticas CORS, con una interfaz moderna y atractiva.

## Equipos y Herramientas

### Tecnologías Frontend
- **HTML5**: Estructura semántica y accesible
- **CSS3**: Diseño responsivo con variables CSS y Flexbox/Grid
- **JavaScript (ES6+)**: Lógica de negocio y manejo de peticiones

### APIs y Bibliotecas
- **Fetch API**: Para realizar solicitudes HTTP asíncronas
- **Rick and Morty API**: API REST pública (https://rickandmortyapi.com)

### Herramientas de Desarrollo
- **VS Code**: Editor de código
- **Live Server**: Extensión para servidor local
- **Browser DevTools**: Herramientas de desarrollo del navegador
  - **Network Tab**: Análisis de peticiones HTTP
  - **Console**: Registro de logs y debugging

## Procedimiento / Metodología

### 1. Recursos Disponibles

#### Personajes (Characters)
- **Total**: 826 personajes
- **Endpoints**:
  - `GET /api/character/{id}` - Obtener un personaje específico
  - `GET /api/character` - Obtener lista paginada de personajes
- **Datos incluidos**: Nombre, estado (vivo/muerto/desconocido), especie, género, origen, ubicación, imagen, episodios

#### Ubicaciones (Locations)
- **Total**: 126 ubicaciones
- **Endpoints**:
  - `GET /api/location/{id}` - Obtener una ubicación específica
  - `GET /api/location` - Obtener lista paginada de ubicaciones
- **Datos incluidos**: Nombre, tipo, dimensión, residentes, fecha de creación

#### Episodios (Episodes)
- **Total**: 51 episodios
- **Endpoints**:
  - `GET /api/episode/{id}` - Obtener un episodio específico
  - `GET /api/episode` - Obtener lista paginada de episodios
- **Datos incluidos**: Nombre, código del episodio, fecha de emisión, personajes, fecha de creación

### 2. Método HTTP Implementado: GET

#### Características del método GET
- **Propósito**: Obtener/recuperar recursos existentes
- **Seguro**: No modifica datos en el servidor
- **Idempotente**: Múltiples peticiones producen el mismo resultado
- **Cacheable**: Las respuestas pueden ser almacenadas en caché
- **Sin body**: Los parámetros se envían en la URL

### 3. Implementación de la Práctica

1. **Selector de recursos**: Interfaz para elegir entre Personajes, Ubicaciones o Episodios
2. **Estructura HTML semántica**: Página responsiva con controles intuitivos
3. **Diseño CSS moderno**: Interfaz glassmorphism con animaciones y transiciones suaves
4. **JavaScript con Fetch API**: Funciones asíncronas para peticiones HTTP GET
5. **Registro de logs**: Sistema dual de logging (consola del navegador + interfaz visual)
6. **Visualización enriquecida**: 
   - Vista detallada individual con imágenes (personajes)
   - Vista de lista con los primeros 10 resultados
   - Información de paginación
   - JSON completo expandible

### 4. Análisis de Resultados

Para cada petición GET se registra:
- **URL solicitada**: Endpoint completo de la API
- **Método HTTP**: GET
- **Código de estado**: Respuesta del servidor (200 OK o 404 Not Found)
- **Tiempo de respuesta**: Medido en milisegundos usando Performance API
- **Headers**: Response headers del servidor
- **Política CORS**: Access-Control-Allow-Origin (permite todos los orígenes: *)
- **Datos de respuesta**: Body de la respuesta en formato JSON
- **Visualización específica**: Vista adaptada según el tipo de recurso solicitado

## Resultados de las Peticiones GET

### Tabla de Resultados

| Método | URL | Código de estado | Tiempo respuesta | Observaciones CORS |
|--------|-----|------------------|------------------|--------------------|
| GET | https://rickandmortyapi.com/api/character/1 | 200 OK | ~100-250ms | `*` (Permite todos los orígenes) |
| GET | https://rickandmortyapi.com/api/character | 200 OK | ~150-300ms | `*` (Permite todos los orígenes) |
| GET | https://rickandmortyapi.com/api/location/1 | 200 OK | ~100-200ms | `*` (Permite todos los orígenes) |
| GET | https://rickandmortyapi.com/api/location | 200 OK | ~150-300ms | `*` (Permite todos los orígenes) |
| GET | https://rickandmortyapi.com/api/episode/1 | 200 OK | ~100-200ms | `*` (Permite todos los orígenes) |
| GET | https://rickandmortyapi.com/api/episode | 200 OK | ~150-300ms | `*` (Permite todos los orígenes) |

### Resumen por Recurso

| Recurso | Endpoint | Código de Estado | Tiempo Respuesta | Datos Retornados |
|---------|----------|------------------|------------------|------------------|
| Personaje específico | `/api/character/1` | 200 OK | ~100-250ms | Datos completos + imagen |
| Lista de personajes | `/api/character` | 200 OK | ~150-300ms | 20 resultados paginados |
| Ubicación específica | `/api/location/1` | 200 OK | ~100-200ms | Datos completos |
| Lista de ubicaciones | `/api/location` | 200 OK | ~150-300ms | 20 resultados paginados |
| Episodio específico | `/api/episode/1` | 200 OK | ~100-200ms | Datos completos |
| Lista de episodios | `/api/episode` | 200 OK | ~150-300ms | 20 resultados paginados |

### Notas sobre CORS
- La API de Rick and Morty permite peticiones desde cualquier origen (`Access-Control-Allow-Origin: *`)
- Los headers CORS se pueden observar en la pestaña Network de DevTools
- No requiere autenticación ni API keys
- Perfecta para prácticas educativas de HTTP/REST

## Códigos de Estado HTTP Comunes

| Código | Descripción | Significado |
|--------|-------------|-------------|
| 200 | OK | Petición exitosa |
| 201 | Created | Recurso creado exitosamente |
| 204 | No Content | Petición exitosa sin contenido de respuesta |
| 400 | Bad Request | Petición malformada |
| 401 | Unauthorized | Autenticación requerida |
| 403 | Forbidden | Acceso denegado |
| 404 | Not Found | Recurso no encontrado |
| 500 | Internal Server Error | Error del servidor |

## Instrucciones de Uso

1. **Abrir el proyecto**: Abre `index.html` con Live Server en VS Code
2. **Seleccionar tipo de recurso**: Haz clic en Personajes, Ubicaciones o Episodios
3. **Consultar un recurso específico**:
   - Ingresa un ID válido en el campo de entrada
   - Haz clic en "Obtener Recurso (GET)"
4. **Consultar lista de recursos**:
   - Haz clic en "Obtener Todos (GET)" para ver los primeros 10 resultados
5. **Abrir Developer Tools** (F12):
   - Ve a la pestaña **Network**
   - Observa las peticiones HTTP en tiempo real
   - Revisa los headers de request y response
   - Analiza la política CORS
6. **Explorar los resultados**:
   - Para personajes: verás imagen, estado, especie, ubicación, etc.
   - Para ubicaciones: verás tipo, dimensión, número de residentes
   - Para episodios: verás código, fecha de emisión, personajes
7. **Revisar los logs**: Observa el registro de actividad con timestamps

## Características Destacadas

### 🎨 Diseño Moderno
- Interfaz glassmorphism con efectos de vidrio translúcido
- Fondo animado con círculos de colores
- Adaptable a dispositivos móviles, tablets y escritorio
- Transiciones y animaciones suaves
- Tema oscuro para mejor experiencia visual

### 📊 Explorador de Recursos
- **3 tipos de recursos**: Personajes, Ubicaciones y Episodios
- Vista individual detallada con imágenes (personajes)
- Vista de lista con primeros 10 resultados
- Información de paginación (total, páginas)
- Estadísticas en tiempo real de la API

### 🎯 Visualización Enriquecida
- **Personajes**: Imagen, estado (vivo/muerto), especie, origen, ubicación
- **Ubicaciones**: Tipo, dimensión, número de residentes
- **Episodios**: Código, fecha de emisión, número de personajes
- JSON completo expandible para análisis detallado
- Badges de estado con colores diferenciados

### ⚡ Performance
- Medición precisa del tiempo de respuesta
- Manejo eficiente de peticiones asíncronas con Fetch API
- Estados de carga con spinners animados
- Validación de IDs según el tipo de recurso

### 🔍 Debugging Avanzado
- Logs con timestamps en tiempo real
- Registro tanto visual como en consola del navegador
- Información completa de CORS y headers
- Manejo robusto de errores 404

## Estructura del Proyecto

```
DesarrolloSoftwareAPE5/
│
├── index.html          # Estructura HTML semántica
├── styles.css          # Estilos CSS responsivos
├── script.js           # Lógica JavaScript con Fetch API
├── README.md           # Documentación del proyecto
└── API_INFO.md         # Información detallada de Rick and Morty API
```

## Aprendizajes Clave

1. **Fetch API**: Uso de promesas y async/await para peticiones HTTP asíncronas
2. **Método GET**: Comprensión profunda del método HTTP más común
   - Obtención de recursos individuales por ID
   - Consulta de listas paginadas
   - Manejo de parámetros en la URL
3. **Códigos de Estado**: Interpretación de respuestas del servidor
   - **200 OK**: Petición exitosa con datos
   - **404 Not Found**: Recurso no encontrado (ID inválido)
4. **CORS**: Entender las políticas de seguridad entre dominios
   - Access-Control-Allow-Origin: *
   - Peticiones sin autenticación
5. **APIs RESTful**: Estructura y convenciones de APIs REST modernas
   - Endpoints semánticos (/character, /location, /episode)
   - Respuestas en formato JSON
   - Paginación de resultados
6. **Developer Tools**: Uso efectivo de las herramientas de debugging
   - Inspección de peticiones en Network tab
   - Análisis de headers y tiempos de respuesta
7. **JavaScript Moderno**: 
   - Manipulación dinámica del DOM
   - Manejo de estado de la aplicación
   - Eventos y listeners
   - Programación asíncrona
8. **UX/UI**: Feedback visual durante operaciones asíncronas

## 📖 Información Adicional

Para más detalles sobre la API de Rick and Morty, consulta el archivo [API_INFO.md](API_INFO.md) que incluye:
- Endpoints disponibles para cada recurso
- Ejemplos completos de respuestas JSON
- Personajes, ubicaciones y episodios populares con IDs
- Tips y buenas prácticas para la exploración

## Funcionalidades Implementadas

- [x] Selector de tipo de recurso (Personajes, Ubicaciones, Episodios)
- [x] Peticiones GET individuales por ID
- [x] Peticiones GET de listas con paginación
- [x] Visualización enriquecida según tipo de recurso
- [x] Imágenes de personajes
- [x] Badges de estado con colores
- [x] Sistema de logs con timestamps
- [x] Medición de tiempos de respuesta
- [x] Análisis de CORS y headers
- [x] Interfaz responsiva y moderna
- [x] Validación de IDs según recurso
- [x] Manejo de errores 404
- [x] Estados de carga animados
- [x] Estadísticas de la API

## Posibles Mejoras Futuras

- [ ] Implementar búsqueda por nombre/filtros
- [ ] Agregar navegación de paginación (siguiente/anterior)
- [ ] Crear favoritos con LocalStorage
- [ ] Implementar modo claro/oscuro toggle
- [ ] Agregar gráficos de estadísticas
- [ ] Exportar resultados a JSON/CSV
- [ ] Historial de búsquedas
- [ ] Comparador de personajes lado a lado

## Conclusiones

Este explorador de la API de Rick and Morty permite comprender de manera práctica y visual:

1. **Peticiones HTTP GET**: La forma más común de obtener datos de una API REST
2. **Códigos de Estado**: Interpretación de respuestas exitosas (200) y errores (404)
3. **CORS**: Políticas de seguridad para peticiones cross-origin
4. **JSON**: Formato estándar para intercambio de datos
5. **APIs RESTful**: Estructura y convenciones de APIs modernas
6. **Programación Asíncrona**: Uso de async/await para operaciones no bloqueantes
7. **UX en aplicaciones web**: Feedback visual y estados de carga

La implementación con Fetch API y una interfaz moderna demuestra cómo las aplicaciones frontend se comunican efectivamente con APIs backend, fundamental para el desarrollo web full-stack.

## 🎓 Valor Educativo

Esta práctica es ideal para:
- Estudiantes aprendiendo desarrollo web
- Práctica de conceptos HTTP/REST
- Comprensión de APIs públicas
- Análisis de políticas CORS
- Debugging con Developer Tools
- Diseño de interfaces modernas y responsivas

---

**Repositorio**: DesarrolloSoftwareAPE5  
**Autor**: Desarrollo de Software - Quinto Ciclo  
**API**: [Rick and Morty API](https://rickandmortyapi.com)  
**Fecha**: 2025


