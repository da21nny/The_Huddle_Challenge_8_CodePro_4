import * as linkModel from "../models/linkModel.js";

const index = async (req, res) => {
    try {
        const { topicId } = req.params;
        res.redirect(`/topics/${topicId}`);
    } catch (error) {
        res.render("error", { message: "Error al obtener los enlaces" });
    }
};

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

const vote = async (req, res) => {
    try {
        const { id, topicId } = req.params;
        await linkModel.voteLink(id);
        const updatedLink = await linkModel.getLinkById(id);
        res.json({ votes: updatedLink.votes });
    } catch (error) {
        res.render("error", { message: "Error al votar el enlace" });
    }
};

const edit = async (req, res) => {
    try {
        const { id, topicId } = req.params;
        const link = await linkModel.getLinkById(id);
        res.render("links/edit", { link, topicId });
    } catch (error) {
        res.render("error", { message: "Error al editar el enlace" });
    }
};

const destroy = async (req, res) => {
    try {
        const { id, topicId } = req.params;
        await linkModel.deleteLink(id);
        res.redirect(`/topics/${topicId}`);
    } catch (error) {
        res.render("error", { message: "Error al eliminar el enlace" });
    }
};

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

export { index, store, vote, edit, destroy, update };
