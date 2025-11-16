# 🐳 DOCKER SETUP - SABOREA COLOMBIA

## 📚 Índice
1. [¿Qué es Docker?](#qué-es-docker)
2. [¿Por qué Docker?](#por-qué-docker)
3. [Conceptos clave](#conceptos-clave)
4. [Requisitos](#requisitos)
5. [Pasos para usar Docker](#pasos-para-usar-docker)
6. [Flujo visual](#flujo-visual)
7. [Comandos útiles](#comandos-útiles)
8. [Troubleshooting](#troubleshooting)
9. [Checklist](#checklist)

---

## 🤔 ¿Qué es Docker?

### Analogía simple

Imagina que necesitas compartir una **receta de comida** con tu equipo, pero es muy compleja:

❌ **Sin Docker:**
- "Necesitas comprar estos ingredientes específicos"
- "La licuadora debe ser de esta marca"
- "El horno debe estar a 180°C"
- "Tu versión de macOS podría no funcionar"
- "El que tiene Windows tendrá diferentes pasos"
- **Total: Cada uno lo hace diferente** ❌

✅ **Con Docker:**
- "Aquí está la receta completa en una caja"
- Todo lo necesario dentro: ingredientes, herramientas, instrucciones
- **Funciona igual en cualquier máquina** ✅

### En desarrollo

**Sin Docker:**
```
Tu PC         Laptop de Juan      Laptop de María       Servidor producción
┌─────────┐   ┌─────────┐         ┌─────────┐           ┌─────────┐
│ PostgreSQL  │ PostgreSQL      │ PostgreSQL          │ PostgreSQL
│ v13        │ v15             │ v14                 │ v16
└─────────┘   └─────────┘       └─────────┘           └─────────┘
❌ Funciona diferente en cada lugar
```

**Con Docker:**
```
Tu PC         Laptop de Juan      Laptop de María       Servidor producción
┌─────────┐   ┌─────────┐         ┌─────────┐           ┌─────────┐
│ 📦 Docker  │ 📦 Docker         │ 📦 Docker           │ 📦 Docker
│ PostgreSQL │ PostgreSQL        │ PostgreSQL          │ PostgreSQL
│ v15       │ v15               │ v15                 │ v15
└─────────┘   └─────────┘       └─────────┘           └─────────┘
✅ Funciona igual en todos lados
```

---

## ✅ ¿Por qué Docker?

### Ventajas

| Ventaja | Explicación |
|---------|-------------|
| **No instalar PostgreSQL** | La caja (contenedor) lo incluye todo |
| **Versión consistente** | Todos usan PostgreSQL 15-alpine |
| **Evita "en mi PC funciona"** | Todos usamos el mismo entorno |
| **Fácil de levantar y bajar** | `docker-compose up -d` y `docker-compose down` |
| **No ensucia tu PC** | PostgreSQL está aislado en la caja |
| **Fácil de limpiar** | Si algo falla, eliminas la caja y crease una nueva |
| **Compartible con el equipo** | Un archivo (docker-compose.yml) y listo |

### Desventajas (mínimas)

- Usa más recursos que instalar localmente
- Pequeña curva de aprendizaje

---

## 🔧 Conceptos clave

### Imagen Docker
Es como una **plantilla** o **clase** en programación.

```
Imagen = Plano de construcción
```

```bash
# Ejemplo: descargar imagen de PostgreSQL 15-alpine
FROM postgres:15-alpine

# Imagen = la definición de qué debe ir en la caja
```

### Contenedor Docker
Es una **instancia en ejecución** de la imagen (como crear un objeto de una clase).

```
Contenedor = Caja funcionando en tu PC
```

```bash
# Crear y ejecutar un contenedor desde la imagen
docker run postgres:15-alpine

# Ahora tienes una caja con PostgreSQL corriendo
```

### Volumen Docker
Es un **almacenamiento persistente** fuera del contenedor.

```
Sin volumen:          Con volumen:
┌─────────────┐      ┌─────────────┐      ┌──────────────┐
│ Contenedor  │      │ Contenedor  │ ←→  │ Datos en tu  │
│ PostgreSQL  │      │ PostgreSQL  │      │ PC (persiste)│
│ (temporal)  │      │             │      └──────────────┘
└─────────────┘      └─────────────┘

Paras el           Paras el contenedor
contenedor         pero los datos siguen
→ datos perdidos   en tu PC ✅
```

### Red Docker (Network)
Es como un **cable Ethernet** que conecta contenedores.

```
Sin red:              Con red (saborea_network):
postgres ×→×← api    postgres ←→ api
❌ No se comunican    ✅ Se comunican

API dice: "conecta a localhost"
❌ No funciona (no hay servicio ahí)

API dice: "conecta a postgres" (nombre en la red)
✅ Funciona (encuentra el contenedor)
```

---

## 📋 REQUISITOS

### Instalación

- **Docker Desktop**: https://www.docker.com/products/docker-desktop
- **Docker Compose**: Incluido en Docker Desktop

### Verificar instalación

```bash
docker --version
# Debería mostrar: Docker version 20.x.x o superior

docker-compose --version
# Debería mostrar: Docker Compose version 2.x.x o superior
```

### Si algo no funciona

- **Mac/Windows**: Abre "Docker Desktop" desde Aplicaciones
- **Linux**: 
  ```bash
  sudo systemctl start docker
  sudo systemctl start docker.service
  ```

---

## 🚀 PASOS PARA USAR DOCKER

### 1️⃣ Ir a la carpeta raíz del proyecto

```bash
cd ~/mujeres_digitales/saboreaColombia
```

**Importante:** NO es `back/`, es la raíz donde está `docker-compose.yml`

### 2️⃣ Levantar los contenedores

```bash
docker-compose up -d
```

**¿Qué significa `-d`?**
```
-d = "detached" (ejecutar en segundo plano)

SIN -d:                    CON -d:
┌──────────────────┐      ┌──────────────────┐
│ docker-compose up│      │ docker-compose   │
│ Terminal bloqueada│      │ up -d            │
│ Ves logs en vivo │      │ Terminal libre    │
│ Ctrl+C para parar│      │ Logs en background│
└──────────────────┘      └──────────────────┘
```

**Espera 10-15 segundos** para que PostgreSQL se inicialice completamente.

### 3️⃣ Verificar que está corriendo

```bash
docker-compose ps
```

**Salida esperada:**
```
NAME                 IMAGE                  COMMAND                  SERVICE
saborea_postgres     postgres:15-alpine     "docker-entrypoint.s…"   postgres
saborea_api          saboreacolombia-api    "node dist/main.js"      api

STATUS              PORTS
Up 2 minutes        0.0.0.0:5432->5432/tcp
Up 2 minutes        0.0.0.0:3000->3000/tcp
```

**¿Qué significa?**

| Columna | Significado |
|---------|------------|
| **NAME** | Nombre del contenedor |
| **IMAGE** | Qué imagen está usando |
| **COMMAND** | Comando que ejecuta |
| **STATUS** | "Up X minutes" = funcionando |
| **PORTS** | Puerto local → puerto contenedor |

### 4️⃣ Revisar logs (si hay problemas)

```bash
# Ver logs de PostgreSQL
docker-compose logs postgres

# Ver logs de la API
docker-compose logs api

# Ver todos los logs
docker-compose logs

# Ver logs en vivo (sigue nuevos logs)
docker-compose logs -f postgres
# Presiona Ctrl+C para salir
```

### 5️⃣ Conectar desde tu app

Tu `back/.env` debe tener:

```env
# Para Docker:
DB_HOST=postgres          # ⚠️ IMPORTANTE: nombre del servicio, NO localhost

# Para desarrollo local (sin Docker):
# DB_HOST=localhost

DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_DATABASE=saborea_colombia_db
DB_SYNCHRONIZE=true
DB_LOGGING=false
```

**¿Por qué `DB_HOST=postgres` en Docker?**

Docker crea un DNS interno donde el nombre del servicio en `docker-compose.yml` es la dirección:

```
docker-compose.yml:
  postgres: ← Este nombre se convierte en "postgres" en la red
    image: postgres:15-alpine

Dentro del contenedor API:
  DB_HOST=postgres ← Accede al contenedor PostgreSQL por su nombre
```

### 6️⃣ Iniciar la app

```bash
cd back
npm run start:dev
```

**Señal de éxito en la consola:**
```
[Nest] 12345   - 11/15/2025, 10:30:45 AM     LOG [TypeOrmModule] Database connected successfully ✅
```

---

## 📊 FLUJO VISUAL

### ¿Qué pasa cuando ejecutas `docker-compose up -d`?

```
┌────────────────────────────────────┐
│ Ejecutas: docker-compose up -d     │
└────────────────────────────────────┘
             ↓↓↓

┌────────────────────────────────────┐
│ Docker lee docker-compose.yml      │
└────────────────────────────────────┘
             ↓↓↓

┌────────────────────────────────────┐
│ 1. Crea red: saborea_network       │
│    (cable para conectar servicios)  │
└────────────────────────────────────┘
             ↓↓↓

┌────────────────────────────────────┐
│ 2. Crea volumen: postgres_data     │
│    (almacenamiento para datos)     │
└────────────────────────────────────┘
             ↓↓↓

┌────────────────────────────────────┐
│ 3. Inicia PostgreSQL               │
│    ✅ Descarga imagen postgres:15  │
│    ✅ Crea contenedor saborea_postgres
│    ✅ Conecta a saborea_network    │
│    ✅ Abre puerto 5432             │
│    ✅ Verifica healthcheck         │
└────────────────────────────────────┘
             ↓↓↓

         PostgreSQL ✅ listo
             ↓↓↓

┌────────────────────────────────────┐
│ 4. Inicia API (espera a PG)        │
│    ✅ Lee Dockerfile ./back        │
│    ✅ Compila imagen               │
│    ✅ Crea contenedor saborea_api  │
│    ✅ Conecta a saborea_network    │
│    ✅ Pasa variables del .env      │
│    ✅ DB_HOST=postgres funciona ✅ │
│    ✅ Abre puerto 3000             │
└────────────────────────────────────┘
             ↓↓↓

    ✅ Todo listo. Accede a:
    http://localhost:3000 (API)
    localhost:5432 (Base de datos)
```

---

## 🔄 COMANDOS ÚTILES

### Ver estado

```bash
# Ver contenedores corriendo
docker-compose ps

# Ver todos los contenedores (incluso parados)
docker ps -a

# Ver recursos usados (CPU, memoria)
docker stats
```

### Logs

```bash
# Ver logs de un servicio
docker-compose logs postgres
docker-compose logs api

# Ver todos los logs
docker-compose logs

# Ver logs en vivo
docker-compose logs -f api

# Seguir nuevos logs (Ctrl+C para salir)
docker-compose logs --follow

# Últimas 50 líneas
docker-compose logs --tail=50 postgres
```

### Ejecutar comandos en un contenedor

```bash
# Conectar a PostgreSQL interactivamente
docker-compose exec postgres psql -U postgres -d saborea_colombia_db

# Una vez conectado, prueba:
\dt                           # Ver todas las tablas
SELECT * FROM usuario;        # Ver usuarios
SELECT COUNT(*) FROM region;  # Contar regiones
\q                            # Salir

# Ejecutar el seed
docker-compose exec api npm run seed

# Ejecutar otro comando
docker-compose exec api npm run build
```

### Control

```bash
# Detener (pero mantiene contenedores)
docker-compose stop

# Reanudar después de detener
docker-compose start

# Detener y eliminar contenedores (mantiene datos)
docker-compose down

# Detener y borrar TAMBIÉN los datos
docker-compose down -v

# Rebuild de imágenes
docker-compose build --no-cache

# Rebuild y reiniciar
docker-compose up --build -d
```

### Información

```bash
# Ver tamaño de imágenes
docker images

# Ver inspeccionar un contenedor
docker inspect saborea_postgres

# Ver logs detallados
docker-compose logs --details
```

---

## 🛑 DETENER DOCKER

### Opción 1: Detener sin eliminar datos

```bash
docker-compose down
```

- ✅ Detiene contenedores
- ✅ Elimina contenedores
- ✅ **MANTIENE datos en volúmenes**
- ✅ Puedes hacer `docker-compose up -d` luego

### Opción 2: Parar temporalmente

```bash
docker-compose stop
```

- ✅ Pausa contenedores
- ✅ **NO elimina contenedores**
- ✅ `docker-compose start` reanuda

### Opción 3: Eliminar todo (⚠️ CUIDADO)

```bash
docker-compose down -v
```

- ✅ Detiene y elimina contenedores
- ❌ **ELIMINA todos los datos**
- ⚠️ Los datos en postgres_data se pierden

---

## 📊 ESTADOS DE DOCKER

### ✅ Todo funcionando

```bash
$ docker-compose ps

NAME                 STATUS
saborea_postgres     Up 5 minutes (healthy)
saborea_api          Up 5 minutes (healthy)
```

**Logs:**
```
postgres_1  | LOG: database system is ready to accept connections
api_1       | [Nest] 12345 LOG [TypeOrmModule] Database connected successfully
```

### ⚠️ Servicio unhealthy

```bash
$ docker-compose ps

NAME                 STATUS
saborea_postgres     Up 1 minute (unhealthy)
saborea_api          Up 1 minute (unhealthy)
```

**Solución:**
```bash
# Ver qué anda mal
docker-compose logs postgres
docker-compose logs api

# Reintentar
docker-compose restart

# Si persiste, rebuild
docker-compose down -v
docker-compose up -d
```

### ❌ Contenedor crasheado

```bash
$ docker-compose ps

NAME                 STATUS
saborea_postgres     Exited (1)
saborea_api          Exited (137)
```

**Solución:**
```bash
# Ver error
docker-compose logs --tail=50 saborea_postgres

# Reintentar
docker-compose up -d
```

---

## 💾 DATOS PERSISTENTES

### Dónde se guardan

```
saboreaColombia/
├── data/
│   ├── postgres/          ← Datos de PostgreSQL
│   └── logs/              ← Logs de la API
├── docker-compose.yml
└── back/
```

### Qué significa "persistente"

```
Escenario 1: SIN volumen
┌─────────────────────┐
│ Contenedor corriendo│
│ Datos en memoria    │
└─────────────────────┘
        ↓
Ejecutas: docker-compose down
        ↓
❌ TODOS los datos se pierden
```

```
Escenario 2: CON volumen
┌─────────────────────┐    ┌──────────────┐
│ Contenedor corriendo│ ←→ │ data/postgres│
│ Datos en BD         │    │ (en tu PC)   │
└─────────────────────┘    └──────────────┘
        ↓
Ejecutas: docker-compose down
        ↓
✅ Datos en data/postgres se mantienen
Ejecutas: docker-compose up -d
        ↓
✅ Los datos vuelven a estar disponibles
```

### Limpiar datos

```bash
# Ver qué volúmenes existen
docker volume ls

# Eliminar volumen específico
docker volume rm saboreacolombia_postgres_data

# O usar:
docker-compose down -v
```

---

## 🐛 TROUBLESHOOTING

### ❌ "Port 5432 is already in use"

PostgreSQL ya está corriendo en tu PC (no en Docker).

**Solución 1: Detener PostgreSQL local**

```bash
# macOS (Homebrew)
brew services stop postgresql

# Linux
sudo systemctl stop postgresql

# Windows
# Abre Servicios (Services) y detén PostgreSQL
```

**Solución 2: Usar puerto diferente**

Cambiar en `docker-compose.yml`:
```yaml
services:
  postgres:
    ports:
      - "5433:5432"  # Cambiar de 5432 a 5433
```

Cambiar en `back/.env`:
```env
DB_PORT=5433  # Cambiar a 5433
```

### ❌ "Cannot start service postgres"

Docker no está corriendo o no está instalado.

**Solución:**
```bash
# Verifica que Docker esté corriendo
docker --version

# Si no funciona, abre Docker Desktop
# (En Mac/Windows: busca "Docker Desktop" en Aplicaciones)

# En Linux:
sudo systemctl start docker
```

### ❌ "connection refused"

PostgreSQL existe pero no está listo.

**Solución:**
```bash
# Espera 10-15 segundos y reintenta
sleep 15
docker-compose exec postgres psql -U postgres

# O ver logs
docker-compose logs postgres
```

### ❌ "Table already exists"

Probablemente corriste el seed dos veces.

**Solución:**
```bash
# Ver tables
docker-compose exec postgres psql -U postgres -d saborea_colombia_db
\dt

# Si quieres limpiar todo
docker-compose down -v
docker-compose up -d
docker-compose exec api npm run seed
```

### ❌ API no conecta a PostgreSQL

`DB_HOST` está mal configurado.

**Solución:**
```bash
# En back/.env debe ser:
DB_HOST=postgres        # NO localhost (si usas Docker)

# Luego reinicia:
docker-compose restart api

# O rebuild:
docker-compose down
docker-compose up -d
```

### ❌ "Dockerfile not found"

Docker no encuentra el archivo.

**Solución:**
```bash
# Verifica que Dockerfile existe
ls -la back/Dockerfile

# Verifica el path en docker-compose.yml:
# context: ./back
# dockerfile: Dockerfile
```

### ✅ Ver logs detallados

```bash
# Logs completos de todo
docker-compose logs

# Logs de un servicio con más detalles
docker-compose logs --details postgres

# Logs últimas 100 líneas
docker-compose logs --tail=100

# Logs en vivo
docker-compose logs -f
```

---

## 🔄 WORKFLOW TÍPICO DEL EQUIPO

### 📅 Al empezar el día

```bash
# 1. Ir a la raíz del proyecto
cd ~/mujeres_digitales/saboreaColombia

# 2. Levantar Docker
docker-compose up -d

# 3. Esperar 10 segundos
sleep 10

# 4. Ir a back
cd back

# 5. Instalar dependencias (si es primera vez)
npm install

# 6. Iniciar dev
npm run start:dev
```

### 💻 Durante el trabajo

```
Trabajas normalmente en tu editor
↓
Cambias código TypeScript
↓
TypeORM sincroniza automáticamente con BD
↓
Ves cambios en tiempo real
```

### 🌙 Al terminar

```bash
# 1. Parar Docker
docker-compose down

# Datos se guardan automáticamente en data/postgres/
# Próximo día, docker-compose up -d y todo sigue igual
```

---

## 📝 NOTAS IMPORTANTES

### ❌ NO subas a Git

```
.gitignore debe incluir:

node_modules/              # Muy pesado
dist/                      # Se regenera
coverage/                  # Se regenera
.env                       # Credenciales
data/postgres/             # Datos de BD (pesado)
data/logs/                 # Logs
*.log
```

### ✅ SÍ subas a Git

```
docker-compose.yml         # Configuración compartida
back/Dockerfile            # Configuración compartida
back/.env.example          # Template sin credenciales
.gitignore
README.md
```

---

## ✅ CHECKLIST

Antes de decir "todo funciona":

- [ ] Docker Desktop instalado (`docker --version`)
- [ ] Docker Compose instalado (`docker-compose --version`)
- [ ] En raíz: `docker-compose up -d` sin errores
- [ ] `docker-compose ps` muestra 2 contenedores corriendo
- [ ] `docker-compose logs postgres` no muestra errores
- [ ] `back/.env` tiene `DB_HOST=postgres`
- [ ] `cd back && npm run start:dev` funciona
- [ ] Logs muestran: "Database connected successfully"
- [ ] Puedes hacer queries: `docker-compose exec postgres psql -U postgres`
- [ ] API responde: `curl http://localhost:3000/health`

---

## 🆘 NECESITAS AYUDA?

1. **Verifica estado:**
   ```bash
   docker-compose ps
   ```

2. **Lee logs:**
   ```bash
   docker-compose logs postgres
   docker-compose logs api
   ```

3. **Busca en esta guía** la sección Troubleshooting

4. **Pregunta al equipo** en Slack con screenshots de los logs

---

## 📚 Recursos

- [Documentación Docker oficial](https://docs.docker.com/)
- [Documentación Docker Compose](https://docs.docker.com/compose/)
- [PostgreSQL en Docker Hub](https://hub.docker.com/_/postgres)

---

➡️ [Volver al índice](../README.md)