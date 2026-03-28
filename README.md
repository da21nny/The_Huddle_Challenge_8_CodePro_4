# 🎓 Learn It, Love It — Plataforma de Temas de Aprendizaje

## 📝 Descripción del Proyecto
**Learn It, Love It** es una aplicación web interactiva diseñada para que los usuarios puedan compartir y descubrir temas de aprendizaje. La plataforma permite organizar el conocimiento mediante "Temas" (Topics) que contienen "Enlaces" (Links) útiles. 

### ¿Para qué sirve?
El objetivo principal es crear una comunidad de aprendizaje donde los recursos más útiles suban a la cima. Los usuarios pueden votar por los temas y enlaces que consideren más valiosos, permitiendo que el contenido se **reordene dinámicamente en tiempo real** basándose en la popularidad y utilidad percibida.

### ¿Cómo funciona?
1.  **Explorar e interactuar**: En la página principal, verás tarjetas con diferentes temas. 
2.  **Votar**: Puedes hacer clic en el botón "Upvote" de cualquier tema o enlace. El sistema actualizará el conteo y reordenará la lista automáticamente sin recargar la página.
3.  **Gestionar Contenido (CRUD)**: Puedes crear nuevos temas, ver su detalle para añadir enlaces específicos, editar la información existente o eliminar lo que ya no sea relevante.

---

## 🏗️ Arquitectura y Estructura
El proyecto sigue el patrón de diseño **MVC (Modelo-Vista-Controlador)** para garantizar un código organizado, escalable y fácil de mantener.

### Estructura de Carpetas:
```text
├── controllers/       # Lógica de negocio (Cerebro de la app)
├── data/              # Base de datos persistente (JSON)
├── models/            # Gestión de datos y persistencia
├── public/            # Archivos estáticos (CSS, JS Vanilla)
├── routes/    	       # Definición de rutas y endpoints
├── views/             # Plantillas de interfaz (EJS)
│   ├── links/         # Vistas CRUD para enlaces
│   └── topics/        # Vistas CRUD para temas
└── app.js             # Punto de entrada del servidor Express
```

**Tecnologías utilizadas:**
*   **Backend**: Node.js & Express.
*   **Persistencia**: JSON dinámico (File System).
*   **Frontend**: EJS (Motor de plantillas) y Vanilla JS (JS Puro) para el DOM dinámico.
*   **Diseño**: CSS3 (Modern Dark Theme) totalmente responsivo.

---

## 🚀 Requisitos y Pasos para Ejecutar

### Requisitos Previos:
1.  Tener instalado **Node.js** (versión 14 o superior recomendada).
2.  Tener instalado **npm** (viene con Node.js).

### Instalación y Ejecución:
Sigue estos pasos en tu terminal:

1.  **Clonar el proyecto** (si aplica) o situarse en la carpeta raíz del mismo.
2.  **Instalar dependencias**:
    ```bash
    npm install
    ```
3.  **Iniciar el servidor**:
    ```bash
    npm start
    ```
4.  **Abrir en el navegador**:
    Visita [http://localhost:3000](http://localhost:3000).

### Cómo Probar:
*   Crea un nuevo tema en el botón **"Add Topic"**.
*   Vota por los temas en la lista principal y observa cómo cambian de posición.
*   Entra en un tema específico, añade algunos enlaces y vota por ellos para ver el reordenamiento interno.

---

## 👨‍💻 Autor
Este proyecto fue desarrollado como parte del **The Huddle Challenge** por su servidor Edgar Vega - Da21nny. La idea principal fue aplicar conceptos de **MVC**, **Operaciones CRUD**, **HTTP** y **JS Puro** de una manera simple, eficiente y con un diseño visual moderno.

---
© 2026 Learn It, Love It Inc.
