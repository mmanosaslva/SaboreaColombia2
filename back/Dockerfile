# ============================================
# Dockerfile - Saborea Colombia API (Desarrollo)
# ============================================

FROM node:18-alpine

WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Instalar dependencias
RUN npm ci

# Copiar código fuente (el volumen montará los cambios)
COPY src/ ./src/

# Exponer puerto
EXPOSE 3000

# Comando para desarrollo con hot-reload
CMD ["npm", "run", "start:dev"]