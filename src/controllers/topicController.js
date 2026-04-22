import * as topicModel from "../models/topicModel.js";
import * as linkModel from "../models/linkModel.js";

// Obtiene todos los topics y renderiza la lista principal
const index = async (req, res) => {
    try {
        const topics = await topicModel.getAllTopics();
        res.render("topics/index", { topics });
    } catch (error) {
        res.render("error", { message: "Error al obtener los temas" });
    }
};

// Crea un nuevo topic y redirige a la lista
const store = async (req, res) => {
    try {
        const { title, description } = req.body;
        await topicModel.createTopic(title, description);
        res.redirect("/topics");
    } catch (error) {
        res.render("error", { message: "Error al crear el tema" });
    }
};

// Incrementa el voto de un topic y retorna el nuevo conteo
const vote = async (req, res) => {
    try {
        const { id } = req.params;
        await topicModel.voteTopic(id);
        const topic = await topicModel.getTopicById(id);
        res.json({ votes: topic.votes });
    } catch (error) {
        res.render("error", { message: "Error al votar" });
    }
};

// Muestra el detalle de un topic con sus enlaces
const show = async (req, res) => {
    try {
        const { id } = req.params;
        const topic = await topicModel.getTopicById(id);
        if (!topic) return res.render("error", { message: "Tema no encontrado" });

        const links = await linkModel.getLinksByTopic(id);
        res.render("topics/show", { topic, links });
    } catch (error) {
        res.render("error", { message: "Error al obtener el tema" });
    }
};

// Renderiza el formulario de edición
const edit = async (req, res) => {
    try {
        const { id } = req.params;
        const topic = await topicModel.getTopicById(id);
        if (!topic) return res.render("error", { message: "Tema no encontrado" });

        res.render("topics/edit", { topic });
    } catch (error) {
        res.render("error", { message: "Error al editar el tema" });
    }
};

// Actualiza título y descripción de un topic
const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        await topicModel.updateTopic(id, title, description);
        res.redirect("/topics");
    } catch (error) {
        res.render("error", { message: "Error al actualizar el tema" });
    }
};

// Elimina un topic y redirige a la lista
const destroy = async (req, res) => {
    try {
        const { id } = req.params;
        await topicModel.deleteTopic(id);
        res.redirect("/topics");
    } catch (error) {
        res.render("error", { message: "Error al eliminar el tema" });
    }
};

export { index, store, vote, show, edit, update, destroy };