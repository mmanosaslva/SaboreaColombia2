# 📋 CASOS DE USO

## Caso de Uso 1: Registrarse

**Actor:** Público
**Precondición:** Usuario no autenticado

**Flujo:**
1. Usuario accede POST /auth/register
2. Ingresa: nombre, email, contraseña
3. Sistema valida datos (email único, contraseña mínimo 8 caracteres)
4. Sistema hashea contraseña con bcrypt
5. Usuario se crea con rol 'usuario'
6. Sistema retorna JWT token

**Resultado:** Usuario registrado y autenticado ✅

---

## Caso de Uso 2: Iniciar Sesión

**Actor:** Usuario registrado
**Precondición:** Usuario existe en BD

**Flujo:**
1. Usuario accede POST /auth/login
2. Ingresa: email, contraseña
3. Sistema busca usuario por email
4. Sistema valida contraseña con bcrypt
5. Sistema genera JWT token
6. Token se envía al cliente

**Resultado:** Usuario autenticado con acceso a rutas protegidas ✅

---

## Caso de Uso 3: Explorar Regiones

**Actor:** Público
**Precondición:** BD tiene regiones cargadas

**Flujo:**
1. Usuario accede GET /regiones
2. Sistema retorna lista de todas las regiones
3. Usuario puede ver nombre, descripción e imagen de cada region
4. Usuario selecciona una region
5. Usuario accede GET /regiones/:id

**Resultado:** Usuario explora regiones gastronómicas ✅

---

## Caso de Uso 4: Ver Platos por REGION

**Actor:** Público
**Precondición:** REGION existe

**Flujo:**
1. Usuario está en una region
2. Accede GET /regiones/:regionId/platos
3. Sistema retorna todos los platos típicos de esa region
4. Usuario selecciona un plato
5. Accede GET /platos/:id
6. Ve: nombre, descripción, historia, ingredientes, imagen

**Resultado:** Usuario visualiza platos típicos culturales ✅

---

## Caso de Uso 5: Ver Ciudades por REGION

**Actor:** Público
**Precondición:** REGION existe

**Flujo:**
1. Usuario está en una region
2. Accede GET /regiones/:regionId/ciudades
3. Sistema retorna ciudades de esa region
4. Usuario selecciona una ciudad
5. Accede GET /ciudades/:id

**Resultado:** Usuario conoce ciudades principales ✅

---

## Caso de Uso 6: Encontrar Restaurantes

**Actor:** Público
**Precondición:** Ciudad existe

**Flujo:**
1. Usuario selecciona ciudad
2. Accede GET /ciudades/:ciudadId/restaurantes
3. Sistema retorna restaurantes de esa ciudad
4. Usuario selecciona restaurante
5. Accede GET /restaurantes/:id
6. Ve: nombre, dirección, teléfono, horario, imagen

**Resultado:** Usuario encuentra lugar donde comer ✅

---

## Caso de Uso 7: Ver Menú del Restaurante

**Actor:** Público
**Precondición:** Restaurante existe

**Flujo:**
1. Usuario está en restaurante
2. Accede GET /restaurantes/:id/platos
3. Sistema retorna lista de platos disponibles
4. Cada plato muestra precio específico en ese restaurante
5. Usuario ve disponibilidad (disponible/no disponible)

**Resultado:** Usuario conoce menú y precios ✅

---

## Caso de Uso 8: Buscar Platos

**Actor:** Público
**Precondición:** BD tiene platos

**Flujo:**
1. Usuario accede GET /platos/buscar/arepa
2. Sistema busca platos que coincidan
3. Sistema retorna resultados: nombre, region, descripción

**Resultado:** Usuario encuentra platos rápidamente ✅

---

## Caso de Uso 9: Buscar Restaurantes

**Actor:** Público
**Precondición:** BD tiene restaurantes

**Flujo:**
1. Usuario accede GET /restaurantes/buscar/cartagena
2. Sistema busca restaurantes por nombre o ciudad
3. Sistema retorna resultados

**Resultado:** Usuario encuentra restaurantes específicos ✅

---

## Caso de Uso 10: Crear REGION (Admin)

**Actor:** Administrador autenticado
**Precondición:** Usuario tiene rol 'administrador'

**Flujo:**
1. Admin accede POST /regiones
2. Envía: nombre, descripción, imagenUrl
3. Sistema valida datos
4. Sistema crea region en BD
5. Sistema retorna region creada

**Resultado:** Nueva region disponible ✅

---

## Caso de Uso 11: Crear Ciudad (Admin)

**Actor:** Administrador
**Precondición:** REGION existe

**Flujo:**
1. Admin accede POST /ciudades
2. Envía: nombre, regionId, descripcion
3. Sistema valida datos
4. Sistema crea ciudad asociada a region
5. Sistema retorna ciudad creada

**Resultado:** Nueva ciudad en region ✅

---

## Caso de Uso 12: Crear Plato (Admin)

**Actor:** Administrador
**Precondición:** REGION existe

**Flujo:**
1. Admin accede POST /platos
2. Envía: nombre, descripcion, historia, ingredientes, regionId, imagenUrl
3. Sistema valida datos
4. Sistema crea plato asociado a region
5. Sistema retorna plato creado

**Resultado:** Nuevo plato en catálogo ✅

---

## Caso de Uso 13: Crear Restaurante (Admin)

**Actor:** Administrador
**Precondición:** Ciudad existe

**Flujo:**
1. Admin accede POST /restaurantes
2. Envía: nombre, descripcion, direccion, telefono, ciudadId, horario, imagenUrl
3. Sistema valida datos
4. Sistema crea restaurante asociado a ciudad
5. Sistema retorna restaurante creado

**Resultado:** Nuevo restaurante en ciudad ✅

---

## Caso de Uso 14: Asignar Plato a Restaurante (Admin)

**Actor:** Administrador
**Precondición:** Plato y Restaurante existen

**Flujo:**
1. Admin accede POST /plato-restaurante
2. Envía: platoId, restauranteId, precio, disponible
3. Sistema valida que no exista duplicado (UNIQUE)
4. Sistema crea relación con precio
5. Sistema retorna confirmación

**Resultado:** Plato disponible en restaurante con precio ✅

---

## Caso de Uso 15: Actualizar Información (Admin)

**Actor:** Administrador
**Precondición:** Recurso existe

**Flujo:**
1. Admin accede PATCH /regiones/:id (o ciudad, plato, restaurante)
2. Envía datos a actualizar
3. Sistema valida datos
4. Sistema actualiza en BD
5. Sistema retorna recurso actualizado

**Resultado:** Información refrescada ✅

---

## Caso de Uso 16: Eliminar Recurso (Admin)

**Actor:** Administrador
**Precondición:** Recurso existe

**Flujo:**
1. Admin accede DELETE /regiones/:id
2. Sistema valida existencia
3. Sistema elimina y aplica CASCADE
4. Sistema retorna confirmación

**Resultado:** Recurso eliminado del sistema ✅

---

## Resumen de Casos de Uso

- **Total:** 16 casos de uso
- **Públicos:** 9 (exploración, búsqueda)
- **Admin:** 7 (crear, actualizar, eliminar)

➡️ [Volver al índice](https://github.com/mmanosaslva/SaboreaColombia2/tree/main/back#readme)