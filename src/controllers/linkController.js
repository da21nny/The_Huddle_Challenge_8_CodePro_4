import * as linkModel from "../models/linkModel.js";

// Crea un nuevo enlace asociado al topic
const store = async (req, res) => {
    try {
        const { topicId } = req.params;
        const { title, url } = req.body;
        await linkModel.createLink(topicId, title, url);
        res.redirect(`/topics/${topicId}`);
    } catch (error) {
        res.render("error", { message: "Error al crear el enlace" });
    }
};

// Incrementa el voto de un enlace y retorna el nuevo conteo
const vote = async (req, res) => {
    try {
        const { id } = req.params;
        await linkModel.voteLink(id);
        const link = await linkModel.getLinkById(id);
        res.json({ votes: link.votes });
    } catch (error) {
        res.status(500).json({ error: "Error al votar" });
    }
};

// Renderiza el formulario de edición
const edit = async (req, res) => {
    try {
        const { id, topicId } = req.params;
        const link = await linkModel.getLinkById(id);
        res.render("links/edit", { link, topicId });
    } catch (error) {
        res.render("error", { message: "Error al editar el enlace" });
    }
};

// Actualiza título y URL de un enlace
const update = async (req, res) => {
    try {
        const { id, topicId } = req.params;
        const { title, url } = req.body;
        await linkModel.updateLink(id, title, url);
        res.redirect(`/topics/${topicId}`);
    } catch (error) {
        res.render("error", { message: "Error al actualizar el enlace" });
    }
};

// Elimina un enlace
const destroy = async (req, res) => {
    try {
        const { id, topicId } = req.params;
        await linkModel.deleteLink(id);
        res.redirect(`/topics/${topicId}`);
    } catch (error) {
        res.render("error", { message: "Error al eliminar el enlace" });
    }
};

export { store, vote, edit, update, destroy };
