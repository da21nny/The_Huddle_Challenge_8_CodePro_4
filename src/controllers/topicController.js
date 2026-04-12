import * as topicModel from "../models/topicModel.js";
import * as linkModel from "../models/linkModel.js";

// Obtiene todos los topics y renderiza la lista principal
const index = async (req, res) => {
    try {
        const topics = await topicModel.getAllTopics(); // Obtiene todos los topics de la base de datos
        res.render("topics/index", { topics }); // Renderiza la lista de topics
    } catch (error) {
        res.render("error", { message: "Error al obtener los temas" }); // Renderiza la página de error
    }
};

// Crea un nuevo topic con título y descripción, luego redirige a la lista
const store = async (req, res) => {
    try {
        const { title, description } = req.body; // Obtiene el título y la descripción del cuerpo de la solicitud
        await topicModel.createTopic(title, description); // Crea el topic en la base de datos
        res.redirect("/topics"); // Redirige a la lista de topics
    } catch (error) {
        res.render("error", { message: "Error al crear el tema" }); // Renderiza la página de error
    }
};

// Incrementa el voto de un topic y retorna el nuevo conteo (respuesta JSON para AJAX)
const vote = async (req, res) => {
    try {
        const { id } = req.params; // Obtiene el ID del topic de los parámetros de la ruta
        await topicModel.voteTopic(id); // Incrementa el voto del topic en la base de datos
        const updatedTopic = await topicModel.getTopicById(id); // Obtiene el topic actualizado de la base de datos
        res.json({ votes: updatedTopic.votes }); // Retorna el nuevo conteo de votos
    } catch (error) {
        res.status(500).json({ error: "Error al votar el tema" }); // Renderiza la página de error
    }
};

// Muestra el detalle de un topic junto con sus enlaces asociados
const show = async (req, res) => {
    try {
        const { id } = req.params; // Obtiene el ID del topic de los parámetros de la ruta
        const topic = await topicModel.getTopicById(id); // Obtiene el topic de la base de datos

        // Valida que el topic exista antes de renderizar
        if (!topic) return res.render("error", { message: "Tema no encontrado" }); // Renderiza la página de error

        const links = await linkModel.getLinksByTopic(id); // Obtiene los enlaces del topic de la base de datos
        res.render("topics/show", { topic, links }); // Renderiza la página del topic con sus enlaces
    } catch (error) {
        res.render("error", { message: "Error al obtener el tema" }); // Renderiza la página de error
    }
};

// Obtiene un topic por ID y renderiza el formulario de edición
const edit = async (req, res) => {
    try {
        const { id } = req.params; // Obtiene el ID del topic de los parámetros de la ruta
        const topic = await topicModel.getTopicById(id); // Obtiene el topic de la base de datos

        // Valida que el topic exista antes de renderizar
        if (!topic) return res.render("error", { message: "Tema no encontrado" }); // Renderiza la página de error

        res.render("topics/edit", { topic }); // Renderiza el formulario de edición
    } catch (error) {
        res.render("error", { message: "Error al editar el tema" }); // Renderiza la página de error
    }
};

// Elimina un topic por ID y redirige a la lista
const destroy = async (req, res) => {
    try {
        const { id } = req.params; // Obtiene el ID del topic de los parámetros de la ruta
        await topicModel.deleteTopic(id); // Elimina el topic de la base de datos
        res.redirect("/topics"); // Redirige a la lista de topics
    } catch (error) {
        res.render("error", { message: "Error al eliminar el tema" }); // Renderiza la página de error
    }
};

// Actualiza título y descripción de un topic existente y redirige a la lista
const update = async (req, res) => {
    try {
        const { id } = req.params; // Obtiene el ID del topic de los parámetros de la ruta
        const { title, description } = req.body; // Obtiene el título y la descripción del cuerpo de la solicitud
        await topicModel.updateTopic(id, title, description); // Actualiza el topic en la base de datos
        res.redirect("/topics"); // Redirige a la lista de topics
    } catch (error) {
        res.render("error", { message: "Error al actualizar el tema" }); // Renderiza la página de error
    }
};

export { index, store, vote, show, edit, destroy, update }; // Exporta las funciones

