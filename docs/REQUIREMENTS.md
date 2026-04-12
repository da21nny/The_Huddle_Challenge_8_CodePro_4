# 📋 Requerimientos del Sistema — Learn It, Love It Inc.

Este proyecto ha sido desarrollado siguiendo la arquitectura MVC y utiliza las siguientes tecnologías fundamentales para cumplir con los objetivos del desafío.

## 🛠 Entorno de Ejecución
- **Node.js**: v18.x o superior.
- **npm**: v9.x o superior.

## 📦 Dependencias Core (Backend)

| Dependencia | Propósito | Justificación |
| :--- | :--- | :--- |
| **express** | Framework Web | Manejo de rutas, middleware y el ciclo de solicitud/respuesta HTTP. |
| **ejs** | Motor de Plantillas | Renderización dinámica del lado del servidor para transformar JSON en HTML interactivo. |
| **sqlite3** | Base de Datos | Motor de persistencia ligero para almacenar temas, enlaces y votos sin necesidad de un servidor externo. |
| **method-override** | Soporte HTTP | Permite que los formularios HTML (que solo soportan GET/POST) usen métodos `PUT` y `DELETE` siguiendo principios REST. |

## 🌐 Tecnologías Frontend (Vanilla JS)
Para cumplir con los requerimientos obligatorios, **no se utilizan librerías externas** en el cliente:
- **Fetch API**: Para actualizaciones de votos en tiempo real sin recargar la página.
- **CSS3 Personalizado**: Diseñado desde cero para una estética premium sin frameworks como Tailwind (opcional).

## 🚀 Instalación
Una vez clonado el repositorio, instale las dependencias con:
```bash
npm install
```
