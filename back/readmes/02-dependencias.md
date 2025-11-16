### 1. TypeORM y Base de Datos

````npm install typeorm pg class-validator class-transformer ````

* typeorm: ORM (Object-Relational Mapping) para trabajar con BD como objetos
pg: Driver de PostgreSQL para conectarse a la BD
* class-validator: Valida datos en DTOs (ej: email válido, min/max caracteres)
* class-transformer: Transforma datos JSON en objetos de clase

### 2. Autenticación y Seguridad
````npm install @nestjs/typeorm @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt````
* @nestjs/typeorm: Integración de TypeORM con NestJS
* @nestjs/jwt: Módulo JWT de NestJS para generar tokens
* @nestjs/passport: Integración de Passport en NestJS
* passport: Librería de autenticación flexible
* passport-jwt: Estrategia de Passport para validar JWT tokens
* bcrypt: Encripta contraseñas de forma segura

### 3. Configuración
````npm install @nestjs/config dotenv````
* @nestjs/config: Maneja variables de entorno en NestJS
* dotenv: Lee el archivo .env con las variables secretas

### 4. Tipos TypeScript
````npm install -D @types/bcrypt @types/node````
* @types/bcrypt: Tipos TypeScript para bcrypt
* @types/node: Tipos TypeScript para Node.js

### 5. Documentación API
````npm install @nestjs/swagger swagger-ui-express````
* @nestjs/swagger: Integra Swagger en NestJS
* * **swagger-ui-express:** Interfaz visual en http://localhost:3000/api
