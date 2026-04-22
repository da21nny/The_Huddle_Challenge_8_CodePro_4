# 📚 Learn It, Love It Inc. — Plataforma de Aprendizaje

Aplicación web full-stack desarrollada con **Node.js**, **Express** y **SQLite** que permite gestionar **temas de aprendizaje** y sus **enlaces de recursos** asociados. Diseñada para fomentar el aprendizaje colaborativo, la plataforma ofrece un sistema de votación que prioriza los contenidos más valorados por la comunidad.

El proyecto implementa una arquitectura **MVC (Modelo-Vista-Controlador)** con operaciones **CRUD completas** (Crear, Leer, Actualizar, Eliminar) tanto para temas como para enlaces, utilizando **Handlebars** como motor de plantillas para renderizado del lado del servidor y **AJAX** para las interacciones de votación sin recargar la página.

---

## 🎯 ¿Para qué sirve?

Esta plataforma está pensada para que usuarios puedan organizar y compartir recursos de aprendizaje de forma sencilla e intuitiva:

- **Crear temas de estudio** — Registra temas con título y descripción para organizar tu aprendizaje.
- **Agregar enlaces de recursos** — Asocia artículos, videos, documentación y cualquier recurso web a cada tema.
- **Votar por los mejores contenidos** — Sistema de votación en tiempo real (AJAX) que ordena automáticamente temas y enlaces por popularidad.
- **Editar y eliminar** — Modifica o elimina temas y enlaces en cualquier momento con formularios intuitivos.
- **Navegación intuitiva** — Interfaz clara con navegación entre la lista de temas, el detalle de cada tema y sus enlaces.


---

## 🏗️ Diseño y Arquitectura

La aplicación sigue el patrón **MVC (Model - View - Controller)** con las siguientes capas:

```
┌─────────────────────────────────────────────────┐
│                   Cliente (Browser)              │
│              HTML + CSS + JavaScript             │
└────────────────────┬────────────────────────────┘
                     │ HTTP Request
                     ▼
┌─────────────────────────────────────────────────┐
│               app.js (Express Server)            │
│          Middleware + Motor de plantillas         │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│                   Routes                         │
│      topicRoutes.js  │  linkRoutes.js            │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│                Controllers                       │
│   topicController.js │ linkController.js         │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│                  Models                          │
│     topicModel.js  │  linkModel.js               │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│              SQLite Database                     │
│          data/learning_platform.db               │
└─────────────────────────────────────────────────┘
```

### 📂 Estructura del Proyecto

```
The_Huddle_Challenge_8_CodePro_4/
├── app.js                          # Punto de entrada del servidor
├── package.json                    # Dependencias y scripts
├── data/                           # Base de datos SQLite
│   └── learning_platform.db
├── public/                         # Archivos estáticos
│   ├── css/
│   │   └── style.css               # Estilos de la aplicación
│   └── js/
│       └── main.js                 # Lógica del cliente (votación AJAX)
└── src/
    ├── config/
    │   └── db.js                   # Conexión y configuración de SQLite
    ├── controllers/
    │   ├── topicController.js      # Lógica de temas (CRUD + votos)
    │   └── linkController.js       # Lógica de enlaces (CRUD + votos)
    ├── models/
    │   ├── topicModel.js           # Consultas SQL para temas
    │   └── linkModel.js            # Consultas SQL para enlaces
    ├── routes/
    │   ├── topicRoutes.js          # Rutas REST de temas
    │   └── linkRoutes.js           # Rutas REST de enlaces
    └── views/
        ├── error.hbs               # Página de error
        ├── layouts/
        │   └── main.hbs            # Layout principal compartido
        ├── topics/
        │   ├── index.hbs           # Lista de temas
        │   ├── show.hbs            # Detalle de un tema con sus enlaces
        │   └── edit.hbs            # Formulario de edición de tema
        └── links/
            └── edit.hbs            # Formulario de edición de enlace
```

---

## 🚀 Pasos para Ejecutar el Proyecto

### Requisitos Previos

- **Node.js** v18 o superior — [Descargar aquí](https://nodejs.org/)
- **npm** (incluido con Node.js)

### 1. Clonar el repositorio

```bash
git clone https://github.com/da21nny/The_Huddle_Challenge_8_CodePro_4.git
cd The_Huddle_Challenge_8_CodePro_4
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Ejecutar la aplicación

**Windows (PowerShell o CMD):**
```powershell
npm start
```

**Linux / macOS (Terminal):**
```bash
npm start
```

### 4. Abrir en el navegador

```
http://localhost:3000
```

> La base de datos SQLite se crea automáticamente en `data/learning_platform.db` al iniciar la aplicación.

---

## 📦 Librerías Utilizadas

| Librería | Versión | Descripción |
|---|---|---|
| [Express](https://expressjs.com/) | ^5.2.1 | Framework web para Node.js |
| [express-handlebars](https://github.com/express-handlebars/express-handlebars) | ^9.0.1 | Motor de plantillas para generar HTML dinámico |
| [SQLite3](https://github.com/TryGhost/node-sqlite3) | ^6.0.1 | Base de datos embebida, sin servidor externo |
| [method-override](https://github.com/expressjs/method-override) | ^3.0.0 | Soporte para PUT y DELETE en formularios HTML |

---

## 🛠️ Scripts Disponibles

| Comando | Descripción |
|---|---|
| `npm start` | Inicia el servidor en `http://localhost:3000` |

---

## 👨‍💻 Desarrollado por

**Edgar Vega - Da21nny** — [@da21nny](https://github.com/da21nny)

Proyecto desarrollado como parte del **The Huddle Challenge 8 — CodePro 4**.