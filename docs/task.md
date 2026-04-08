# RoadMap de Tareas - Learn It, Love It (Challenge 8)

## 1. Configuración de Entorno
- `[x]` Iniciar proyecto con `npm init -y`.
- `[x]` Instalar las librerías `express` y `ejs`.
- `[x]` Crear archivo de entrada principal (`app.js`).
- `[x]` Modificar `package.json` para agregar `"start": "node app.js"`.
- `[x]` Configurar `express` y EJS como motor de vistas en `app.js`.

## 2. Desarrollo del Modelo de Datos Persistente
- `[ ]` Crear la carpeta `data` y el archivo `db.json` con el arreglo inicial de temas.
- `[ ]` Crear la carpeta `models` y el archivo `dataModel.js`.
- `[ ]` Codificar en `dataModel.js` métodos utilitarios: leer archivo, escribir archivo.

## 3. Desarrollo CRUD Base de "Temas" (Back-End)
- `[ ]` Crear la carpeta `controllers`.
- `[ ]` Codificar `topicController.js` (Funciones CRUD: crear, ver listado ordenado, actualizar, eliminar, incrementar voto).
- `[ ]` Crear la carpeta `routes`.
- `[ ]` Crear `topicRoutes.js` emparejando endpoints GET y POST a las funciones del Topic Controller.

## 4. Vistas en EJS para "Temas"
- `[ ]` Crear la carpeta `views`.
- `[ ]` Codificar vista principal `index.ejs` listar los temas mostrándolos con su voto.
- `[ ]` Codificar formulario `topic_form.ejs` de creación / edición de un tema.

## 5. Desarrollo CRUD de "Enlaces" anidados a temas
- `[ ]` Codificar `linkController.js` (Funciones CRUD: crear en un tema espefico, actualizar, eliminar, voto en enlace).
- `[ ]` Crear `linkRoutes.js` y vincular los endpoints.
- `[ ]` Codificar la vista de detalle `show.ejs` para iterar los enlaces pertenecientes a un tema puntual.
- `[ ]` Codificar formulario para el enlace en `link_form.ejs`.

## 6. Lógica de Sistema de Votaciones y Frontend
- `[ ]` Ajustar el Backend (controllers) para que toda ruta de `.../vote` responda un JSON (estado actualizado) con el nuevo valor de voto y orden en vez de forzar una renderización de la página `<ejs>`.
- `[ ]` Crear la carpeta frontend `public/js` y el script `main.js`.
- `[ ]` Añadir JS Nativo `main.js` para interceptar clicks a botones "Votar", emitir request por Fetch al servidor y reordenar visualmente.
- `[ ]` Cargar `main.js` dentro del layout general de las Vistas en EJS.

## 7. Estilos e Interfaz de Usuario
- `[ ]` Crear `public/css/style.css` y configurar Flexbox estético mínimo.
- `[ ]` Linkear los archivos CCS en las cabeceras HTML generadas por EJS.

## 8. Revisión y Refactorización
- `[ ]` Testear la adición de múltiples temas y enlaces.
- `[ ]` Testeos de recarga asíncrona mediante clicks a votar.
- `[ ]` Validar y limpiar el código (`app.js` final ordenado).
