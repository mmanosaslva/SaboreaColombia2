estructura

# 🗄️ ESTRUCTURA DE BASE DE DATOS - SABOREA COLOMBIA
## Directorio Gastronómico de Colombia

---

## 📋 TABLA DE CONTENIDOS
1. [Diagrama Entidad-Relación](#diagrama-entidad-relación)
2. [Especificación de Entidades](#especificación-de-entidades)
3. [Entidades TypeORM](#entidades-typeorm)
4. [Relaciones Implementadas](#relaciones-implementadas)
5. [Validaciones y DTOs](#validaciones-y-dtos)

---

## 🎨 DIAGRAMA ENTIDAD-RELACIÓN



---

## 📊 ESPECIFICACIÓN DE ENTIDADES

### 1️⃣ ENTIDAD: USUARIO

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
- 1:N con REGIÓN (crear/editar)
- 1:N con CIUDAD (crear/editar)
- 1:N con PLATO (crear/editar)
- 1:N con RESTAURANTE (crear/editar)

---

### 2️⃣ ENTIDAD: REGIÓN

**Descripción:** Regiones culturales y gastronómicas de Colombia (Caribe, Andina, Pacífica, Orinoquía, Amazonia).

| Campo | Tipo | Restricciones | Descripción |
|-------|------|-----------------|-------------|
| `id` | UUID | PK, NOT NULL | Identificador único |
| `nombre` | VARCHAR(100) | UNIQUE, NOT NULL | Nombre región |
| `descripcion` | TEXT | NOT NULL | Descripción cultural y gastronómica |
| `imagenUrl` | VARCHAR(500) | Nullable | URL imagen representativa |
| `createdAt` | TIMESTAMP | NOT NULL | Fecha de creación |
| `updatedAt` | TIMESTAMP | NOT NULL | Fecha de actualización |

**Relaciones:**
- 1:N con CIUDAD (región contiene ciudades)
- 1:N con PLATO (región contiene platos)

**Ejemplos:**
- Caribe
- Andina
- Pacífica
- Orinoquía
- Amazonia

---

### 3️⃣ ENTIDAD: CIUDAD

**Descripción:** Ciudades principales de cada región con restaurantes.

| Campo | Tipo | Restricciones | Descripción |
|-------|------|-----------------|-------------|
| `id` | UUID | PK, NOT NULL | Identificador único |
| `nombre` | VARCHAR(100) | NOT NULL | Nombre de la ciudad |
| `regionId` | UUID | FK, NOT NULL | Referencia a REGIÓN |
| `descripcion` | TEXT | Nullable | Descripción turística |
| `createdAt` | TIMESTAMP | NOT NULL | Fecha de creación |
| `updatedAt` | TIMESTAMP | NOT NULL | Fecha de actualización |

**Relaciones:**
- N:1 con REGIÓN (muchas ciudades en una región)
- 1:N con RESTAURANTE (ciudad contiene restaurantes)

**Ejemplos por Región:**
- Caribe: Cartagena, Santa Marta
- Andina: Bogotá, Medellín
- Pacífica: Cali, Buenaventura
- Orinoquía: Villavicencio, Puerto López
- Amazonia: Leticia, Puerto Nariño

---

### 4️⃣ ENTIDAD: PLATO TÍPICO

**Descripción:** Platos tradicionales de cada región colombiana.

| Campo | Tipo | Restricciones | Descripción |
|-------|------|-----------------|-------------|
| `id` | UUID | PK, NOT NULL | Identificador único |
| `nombre` | VARCHAR(150) | NOT NULL | Nombre del plato |
| `descripcion` | TEXT | NOT NULL | Descripción breve del plato |
| `historia` | TEXT | NOT NULL | Historia y origen cultural del plato |
| `ingredientes` | TEXT | NOT NULL | Lista de ingredientes principales |
| `imagenUrl` | VARCHAR(500) | Nullable | URL imagen del plato |
| `regionId` | UUID | FK, NOT NULL | Referencia a REGIÓN |
| `createdAt` | TIMESTAMP | NOT NULL | Fecha de creación |
| `updatedAt` | TIMESTAMP | NOT NULL | Fecha de actualización |

**Relaciones:**
- N:1 con REGIÓN (muchos platos en una región)
- N:M con RESTAURANTE (vía PLATO_RESTAURANTE)

**Ejemplo Completo - Bandeja Paisa:**
```
nombre: "Bandeja Paisa"
descripcion: "Plato contundente y variado típico de Antioquia"
historia: "Surge de la mezcla entre tradición española e ingredientes 
          locales. Era comida de arrieros antes de viajes por montañas."
ingredientes: "Frijoles, arroz, carne molida, huevo frito, arepa, 
              aguacate, tomate, patacón, queso fresco, chorizo, morcilla"
imagenUrl: "https://..."
regionId: <ID_ANDINA>
```

---

### 5️⃣ ENTIDAD: RESTAURANTE

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

---

### 6️⃣ ENTIDAD: PLATO_RESTAURANTE (Many-to-Many)

**Descripción:** Tabla de cruce que relaciona platos con restaurantes.

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
