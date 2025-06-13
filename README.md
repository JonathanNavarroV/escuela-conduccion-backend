# Escuela de Conducción - Backend 🚗📚

Este es el backend de la plataforma para gestión de una escuela de conducción. Está desarrollado con NestJS, TypeORM y SQL Server para proporcionar las funcionalidades necesarias para el funcionamiento del sistema.

## 👨‍💻 Tecnologías

- NestJS (con arquitectura modular)
- TypeORM
- SQL Server (mssql)
- TypeScript
- JWT + bcrypt para autenticación segura
- Class-validator / class-transformer para validaciones
- Swagger para documentación interactiva

---

## ✅ Funcionalidades implementadas

- Autenticación con JWT (login seguro)
- Gestión de usuarios (crear, editar, eliminar)
- Hash de contraseñas con `bcrypt`
- Roles de usuario (super administrador, administrador de sede)
- Asociación de usuarios a sedes
- Validaciones en DTOs usando `class-validator`
- Control de errores global con filtros personalizados
- Relación entre entidades (`users`, `roles`, `sedes`)
- Documentación interactiva con Swagger (`/api`)

---

## Instalación y uso

### 1. Clona el repositorio:

```bash
git clone https://github.com/JonathanNavarroV/escuela-conduccion-backend.git
cd escuela-conduccion-frontend
```

### 2. Instala las dependencias:

```bash
npm install
```

### 3. Configura la base de datos:

Crea un archivo `.env` en `env/` con las variables de conección necesarias:

```env
DB_HOST=localhost
DB_PORT=1433
DB_USERNAME=sa
DB_PASSWORD=tu_password
DB_DATABASE=escuela_conduccion
JWT_SECRET=una_clave_secreta_segura
```

Asegúrate de que SQL Server esté corriendo y que la base de datos exista.

### 4. Levanta el proyecto:

```bash
npm run start
```

### 5. Accede a la API:

- API base: http://localhost:3000
- Swagger (documentación): http://localhost:3000/api

> Nota: Asegúrate de que la base de datos esté correctamente configurada para evitar errores de conexión.

---

## 📌 Estado actual

Actualmente en desarrollo. Ya están implementadas funcionalidades clave como autenticación, usuarios, roles y sedes. Se continúa trabajando en módulos adicionales como clases, asistencia y evaluaciones.

---

## ✨ Autor

[Jonathan Navarro](https://github.com/JonathanNavarroV)
