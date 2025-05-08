# Escuela de Conducción - Backend

Este es el backend de la plataforma para gestión de una escuela de conducción. Está desarrollado con NestJS, TypeORM y SQL Server para proporcionar las funcionalidades necesarias para el funcionamiento del sistema.

## 👨‍💻 Tecnologías
- NestJS
- TypeORM
- SQL Server (mssql)
- TypeScript

## Instalación y uso
### 1. Clona el repositorio:
``` bash
git clone https://github.com/JonathanNavarroV/escuela-conduccion-backend.git
cd escuela-conduccion-frontend
```
### 2. Instala las dependencias:
``` bash
npm install
```
### 3. Configura la base de datos:
Asegúrate de tener SQL Server corriendo y crea la base de datos correspondiente. Luego, configura los detalles de conexión en el archivo `src/app.module.ts` o en tu archivo de configuración de TypeORM.
### 4. Levanta el proyecto:
``` bash
npm run start
```
### 5. Accede a la API:
Una vez que el servidor esté corriendo, puedes acceder a la API en `http://localhost:3000`. Puedes usar herramientas como Postman para probar los endpoints.

> Nota: Asegúrate de que la base de datos esté correctamente configurada para evitar errores de conexión.

# 📌 Estado actual
En desarrollo. Las funcionalidades como gestión de profesores, horarios y alumnos se encuentran en proceso de implementación.

# 🛠️ Endpoints
Para ver los endpoints disponibles, accede a la [documentación Swagger](http://localhost:3000/api) una vez que el backend esté en ejecución.
