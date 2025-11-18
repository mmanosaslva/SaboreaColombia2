# 🔌 ENDPOINTS - 35+ RUTAS

## 📋 Resumen por módulo

| Módulo | Cantidad | Endpoints |
|--------|----------|-----------|
| Autenticación | 4 | register, login, logout, perfil |
| Regiones | 5 | CRUD + filtros |
| Ciudades | 6 | CRUD + relaciones |
| Platos | 8 | CRUD + búsqueda + historia |
| Restaurantes | 8 | CRUD + búsqueda + menú |
| Plato-Restaurante | 4 | CRUD Many-to-Many |
| **TOTAL** | **35** | |

---

## 🔐 AUTENTICACIÓN (4 endpoints)

### 1. POST /auth/register
**Descripción:** Registrar nuevo usuario
**Público:** ✅ Sí
**Body:**
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "contraseña": "MinPassword123!"
}
```
**Response (201):**
```json
{
  "id": "uuid",
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "rol": "usuario",
  "activo": true,
  "createdAt": "2025-11-15T10:00:00Z"
}
```

---

### 2. POST /auth/login
**Descripción:** Iniciar sesión y obtener JWT
**Público:** ✅ Sí
**Body:**
```json
{
  "email": "juan@example.com",
  "contraseña": "MinPassword123!"
}
```
**Response (200):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": "uuid",
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "rol": "usuario"
  }
}
```

---

### 3. POST /auth/logout
**Descripción:** Cerrar sesión (invalidar token)
**Público:** ❌ Requiere JWT
**Response (200):**
```json
{
  "mensaje": "Sesión cerrada exitosamente"
}
```

---

### 4. GET /auth/perfil
**Descripción:** Obtener información del perfil autenticado
**Público:** ❌ Requiere JWT
**Response (200):**
```json
{
  "id": "uuid",
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "rol": "usuario",
  "activo": true,
  "createdAt": "2025-11-15T10:00:00Z"
}
```

---

## 🌍 REGIONES (5 endpoints)

### 5. GET /regiones
**Descripción:** Obtener todas las regiones
**Público:** ✅ Sí
**Query Parameters:** limit, offset
**Response (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "nombre": "Caribe",
      "descripcion": "REGION costera con influencias africanas...",
      "imagenUrl": "https://..."
    }
  ],
  "total": 5
}
```

---

### 6. GET /regiones/:id
**Descripción:** Obtener region por ID (incluye ciudades y platos)
**Público:** ✅ Sí
**Response (200):**
```json
{
  "id": "uuid",
  "nombre": "Caribe",
  "descripcion": "REGION costera...",
  "imagenUrl": "https://...",
  "ciudades": [
    {
      "id": "uuid",
      "nombre": "Cartagena"
    }
  ],
  "platos": [
    {
      "id": "uuid",
      "nombre": "Arepas de queso"
    }
  ]
}
```

---

### 7. POST /regiones
**Descripción:** Crear nueva region
**Público:** ❌ Requiere Admin
**Body:**
```json
{
  "nombre": "Nueva REGION",
  "descripcion": "Descripción detallada...",
  "imagenUrl": "https://..."
}
```

---

### 8. PATCH /regiones/:id
**Descripción:** Actualizar region
**Público:** ❌ Requiere Admin
**Body:**
```json
{
  "descripcion": "Nueva descripción...",
  "imagenUrl": "https://..."
}
```

---

### 9. DELETE /regiones/:id
**Descripción:** Eliminar region (cascade)
**Público:** ❌ Requiere Admin
**Response (200):**
```json
{
  "mensaje": "REGION eliminada exitosamente"
}
```

---

## 🏙️ CIUDADES (6 endpoints)

### 10. GET /ciudades
**Descripción:** Obtener todas las ciudades
**Público:** ✅ Sí
**Query Parameters:** regionId, limit, offset
**Response (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "nombre": "Cartagena",
      "region": {
        "id": "uuid",
        "nombre": "Caribe"
      },
      "descripcion": "Ciudad patrimonial..."
    }
  ],
  "total": 10
}
```

---

### 11. GET /ciudades/:id
**Descripción:** Obtener ciudad por ID (incluye restaurantes)
**Público:** ✅ Sí
**Response (200):**
```json
{
  "id": "uuid",
  "nombre": "Cartagena",
  "region": {
    "id": "uuid",
    "nombre": "Caribe"
  },
  "descripcion": "Ciudad patrimonial...",
  "restaurantes": [
    {
      "id": "uuid",
      "nombre": "El Corral del Príncipe"
    }
  ]
}
```

---

### 12. GET /regiones/:regionId/ciudades
**Descripción:** Obtener ciudades de una region
**Público:** ✅ Sí
**Response (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "nombre": "Cartagena",
      "descripcion": "Ciudad patrimonial..."
    }
  ],
  "total": 2,
  "region": "Caribe"
}
```

---

### 13. POST /ciudades
**Descripción:** Crear nueva ciudad
**Público:** ❌ Requiere Admin
**Body:**
```json
{
  "nombre": "Nueva Ciudad",
  "regionId": "uuid",
  "descripcion": "Descripción turística..."
}
```

---

### 14. PATCH /ciudades/:id
**Descripción:** Actualizar ciudad
**Público:** ❌ Requiere Admin
**Body:**
```json
{
  "nombre": "Nombre actualizado",
  "descripcion": "Descripción actualizada..."
}
```

---

### 15. DELETE /ciudades/:id
**Descripción:** Eliminar ciudad
**Público:** ❌ Requiere Admin
**Response (200):**
```json
{
  "mensaje": "Ciudad eliminada exitosamente"
}
```

---

## 🍽️ PLATOS TÍPICOS (8 endpoints)

### 16. GET /platos
**Descripción:** Obtener todos los platos
**Público:** ✅ Sí
**Query Parameters:** regionId, nombre, limit, offset
**Response (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "nombre": "Bandeja Paisa",
      "descripcion": "Plato contundente y variado...",
      "region": {
        "id": "uuid",
        "nombre": "Andina"
      },
      "imagenUrl": "https://..."
    }
  ],
  "total": 25
}
```

---

### 17. GET /platos/:id
**Descripción:** Obtener plato por ID (incluye historia completa)
**Público:** ✅ Sí
**Response (200):**
```json
{
  "id": "uuid",
  "nombre": "Bandeja Paisa",
  "descripcion": "Plato contundente y variado típico de Antioquia",
  "historia": "Surge de la mezcla entre tradición española e ingredientes locales...",
  "ingredientes": "Frijoles, arroz, carne molida, huevo frito...",
  "region": {
    "id": "uuid",
    "nombre": "Andina"
  },
  "imagenUrl": "https://...",
  "restaurantes": [
    {
      "id": "uuid",
      "nombre": "Restaurante X",
      "precio": 45000,
      "disponible": true
    }
  ]
}
```

---

### 18. GET /regiones/:regionId/platos
**Descripción:** Obtener platos de una region
**Público:** ✅ Sí
**Response (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "nombre": "Plato X",
      "descripcion": "..."
    }
  ],
  "total": 5,
  "region": "Andina"
}
```

---

### 19. GET /platos/buscar/:termino
**Descripción:** Buscar platos por nombre
**Público:** ✅ Sí
**Response (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "nombre": "Arepas de queso",
      "descripcion": "...",
      "region": "Caribe"
    }
  ],
  "total": 3,
  "termino": "arepa"
}
```

---

### 20. POST /platos
**Descripción:** Crear nuevo plato
**Público:** ❌ Requiere Admin
**Body:**
```json
{
  "nombre": "Nuevo Plato",
  "descripcion": "Descripción breve",
  "historia": "Historia detallada del plato con más de 50 caracteres...",
  "ingredientes": "Ingrediente 1, Ingrediente 2...",
  "regionId": "uuid",
  "imagenUrl": "https://..."
}
```

---

### 21. PATCH /platos/:id
**Descripción:** Actualizar plato
**Público:** ❌ Requiere Admin
**Body:**
```json
{
  "nombre": "Nombre actualizado",
  "descripcion": "Descripción actualizada...",
  "historia": "Historia actualizada...",
  "imagenUrl": "https://..."
}
```

---

### 22. DELETE /platos/:id
**Descripción:** Eliminar plato
**Público:** ❌ Requiere Admin
**Response (200):**
```json
{
  "mensaje": "Plato eliminado exitosamente"
}
```

---

### 23. GET /platos/:id/historia
**Descripción:** Obtener solo la historia del plato
**Público:** ✅ Sí
**Response (200):**
```json
{
  "id": "uuid",
  "nombre": "Bandeja Paisa",
  "historia": "Surge de la mezcla entre tradición española...",
  "ingredientes": "Frijoles, arroz, carne molida...",
  "imagenUrl": "https://..."
}
```

---

## 🏪 RESTAURANTES (8 endpoints)

### 24. GET /restaurantes
**Descripción:** Obtener todos los restaurantes
**Público:** ✅ Sí
**Query Parameters:** ciudadId, nombre, limit, offset
**Response (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "nombre": "El Corral del Príncipe",
      "ciudad": {
        "id": "uuid",
        "nombre": "Cartagena",
        "region": "Caribe"
      },
      "telefono": "+57 300 123 4567",
      "horario": "11am-10pm",
      "imagenUrl": "https://..."
    }
  ],
  "total": 50
}
```

---

### 25. GET /restaurantes/:id
**Descripción:** Obtener restaurante por ID (incluye platos)
**Público:** ✅ Sí
**Response (200):**
```json
{
  "id": "uuid",
  "nombre": "El Corral del Príncipe",
  "descripcion": "Restaurante tradicional con recetas ancestrales...",
  "direccion": "Calle Principal 123, Cartagena",
  "telefono": "+57 300 123 4567",
  "ciudad": {
    "id": "uuid",
    "nombre": "Cartagena",
    "region": "Caribe"
  },
  "imagenUrl": "https://...",
  "horario": "11am-10pm",
  "platos": [
    {
      "id": "uuid",
      "nombre": "Ceviche",
      "precio": 35000,
      "disponible": true
    }
  ]
}
```

---

### 26. GET /ciudades/:ciudadId/restaurantes
**Descripción:** Obtener restaurantes por ciudad
**Público:** ✅ Sí
**Response (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "nombre": "Restaurante A",
      "telefono": "+57 300 123 4567",
      "horario": "11am-10pm"
    }
  ],
  "total": 8,
  "ciudad": "Cartagena"
}
```

---

### 27. GET /restaurantes/buscar/:termino
**Descripción:** Buscar restaurantes por nombre
**Público:** ✅ Sí
**Response (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "nombre": "Restaurante X",
      "ciudad": "Cartagena"
    }
  ],
  "total": 3,
  "termino": "cartagena"
}
```

---

### 28. POST /restaurantes
**Descripción:** Crear nuevo restaurante
**Público:** ❌ Requiere Admin
**Body:**
```json
{
  "nombre": "Nuevo Restaurante",
  "descripcion": "Descripción del restaurante...",
  "direccion": "Calle Principal 123, Ciudad",
  "telefono": "+57 300 123 4567",
  "ciudadId": "uuid",
  "imagenUrl": "https://...",
  "horario": "11am-10pm"
}
```

---

### 29. PATCH /restaurantes/:id
**Descripción:** Actualizar restaurante
**Público:** ❌ Requiere Admin
**Body:**
```json
{
  "nombre": "Nombre actualizado",
  "horario": "12pm-11pm",
  "telefono": "+57 300 999 8888"
}
```

---

### 30. DELETE /restaurantes/:id
**Descripción:** Eliminar restaurante
**Público:** ❌ Requiere Admin
**Response (200):**
```json
{
  "mensaje": "Restaurante eliminado exitosamente"
}
```

---

### 31. GET /restaurantes/:id/platos
**Descripción:** Obtener platos de un restaurante
**Público:** ✅ Sí
**Response (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "nombre": "Ceviche",
      "descripcion": "...",
      "precio": 35000,
      "disponible": true
    }
  ],
  "total": 15,
  "restaurante": "El Corral del Príncipe"
}
```

---

## 🔗 PLATO-RESTAURANTE (4 endpoints)

### 32. POST /plato-restaurante
**Descripción:** Asignar plato a restaurante con precio
**Público:** ❌ Requiere Admin
**Body:**
```json
{
  "platoId": "uuid",
  "restauranteId": "uuid",
  "precio": 35000,
  "disponible": true
}
```
**Response (201):**
```json
{
  "id": "uuid",
  "plato": {
    "id": "uuid",
    "nombre": "Ceviche"
  },
  "restaurante": {
    "id": "uuid",
    "nombre": "El Corral del Príncipe"
  },
  "precio": 35000,
  "disponible": true
}
```

---

### 33. PATCH /plato-restaurante/:id
**Descripción:** Actualizar precio o disponibilidad
**Público:** ❌ Requiere Admin
**Body:**
```json
{
  "precio": 38000,
  "disponible": false
}
```

---

### 34. DELETE /plato-restaurante/:id
**Descripción:** Remover plato de restaurante
**Público:** ❌ Requiere Admin
**Response (200):**
```json
{
  "mensaje": "Plato removido del restaurante exitosamente"
}
```

---

### 35. GET /plato-restaurante/restaurante/:restauranteId/platos
**Descripción:** Obtener todos los platos con precios
**Público:** ✅ Sí
**Response (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "plato": {
        "id": "uuid",
        "nombre": "Ceviche",
        "historia": "...",
        "ingredientes": "..."
      },
      "precio": 35000,
      "disponible": true
    }
  ],
  "total": 12,
  "restaurante": "El Corral del Príncipe"
}
```

---

## 📊 MATRIZ DE PERMISOS

| Endpoint | Público | Usuario | Admin |
|----------|---------|---------|-------|
| GET /regiones | ✅ | ✅ | ✅ |
| POST /regiones | ❌ | ❌ | ✅ |
| PATCH /regiones | ❌ | ❌ | ✅ |
| DELETE /regiones | ❌ | ❌ | ✅ |
| GET /platos | ✅ | ✅ | ✅ |
| POST /platos | ❌ | ❌ | ✅ |
| PATCH /platos | ❌ | ❌ | ✅ |
| DELETE /platos | ❌ | ❌ | ✅ |
| GET /restaurantes | ✅ | ✅ | ✅ |
| POST /restaurantes | ❌ | ❌ | ✅ |
| PATCH /restaurantes | ❌ | ❌ | ✅ |
| DELETE /restaurantes | ❌ | ❌ | ✅ |
| GET /auth/perfil | ❌ | ✅ | ✅ |

➡️ [Volver al índice](https://github.com/mmanosaslva/SaboreaColombia2/tree/main)