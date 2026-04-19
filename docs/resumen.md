Aquí tienes un resumen detallado de la arquitectura de la aplicación, archivo por archivo y función por función. Está pensado como una "hoja de ruta" para que puedas explicar la lógica completa desde la base de datos hasta el navegador.

### 1. Archivos Raíz y Configuración

**`package.json`**
*   **Resumen:** Define las dependencias del proyecto (EJS, Express, SQLite3, Method Override), los scripts de ejecución (`npm start`) y especifica `"type": "module"` para poder usar la sintaxis moderna de importaciones (`import`/`export`) de ECMAScript.

**`app.js`**
*   **Resumen:** Es el corazón o "entry point" del servidor. Configura toda la aplicación de Express.
*   **Flujo principal:**
    1.  Importa módulos y herramientas.
    2.  Inicializa la base de datos llamando a `initDB()`.
    3.  Aplica "middlewares" (intermediarios) que permiten leer `req.body` (`express.json()`, `urlencoded()`) y simular peticiones DELETE/PUT desde HTML (`methodOverride()`).
    4.  Carga el motor de plantillas EJS y habilita la carpeta `/public` para servir archivos estáticos (CSS/JS).
    5.  Monta las rutas principales importadas desde `topicRoutes` y `linkRoutes`.
    6.  Maneja los errores globales (el error 404 de "Página no encontrada" y el 500 de fallos internos).
    7.  Enciende el servidor en un puerto (`app.listen`).

---

### 2. Base de Datos / Configuración

**`src/config/db.js`**
*   **Resumen:** Crea la conexión con la base de datos `SQLite3` mediante un archivo físico y arma las tablas fundamentales.
*   `db = new sqlite3.Database`: Genera o conecta al archivo `.db`.
*   `PRAGMA foreign_keys = ON`: Obliga a SQLite a respetar el borrado de restricciones relacionales (esencial para que se borren los enlaces si se borra su tema padre).
*   `initDB()`: Función que crea las tablas principales si no existen:
    *   **Tabla `topics`:** Guarda ID, título, descripción y votos.
    *   **Tabla `links`:** Guarda ID, parent_topic_id, título, URL y votos. Si se borra el `topic`, se borra en cascada (ON DELETE CASCADE).

---

### 3. Capa de Modelos (Lógica de acceso a datos)

**`src/models/topicModel.js`**
*   **Resumen:** Contiene de manera aislada todas las consultas SQL (Queries) hacia la tabla `topics`. Intercambia Promesas (Promises) asincrónicas.
*   `getAllTopics()`: Retorna un arreglo de objetos con todos los temas ordenados de mayor a menor (`DESC`) usando la columna `votes`.
*   `createTopic(title, description)`: Ejecuta un `INSERT` y retorna el objeto del tema recién creado devolviendo el último ID insertado.
*   `voteTopic(id)`: Ejecuta un `UPDATE` que suma `+1` a la columna actual de `votes` basada en la ID del tema.
*   `getTopicById(id)`: Hace una búsqueda específica (`SELECT * WHERE id = ?`) para traer los detalles de un único tema para ver, editar o borrar.
*   `deleteTopic(id)`: Borra el registro de SQLite basado en el ID proporcionado.
*   `updateTopic(id, title, description)`: Sobrescribe el título y la descripción dado el ID proporcionado.

**`src/models/linkModel.js`**
*   **Resumen:** Similar al anterior pero gestionando la tabla `links`.
*   `getLinksByTopic(topicId)`: Trae todos los links de un topic específico ordenándolos por sus interacciones.
*   `getLinkById(id)`: Trae la información de un solo link (usualmente para popular el formulario de edición).
*   `createLink(topicId, title, url)`: Añade un nuevo recurso atado fuertemente a una jerarquía (`topicId`).
*   `voteLink(id)`, `deleteLink(id)`, `updateLink(id, title, url)`: Funciones de actualización, suma de votos o destrucción aplicables a recursos atómicos de links.

---

### 4. Capa de Controladores (Los directores de orquesta)

**`src/controllers/topicController.js`**
*   **Resumen:** Actúa como el puente entre las Vistas Web y el Modelo DB de los Temas. Controla qué página renderizar de acuerdo al flujo.
*   `index`: Solicita `getAllTopics` hacia el modelo DB y se los inyecta dinámicamente a la vista `topics/index.ejs`.
*   `show`: Recibe una ID mediante la URL, busca si existe, luego busca *sus enlaces relacionados* usando el modelo secundario (`linkModel.getLinksByTopic`) y los renderiza juntos en la vista `topics/show`.
*   `store`: Atrapa la información del formulario (req.body), la añade y redirecciona bruscamente al index base para refrescar la web.
*   `edit`, `update`, `destroy`: Renderizan vistas HTML con variables prerellenadas, actualizan o aniquilan en DB y re-direcciona la página.
*   `vote`: Intercepta la petición `AJAX`, ejecuta la función a nivel base de datos sobre el modelo, vuelve a leer cuántos votos tiene en total y **envía una respuesta JSON** (cruda, no recarga).

**`src/controllers/linkController.js`**
*   **Resumen:** Gestiona exclusivamente las interacciones dirigidas hacia los sub-links de la Web.
*   `store`: Atrapa la data de enlace enlazada dinámicamente a un `req.params.topicId`. Tras ello, redirecciona hacia el topic padre.
*   `update`, `destroy`: Modifican/Limpian los campos tras ello siempre devuelven al Topic que los contenía usando: `res.redirect("/topics/${topicId}")`.
*   `edit`: Atrapa en memoria un link usando su ID de url para cargarle los valores base al formulario de EJS (`links/edit.ejs`) que se va a imprimir.
*   `vote`: Equivalente en modelo JSON, actualiza a través de un HTTP asincrono y devuelve una confirmación `{votes: num}` de manera silenciosa.

---

### 5. Capa de Rutas (El mapa o el GPS)

**`src/routes/topicRoutes.js`** y **`src/routes/linkRoutes.js`**
*   **Resumen:** Configura Express Router para definir los puntos de destino. Amarra URLs hacia la respectiva función de los "Controladores" listados arriba. Utiliza la arquitectura REST, por lo que:
    *   Métodos `GET` están amarrados para desplegar listados (`index`) o pantallas específicas o para pintar formularios (`edit`).
    *   Métodos `POST` para creación de recursos en blanco o votos asincrónicos.
    *   Métodos combinados como `PUT/DELETE` (gracias al plugin Method-Override en app.js) son asignados estúpidamente para modificar o borrar por ID dinámicas (e.j `/topics/:topicId/links/:id`).

---

### 6. Capa de Vistas (El FrontEnd Renderizado Server-Side)

**La carpeta `src/views/`**
*   **`partials/` (`header.ejs` y `footer.ejs`)**: Cadenas modulares que se empalman en los demás archivos para que no tengas que repetir etiquetas básicas o imports de CSS.
*   **`topics/index.ejs`**: Hace un for-loop (`.forEach()`) que recorre e imprime todas la lista global o Home con sus botones de votos.
*   **`topics/show.ejs`**: Dibuja el elemento único, pero abajo de él, utiliza un segundo For-Loop sobre la variable `links` permitiendo que veas y agregues datos relativos y votables dentro de él.
*   **`error.ejs`**: Una vista salvavidas básica por si alguien envía una URL que no existe o sqlite colapsa debido al `method-override`.

---

### 7. JS Dinámico (Responsable del Tiempo Real)

**`public/js/main.js`**
*   **Resumen:** El script "Vanilla JS" que interactúa a nivel del navegador una vez la página ha sido despachada por Node/EJS y le entrega una ilusión de "Aplicación Instantánea".
*   **`document.addEventListener('click', ...)`:** Agrega un Event Listener englobado sobre absolutamente toda la pestaña. Funciona mediante un principio llamado Event Delegation. Reconoce solo si lo cliceadose identifica la clase `.vote-topic-btn` o `.vote-link-btn`.
*   `fetch(url, { method: 'POST' })`: Al ser presionado el JS se detiene, manda desde el navegador una trama hacia el Backend, donde Express la procesa, añade un número sobre DB silenciosamente y, tan pronto NodeJS escupe un `{votes: total}`, lo transforma en un objeto procesable con await response.json().
*   `reorderList(list)`: Actualiza las líneas del Front que digan "Votos:" gracias al `data-votes`. Finalmente, escoge los nodos "li", los clasifica con variables `Array(x,y)`, usa iteradores y forEach() para ordenarlos lógicamente. Al hacerlo, el navegador renderiza el cambio casi instantáneamente de mayor a menor sin recargas de red completas.