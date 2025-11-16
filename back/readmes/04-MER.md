# 🗄️ DIAGRAMA ENTIDAD-RELACIÓN (MER)

## 📊 Imagen del MER

![MER - Saborea Colombia](../img/MER.png)

---

## 📋 ESPECIFICACIÓN DETALLADA DE ENTIDADES

### 1️⃣ ENTIDAD: USUARIO

```typescript

**Descripción:** Gestiona usuarios del sistema con roles diferenciados (usuario, administrador).

| Campo | Tipo | Restricciones | Descripción |
|-------|------|-----------------|-------------|
| `id` | UUID | PK, NOT NULL | Identificador único |
| `nombre` | VARCHAR(255) | NOT NULL | Nombre completo del usuario |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL | Email único para login |
| `contraseña` | VARCHAR(255) | NOT NULL | Contraseña hasheada con bcrypt |
| `rol` | ENUM | DEFAULT 'usuario' | 'usuario' \| 'administrador' |
| `activo` | BOOLEAN | DEFAULT true | Estado de la cuenta |
| `createdAt` | TIMESTAMP | NOT NULL | Fecha de creación |
| `updatedAt` | TIMESTAMP | NOT NULL | Fecha de última actualización |

**Relaciones:**
- 1:N con REGION (crear/editar)
- 1:N con CIUDAD (crear/editar)
- 1:N con PLATO (crear/editar)
- 1:N con RESTAURANTE (crear/editar)

````

### 2️⃣ ENTIDAD: REGION

```typescript

**Descripción:** Regiones culturales y gastronómicas de Colombia (Caribe, Andina, Pacífica, Orinoquía, Amazonia).

| Campo | Tipo | Restricciones | Descripción |
|-------|------|-----------------|-------------|
| `id` | UUID | PK, NOT NULL | Identificador único |
| `nombre` | VARCHAR(100) | UNIQUE, NOT NULL | Nombre region |
| `descripcion` | TEXT | NOT NULL | Descripción cultural y gastronómica |
| `imagenUrl` | VARCHAR(500) | Nullable | URL imagen representativa |
| `createdAt` | TIMESTAMP | NOT NULL | Fecha de creación |
| `updatedAt` | TIMESTAMP | NOT NULL | Fecha de actualización |

**Relaciones:**
- 1:N con CIUDAD (region contiene ciudades)
- 1:N con PLATO (region contiene platos)

````

### 3️⃣ ENTIDAD: CIUDAD

```typescript

**Descripción:** Ciudades principales de cada region con restaurantes.

| Campo | Tipo | Restricciones | Descripción |
|-------|------|-----------------|-------------|
| `id` | UUID | PK, NOT NULL | Identificador único |
| `nombre` | VARCHAR(100) | NOT NULL | Nombre de la ciudad |
| `regionId` | UUID | FK, NOT NULL | Referencia a REGION |
| `descripcion` | TEXT | Nullable | Descripción turística |
| `createdAt` | TIMESTAMP | NOT NULL | Fecha de creación |
| `updatedAt` | TIMESTAMP | NOT NULL | Fecha de actualización |

**Relaciones:**
- N:1 con REGION (muchas ciudades en una region)
- 1:N con RESTAURANTE (ciudad contiene restaurantes)

````

### 4️⃣ ENTIDAD: PLATO TÍPICO

```typescript

**Descripción:** Platos tradicionales de cada region colombiana.

| Campo | Tipo | Restricciones | Descripción |
|-------|------|-----------------|-------------|
| `id` | UUID | PK, NOT NULL | Identificador único |
| `nombre` | VARCHAR(150) | NOT NULL | Nombre del plato |
| `descripcion` | TEXT | NOT NULL | Descripción breve del plato |
| `historia` | TEXT | NOT NULL | Historia y origen cultural del plato |
| `ingredientes` | TEXT | NOT NULL | Lista de ingredientes principales |
| `imagenUrl` | VARCHAR(500) | Nullable | URL imagen del plato |
| `regionId` | UUID | FK, NOT NULL | Referencia a REGION |
| `createdAt` | TIMESTAMP | NOT NULL | Fecha de creación |
| `updatedAt` | TIMESTAMP | NOT NULL | Fecha de actualización |

**Relaciones:**
- N:1 con REGION (muchos platos en una region)
- N:M con RESTAURANTE (vía PLATO_RESTAURANTE)

```

### 5️⃣ ENTIDAD: RESTAURANTE

```typescript

**Descripción:** Establecimientos gastronómicos donde se sirven platos típicos.

| Campo | Tipo | Restricciones | Descripción |
|-------|------|-----------------|-------------|
| `id` | UUID | PK, NOT NULL | Identificador único |
| `nombre` | VARCHAR(150) | NOT NULL | Nombre del restaurante |
| `descripcion` | TEXT | NOT NULL | Descripción del lugar |
| `direccion` | VARCHAR(255) | NOT NULL | Dirección física |
| `telefono` | VARCHAR(20) | NOT NULL | Teléfono de contacto |
| `ciudadId` | UUID | FK, NOT NULL | Referencia a CIUDAD |
| `imagenUrl` | VARCHAR(500) | Nullable | URL imagen del restaurante |
| `horario` | VARCHAR(100) | NOT NULL | Horario de atención |
| `createdAt` | TIMESTAMP | NOT NULL | Fecha de creación |
| `updatedAt` | TIMESTAMP | NOT NULL | Fecha de actualización |

**Relaciones:**
- N:1 con CIUDAD (muchos restaurantes en una ciudad)
- N:M con PLATO (vía PLATO_RESTAURANTE)

````

### 6️⃣ ENTIDAD: PLATO_RESTAURANTE (Many-to-Many)

```typescript

**Descripción:** Tabla de cruce que relaciona platos con restaurantes, incluyendo precio y disponibilidad.

| Campo | Tipo | Restricciones | Descripción |
|-------|------|-----------------|-------------|
| `id` | UUID | PK, NOT NULL | Identificador único |
| `platoId` | UUID | FK, NOT NULL | Referencia a PLATO |
| `restauranteId` | UUID | FK, NOT NULL | Referencia a RESTAURANTE |
| `precio` | DECIMAL(10,2) | NOT NULL | Precio del plato en restaurante |
| `disponible` | BOOLEAN | DEFAULT true | Disponibilidad actual |
| `createdAt` | TIMESTAMP | NOT NULL | Fecha de creación |
| `updatedAt` | TIMESTAMP | NOT NULL | Fecha de actualización |

**Restricciones:**
- UNIQUE(`platoId`, `restauranteId`)

````

## RELACIONES GRÁFICAMENTE

```typescript

USUARIO (1) ──────→ (N) REGION
USUARIO (1) ──────→ (N) CIUDAD
USUARIO (1) ──────→ (N) PLATO
USUARIO (1) ──────→ (N) RESTAURANTE

REGION (1) ────────→ (N) CIUDAD
REGION (1) ────────→ (N) PLATO

CIUDAD (1) ────────→ (N) RESTAURANTE

PLATO (N) ←──Many-to-Many──→ (N) RESTAURANTE
           (vía PLATO_RESTAURANTE)

````



## LEYENDA  -Diccionario de términos

| Símbolo | Significado |
|---------|------------|
| **PK** | Primary Key (Clave Primaria) |
| **FK** | Foreign Key (Clave Foránea) |
| **UK** | Unique Key (Clave Única) |
| **1:N** | Uno a Muchos |
| **N:M** | Muchos a Muchos |
| **ON DELETE CASCADE** | Elimina registros relacionados |

---

## ✅ CARACTERÍSTICAS DE DISEÑO

**Normalización:** Todas las entidades cumplen 1FN, 2FN y 3FN

**Integridad Referencial:** Claves foráneas con CASCADE

**Auditoría:** createdAt y updatedAt en todas las entidades

**Seguridad:** Contraseñas hasheadas, emails únicos

---

➡️ [Volver al índice](../readmes/01-estructura-proyecto.md)