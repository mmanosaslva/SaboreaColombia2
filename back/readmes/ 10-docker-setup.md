# 🐳 DOCKER SETUP - SABOREA COLOMBIA

## ¿Qué es Docker?

Docker es un **contenedor** que empacar la base de datos (PostgreSQL) con todas sus dependencias.

**Ventajas:**
- ✅ No necesitas instalar PostgreSQL en tu PC
- ✅ Todos usan la misma versión
- ✅ Evita errores de compatibilidad
- ✅ Fácil de levantar y bajar

---

## 📋 REQUISITOS

- Docker instalado: https://www.docker.com/products/docker-desktop
- Docker Desktop corriendo (en Windows/Mac)

**Verificar instalación:**
```bash
docker --version
docker-compose --version
```

Ambos deben mostrar versiones.

---

## 🚀 PASOS PARA USAR DOCKER

### 1. Ir a la carpeta back

```bash
cd ~/mujeres_digitales/saboreaColombia/back
```

### 2. Levantar los contenedores

```bash
docker-compose up -d
```

**¿Qué significa `-d`?**
- `-d` = "detached" (correr en segundo plano)

**Espera 10-15 segundos** para que PostgreSQL se inicialice.

### 3. Verificar que está corriendo

```bash
docker-compose ps
```

Debería mostrarte:
```
NAME                COMMAND             STATUS
saborea_postgres    postgres            Up 2 minutes
```

### 4. Revisar logs (si hay problemas)

```bash
docker-compose logs postgres
```

### 5. Conectar desde la APP

Tu `.env` debe tener:
```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_DATABASE=saborea_colombia_db
```

### 6. Iniciar la app

```bash
npm run start:dev
```

Deberías ver en la consola:
```
[Nest] 12345   - 11/15/2025 LOG [TypeOrmModule] Database connected successfully
```

---

## 🛑 DETENER DOCKER

```bash
# Parar los contenedores
docker-compose down

# Parar sin eliminar datos
docker-compose stop

# Reanudar
docker-compose start
```

---

## 🔄 COMANDOS ÚTILES

### Ver contenedores corriendo
```bash
docker ps
```

### Ver todos los contenedores (incluidos parados)
```bash
docker ps -a
```

### Conectar directamente a PostgreSQL
```bash
docker-compose exec postgres psql -U postgres -d saborea_colombia_db
```

Luego puedes hacer queries SQL:
```sql
\dt              -- Ver todas las tablas
SELECT * FROM usuario;
\q              -- Salir
```

### Limpiar todo (⚠️ ELIMINA DATOS)
```bash
docker-compose down -v
```

`-v` elimina volúmenes (datos guardados)

---

## 🐛 TROUBLESHOOTING

### Error: "Port 5432 is already in use"

PostgreSQL ya está corriendo en tu PC.

**Soluciones:**
1. Detén PostgreSQL local:
   ```bash
   # Mac
   brew services stop postgresql
   
   # Linux
   sudo systemctl stop postgresql
   
   # Windows: Detén desde Servicios
   ```

2. O cambia el puerto en docker-compose.yml:
   ```yaml
   ports:
     - "5433:5432"  # Usa puerto 5433 en lugar de 5432
   ```
   Y en .env:
   ```
   DB_PORT=5433
   ```

---

### Error: "saborea_postgres: Cannot start service postgres"

Docker no está corriendo.

**Solución:** Abre Docker Desktop y espera a que esté listo.

---

### Error: "connection refused"

PostgreSQL no está listo.

**Solución:** Espera 10-15 segundos y reintenta.

---

### Ver logs detallados

```bash
docker-compose logs -f postgres
```

`-f` = seguir logs en tiempo real (Ctrl+C para salir)

---

## 📊 ESTADOS DE DOCKER

### ✅ Todo bien
```bash
$ docker-compose ps

NAME           STATUS
saborea_postgres   Up 2 minutes (healthy)
```

### ❌ Problema
```bash
$ docker-compose ps

NAME           STATUS
saborea_postgres   Up 1 minute (unhealthy)
```

Si es unhealthy, revisa logs:
```bash
docker-compose logs postgres
```

---

## 💾 DATOS PERSISTENTES

Los datos se guardan en:
```
postgres_data/
```

Cuando hagas `docker-compose down`, los datos se preservan.

Si quieres eliminar TODO:
```bash
docker-compose down -v
```

---

## 🔄 WORKFLOW TÍPICO DEL EQUIPO

**Al empezar el día:**
```bash
cd ~/mujeres_digitales/saboreaColombia/back
docker-compose up -d
npm run start:dev
```

**Trabajar normalmente**
```
[Desarrolla tu código]
[Las entidades se sincronizan automáticamente]
```

**Al terminar:**
```bash
docker-compose down
```

---

## 📝 NOTAS IMPORTANTES

⚠️ **NO subas a Git:**
- `postgres_data/` (está en .gitignore)
- `.env` con credenciales

✅ **SÍ subas a Git:**
- `docker-compose.yml`
- `.env.example`

---

## ✅ CHECKLIST

- [ ] Docker Desktop instalado y corriendo
- [ ] `docker-compose up -d` ejecutado
- [ ] `docker-compose ps` muestra saborea_postgres
- [ ] `.env` configurado correctamente
- [ ] `npm run start:dev` conecta a BD
- [ ] Logs muestran: "Database connected successfully"

---

## 🆘 NECESITAS AYUDA?

Si tienes problemas:
1. Verifica: `docker-compose ps`
2. Lee logs: `docker-compose logs postgres`
3. Consulta el Troubleshooting arriba
4. Pregunta al equipo en Slack

➡️ [Volver al índice](../README.md)