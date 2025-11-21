# Práctica de Peticiones HTTP/HTTPS

## Objetivo
Comprender y aplicar los conceptos de HTTP/HTTPS, métodos REST, códigos de estado y CORS desde el entorno del frontend. Esta práctica implementa una página web responsiva y semántica que realiza peticiones simuladas a un servidor, registrando, analizando y documentando los resultados obtenidos.

## Descripción del Proyecto
Aplicación web interactiva que permite realizar peticiones HTTP utilizando los métodos REST más comunes (GET, POST, PUT, DELETE) hacia la API pública JSONPlaceholder. La aplicación registra y muestra información detallada sobre cada petición, incluyendo tiempos de respuesta, códigos de estado, headers y políticas CORS.

## Equipos y Herramientas

### Tecnologías Frontend
- **HTML5**: Estructura semántica y accesible
- **CSS3**: Diseño responsivo con variables CSS y Flexbox/Grid
- **JavaScript (ES6+)**: Lógica de negocio y manejo de peticiones

### APIs y Bibliotecas
- **Fetch API**: Para realizar solicitudes HTTP asíncronas
- **JSONPlaceholder**: API REST de prueba (https://jsonplaceholder.typicode.com)

### Herramientas de Desarrollo
- **VS Code**: Editor de código
- **Live Server**: Extensión para servidor local
- **Browser DevTools**: Herramientas de desarrollo del navegador
  - **Network Tab**: Análisis de peticiones HTTP
  - **Console**: Registro de logs y debugging

## Procedimiento / Metodología

### 1. Métodos HTTP Implementados

#### GET
- **Propósito**: Obtener/recuperar un recurso existente
- **Endpoint**: `/posts/{id}`
- **Características**: 
  - No modifica datos en el servidor
  - Es idempotente (múltiples peticiones producen el mismo resultado)
  - Respuesta cacheable

#### POST
- **Propósito**: Crear un nuevo recurso
- **Endpoint**: `/posts`
- **Características**:
  - Envía datos en el body de la petición
  - No es idempotente
  - Retorna el recurso creado (normalmente con código 201)

#### PUT
- **Propósito**: Actualizar completamente un recurso existente
- **Endpoint**: `/posts/{id}`
- **Características**:
  - Reemplaza el recurso completo
  - Es idempotente
  - Requiere enviar todos los campos del recurso

#### DELETE
- **Propósito**: Eliminar un recurso
- **Endpoint**: `/posts/{id}`
- **Características**:
  - Es idempotente
  - Retorna código 200 o 204 en caso de éxito

### 2. Implementación de la Práctica

1. **Creación de la estructura HTML**: Página semántica con controles para cada método HTTP
2. **Diseño CSS responsivo**: Interfaz adaptable a diferentes dispositivos
3. **Implementación JavaScript**: Funciones asíncronas con Fetch API
4. **Registro de logs**: Sistema dual de logging (consola del navegador + interfaz visual)
5. **Visualización de resultados**: Cards dinámicas con información detallada de cada petición

### 3. Análisis de Resultados

Para cada petición se registra:
- **URL solicitada**: Endpoint completo de la API
- **Método HTTP**: GET, POST, PUT o DELETE
- **Código de estado**: Respuesta del servidor (200, 201, 404, etc.)
- **Tiempo de respuesta**: Medido en milisegundos usando Performance API
- **Headers**: Request y Response headers
- **Política CORS**: Access-Control-Allow-Origin y otros headers relacionados
- **Datos de respuesta**: Body de la respuesta en formato JSON

## Resultados de las Peticiones

| Método | URL | Código de Estado | Tiempo Respuesta | Observaciones CORS |
|--------|-----|------------------|------------------|-------------------|
| GET | https://jsonplaceholder.typicode.com/posts/1 | 200 OK | ~150-300ms | `*` (Permite todos los orígenes) |
| POST | https://jsonplaceholder.typicode.com/posts | 201 Created | ~200-350ms | `*` (Permite todos los orígenes) |
| PUT | https://jsonplaceholder.typicode.com/posts/1 | 200 OK | ~180-320ms | `*` (Permite todos los orígenes) |
| DELETE | https://jsonplaceholder.typicode.com/posts/1 | 200 OK | ~150-280ms | `*` (Permite todos los orígenes) |

### Notas sobre CORS
- JSONPlaceholder permite peticiones desde cualquier origen (`Access-Control-Allow-Origin: *`)
- Los headers CORS se pueden observar en la pestaña Network de DevTools
- Para APIs con restricciones CORS, se requeriría configuración del lado del servidor

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

1. **Clonar o descargar el repositorio**
2. **Abrir el proyecto en VS Code**
3. **Instalar la extensión Live Server** (si no está instalada)
4. **Hacer clic derecho en `index.html`** y seleccionar "Open with Live Server"
5. **Abrir las Developer Tools** (F12 en la mayoría de navegadores)
6. **Ir a la pestaña Network** para observar las peticiones HTTP
7. **Hacer clic en los botones** GET, POST, PUT o DELETE
8. **Observar los resultados** en la interfaz y en la consola
9. **Analizar los headers** y políticas CORS en la pestaña Network

## Características Destacadas

### 🎨 Diseño Responsivo
- Adaptable a dispositivos móviles, tablets y escritorio
- Uso de CSS Grid y Flexbox
- Variables CSS para fácil personalización

### 📊 Visualización Completa
- Registro visual de logs en tiempo real
- Cards informativas con todos los detalles de cada petición
- Formato JSON legible con syntax highlighting

### ⚡ Performance
- Medición precisa del tiempo de respuesta
- Manejo eficiente de peticiones asíncronas
- Feedback visual durante las peticiones (loading states)

### 🔍 Debugging
- Logs detallados en consola del navegador
- Información completa de headers
- Visualización de datos de request y response

## Estructura del Proyecto

```
DesarrolloSoftwareAPE5/
│
├── index.html          # Estructura HTML semántica
├── styles.css          # Estilos CSS responsivos
├── script.js           # Lógica JavaScript con Fetch API
└── README.md           # Documentación del proyecto
```

## Aprendizajes Clave

1. **Fetch API**: Uso de promesas y async/await para peticiones HTTP
2. **Métodos REST**: Comprender cuándo usar cada método HTTP
3. **Códigos de Estado**: Interpretación correcta de las respuestas del servidor
4. **CORS**: Entender las políticas de seguridad entre dominios
5. **Developer Tools**: Uso efectivo de las herramientas de debugging del navegador
6. **JavaScript Moderno**: Manejo de eventos, manipulación del DOM y programación asíncrona

## Mejoras Futuras

- [ ] Implementar PATCH para actualizaciones parciales
- [ ] Agregar autenticación con tokens
- [ ] Implementar manejo de errores más robusto
- [ ] Agregar tests unitarios
- [ ] Crear versión con Axios como alternativa a Fetch
- [ ] Implementar rate limiting visual
- [ ] Agregar opción de exportar resultados a CSV/JSON

## Conclusiones

Esta práctica permite comprender de manera práctica y visual cómo funcionan las peticiones HTTP, los métodos REST y las políticas CORS. La implementación con Fetch API demuestra cómo las aplicaciones frontend modernas se comunican con APIs backend, fundamental para el desarrollo de aplicaciones web completas.


