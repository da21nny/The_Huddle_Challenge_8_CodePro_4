# Plan de Implementación — Challenge 8: Learn It, Love It

Plataforma educativa CRUD con sistema de votaciones. Desarrollado con Node.js, Express, EJS y JavaScript puro. Arquitectura MVC. **Enfoque funcional mínimo requerido**, sin complicaciones extras.

---

## 1. Arquitectura del Proyecto (MVC)

La estructura propuesta organiza las responsabilidades estrictamente en base al patrón Modelo-Vista-Controlador de forma simple:

```
proyecto/
├── app.js                      ← Configuración del servidor y motor de plantillas
├── data/
│   └── db.json                 ← Archivo JSON que actúa como base de datos
├── models/
│   └── dataModel.js            ← Lógica de manipulación de db.json (leer/escribir/ordenar datos)
├── controllers/
│   ├── topicController.js      ← Controla todo el ciclo de vida de los "Temas"
│   └── linkController.js       ← Controla todo el ciclo de vida de los "Enlaces"
├── routes/
│   ├── topicRoutes.js          ← Rutas de Express conectadas al topicController
│   └── linkRoutes.js           ← Rutas de Express conectadas al linkController
├── views/
│   ├── layout.ejs              ← Layout general (Estructura HTML básica)
│   ├── index.ejs               ← Vista principal: lista los temas
│   ├── show.ejs                ← Detalle del tema y sus enlaces
│   ├── topic_form.ejs          ← Formulario para crear/editar tema
│   └── link_form.ejs           ← Formulario para crear/editar enlace
└── public/                     
    ├── css/style.css           ← Estilos mínimos fundamentales
    └── js/main.js              ← JS Puro para la función asíncrona de votar
```

---

## 2. Modelo de Datos (db.json)

Almacenamiento persistente simple. Cada vez que se vote por un tema, el orden se regenera en la lectura (`GET`).

```json
{
  "topics": [
    {
      "id": "12345",
      "title": "Tutorial de Node JS",
      "description": "Conceptos de MVC y backend",
      "votes": 0,
      "links": [
        {
          "id": "abcde",
          "title": "Aprende MVC",
          "url": "https://ejemplo.com/mvc",
          "votes": 0
        }
      ]
    }
  ]
}
```

---

## 3. Plan de Desarrollo Paso a Paso

### Fase 1: Entorno y Servidor Básico
1. **Inicialización:** Crear el `package.json` (`npm init -y`) y agregar dependencias mínimas requeridas (`express`, `ejs`).
2. **Servidor:** Configurar `app.js` para levantar express en el puerto `3000`.
3. **Midlewares:** Configurar los estáticos (`public/`), el motor de vista (`set('view engine', 'ejs')`) y el analizador manual de formularios (`express.urlencoded({ extended: true })`).

### Fase 2: Capa de Modelo (Capa de Datos)
1. **Persistencia:** Crear `data/db.json` con un estado base `{ "topics": [] }`.
2. **Lógica en `dataModel.js`:** 
   - `getTopics()`: Lee el JSON y lo devuelve ordenado (`.sort`) descendentemente por la cantidad de `votes`.
   - Funciones auxiliares genéricas: `saveData()` para sobrescribir en el disco, `findById(id)`.

### Fase 3: Rutas y Controladores para Temas
1. **Crear el controller de temas (`topicController.js`)**:
   - `index`: Listar temas ordenados.
   - `newForm` / `create`: Formulario vacío / Guardar en el JSON.
   - `show`: Obtener un tema particular para la vista en detalle.
   - `editForm` / `update`: Formulario precargado / Reemplazar y guardar.
   - `destroy`: Eliminar.
   - `vote`: Buscar id, sumar de a `+1` a `votes` y guardar.
2. **Crear y vincular rutas**: en `topicRoutes.js`.

### Fase 4: Rutas y Controladores para Enlaces
1. **Lógica Interna (`linkController.js`)**: Similar al de temas, los enlaces están anidados dentro de un tema.
   - `newForm`/`create`, `editForm`/`update`, `destroy`, `vote`.
2. **Anidamiento**: Las rutas seguirán el patrón `/topics/:topicId/links/...`

### Fase 5: Capa de Vista (EJS)
1. **Layout**: HTML5 básico (doctype, head, body).
2. **Formularios**: Construir formularios simples `<form>` enviando a `POST`. Para editar, dado que el navegador no soporta nativamente PUT/DELETE desde HTML bruto sin JS, se usarán formularios que apunten a endpoints como `/topics/:id/edit` (POST) o `/topics/:id/delete` (POST).
3. **Iteración**: Usar sintaxis EJS `<% topics.forEach... %>` para listar temas y enlaces.

### Fase 6: Frontend Dinámico (Client-side JS)
1. Solo se usa para el requerimiento específico de "votos sin recargar toda la página".
2. **`main.js`**:
   - Capturar clics de los botones de la clase `.btn-vote`.
   - Evitar el comportamiento por defecto (Event.preventDefault).
   - Llamar con `fetch()` al endpoint correspondiente del backend enviando un POST de voto.
   - Recibir la respuesta (ej. del nuevo número de votos y el array actualizado).
   - Manipular el DOM para actualizar la cuenta visual de votos inmediatamente y reordenar su contención sin que el usuario sufra recargas.

---

## 4. Diseño e Interfaz UI
**Aproximación mínima funcional:**
- Sin bibliotecas de CSS (No Bootstrap, No Tailwind). CSS Puro (`style.css`).
- Sistema de flexbox para centrar y acomodar listados.
- Botones de estado claro: Editar (Azul), Eliminar (Rojo), Votar (Verde o con ícono de ▲).
- Contenedores de tarjeta (cards) limpios para cada tema y enlace.
- Separación visual fácil de leer.

---

## 5. Decisiones Técnicas sobre Requerimientos
- **Mínimo requerido MVC:** Totalmente cubierto separando las rutas, los controladores y el modelo lógico de persistencia.
- **Sin Base De Datos Comercial:** Usando `fs` (File System de Node) para transcribir sobre un archivo local estático `db.json`. Simple, rápido para este propósito.
- **JS Puro (Vanilla JS):** Completado usando solamente DOM Web APIs y `Fetch API` para la lógica del reordenamiento en tiempo real desde el cliente del sistema de votaciones.
- **Nada Extra:** No se agregó ningún autenticador de usuarios ni frameworks robustos ni librerías de componentes UI.
