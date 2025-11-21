# Rick and Morty API - Información

## 🌟 Acerca de la API

La [Rick and Morty API](https://rickandmortyapi.com) es una API REST pública y gratuita que proporciona información sobre los personajes, ubicaciones y episodios de la serie animada "Rick and Morty".

### Características
- ✅ **Gratuita**: No requiere autenticación
- ✅ **CORS habilitado**: Permite peticiones desde cualquier origen
- ✅ **Solo lectura**: No permite modificar datos (POST, PUT, DELETE retornan 404)
- ✅ **GraphQL disponible**: Además del REST API
- ✅ **Bien documentada**: https://rickandmortyapi.com/documentation

## 📊 Endpoints Disponibles

### Characters (Personajes)
```
GET /api/character          - Lista todos los personajes (paginado)
GET /api/character/{id}     - Obtiene un personaje específico
GET /api/character/{ids}    - Obtiene múltiples personajes (ej: 1,2,3)
```

**Total de personajes**: 826

### Locations (Ubicaciones)
```
GET /api/location           - Lista todas las ubicaciones
GET /api/location/{id}      - Obtiene una ubicación específica
```

### Episodes (Episodios)
```
GET /api/episode            - Lista todos los episodios
GET /api/episode/{id}       - Obtiene un episodio específico
```

## 🎯 Ejemplo de Respuesta - Personaje

```json
{
  "id": 1,
  "name": "Rick Sanchez",
  "status": "Alive",
  "species": "Human",
  "type": "",
  "gender": "Male",
  "origin": {
    "name": "Earth (C-137)",
    "url": "https://rickandmortyapi.com/api/location/1"
  },
  "location": {
    "name": "Citadel of Ricks",
    "url": "https://rickandmortyapi.com/api/location/3"
  },
  "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  "episode": [
    "https://rickandmortyapi.com/api/episode/1",
    "https://rickandmortyapi.com/api/episode/2",
    // ... más episodios
  ],
  "url": "https://rickandmortyapi.com/api/character/1",
  "created": "2017-11-04T18:48:46.250Z"
}
```

## 🔍 Campos del Personaje

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | int | ID único del personaje |
| name | string | Nombre del personaje |
| status | string | Estado: "Alive", "Dead" o "unknown" |
| species | string | Especie del personaje |
| type | string | Tipo o subespecie del personaje |
| gender | string | Género: "Female", "Male", "Genderless" o "unknown" |
| origin | object | Ubicación de origen |
| location | object | Última ubicación conocida |
| image | string | URL de la imagen del personaje |
| episode | array | Lista de episodios donde aparece |
| url | string | URL del recurso del personaje |
| created | string | Fecha de creación del registro |

## 🎨 Personajes Populares (IDs)

- **1**: Rick Sanchez
- **2**: Morty Smith
- **3**: Summer Smith
- **4**: Beth Smith
- **5**: Jerry Smith
- **38**: Birdperson
- **169**: Evil Morty
- **183**: Johnny Depp
- **244**: Mr. Meeseeks
- **338**: Tiny Rick

## 💡 Tips para la Práctica

1. **IDs válidos**: Los personajes van del 1 al 826
2. **Manejo de errores**: Probar con IDs inválidos (ej: 999) para ver respuesta 404
3. **Velocidad**: La API es muy rápida (~100-250ms)
4. **CORS**: Observar el header `Access-Control-Allow-Origin: *`
5. **Cache**: La API usa cache, observar el header `Cache-Control`

## 🚫 Métodos No Permitidos

Esta API es de **solo lectura**. Los siguientes métodos retornarán **404 Not Found**:

- `POST /api/character` - Crear personaje
- `PUT /api/character/{id}` - Actualizar personaje
- `PATCH /api/character/{id}` - Modificar personaje
- `DELETE /api/character/{id}` - Eliminar personaje

Esto es **ideal para la práctica** porque permite:
- ✅ Aprender a manejar errores HTTP
- ✅ Entender códigos de estado (200 vs 404)
- ✅ Practicar validación de respuestas
- ✅ Implementar manejo robusto de errores

## 📚 Recursos Adicionales

- **Documentación oficial**: https://rickandmortyapi.com/documentation
- **GraphQL**: https://rickandmortyapi.com/graphql
- **Repositorio GitHub**: https://github.com/afuh/rick-and-morty-api
- **Estado del servicio**: https://status.rickandmortyapi.com

## 🔄 Comparación con JSONPlaceholder

| Característica | Rick & Morty API | JSONPlaceholder |
|----------------|------------------|-----------------|
| Datos reales | ✅ Personajes reales | ⚠️ Datos ficticios |
| Solo lectura | ✅ Sí | ❌ Permite POST/PUT/DELETE |
| Documentación | ✅ Excelente | ✅ Buena |
| CORS | ✅ Habilitado | ✅ Habilitado |
| Velocidad | ✅ Muy rápida | ✅ Rápida |
| Aprendizaje | ✅ Manejo de errores | ✅ CRUD completo |

## 🎓 Objetivos de Aprendizaje

Al usar esta API aprenderás:

1. **Peticiones GET exitosas**: Respuestas 200 OK
2. **Manejo de errores 404**: Entender recursos no encontrados
3. **Análisis de CORS**: Ver headers de seguridad
4. **Inspección de headers**: Content-Type, Cache-Control, etc.
5. **Parsing JSON**: Trabajar con datos estructurados complejos
6. **Performance**: Medir tiempos de respuesta reales

---

**Nota**: Esta API es perfecta para aprender sobre HTTP/REST porque es rápida, confiable, no requiere autenticación y tiene datos interesantes y bien estructurados.
