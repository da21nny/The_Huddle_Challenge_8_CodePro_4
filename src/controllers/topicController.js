import * as topicModel from "../models/topicModel.js";
import * as linkModel from "../models/linkModel.js";

const index = async (req, res) => {
    try {
        const topics = await topicModel.getAllTopics();
        res.render("topics/index", { topics });
    } catch (error) {
        res.render("error", { message: "Error al obtener los temas" });
    }
};

const store = async (req, res) => {
    try {
        const { title, description } = req.body;
        await topicModel.createTopic(title, description);
        res.redirect("/topics");
    } catch (error) {
        res.render("error", { message: "Error al crear el tema" });
    }
};

const vote = async (req, res) => {
    try {
        const { id } = req.params;
        await topicModel.voteTopic(id);
        const updatedTopic = await topicModel.getTopicById(id);
        res.json({ votes: updatedTopic.votes });
    } catch (error) {
        res.render("error", { message: "Error al votar el tema" });
    }
};

const show = async (req, res) => {
    try {
        const { id } = req.params;
        const topic = await topicModel.getTopicById(id);
        const links = await linkModel.getLinksByTopic(id);
        res.render("topics/show", { topic, links });
    } catch (error) {
        res.render("error", { message: "Error al obtener el tema" });
    }
};

const edit = async (req, res) => {
    try {
        const { id } = req.params;
        const topic = await topicModel.getTopicById(id);
        res.render("topics/edit", { topic });
    } catch (error) {
        res.render("error", { message: "Error al editar el tema" });
    }
};

const destroy = async (req, res) => {
    try {
        const { id } = req.params;
        await topicModel.deleteTopic(id);
        res.redirect("/topics");
    } catch (error) {
        res.render("error", { message: "Error al eliminar el tema" });
    }
};

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

export { index, store, vote, show, edit, destroy, update };
