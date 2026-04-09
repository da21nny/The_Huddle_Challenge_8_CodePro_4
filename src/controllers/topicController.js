import * as topicModel from "../models/topicModel.js";

const index = async (req, res) => {
    const topics = await topicModel.getAllTopics();
    res.render("topics/index", { topics });
};

const store = async (req, res) => {
    const { title, description } = req.body;
    await topicModel.createTopic(title, description);
    res.redirect("/topics");
};

const vote = async (req, res) => {
    const { id } = req.params;
    await topicModel.voteTopic(id);
    res.redirect("/topics");
};

const show = async (req, res) => {
    const { id } = req.params;
    const topic = await topicModel.getTopicById(id);
    res.render("topics/show", { topic });
};

const destroy = async (req, res) => {
    const { id } = req.params;
    await topicModel.deleteTopic(id);
    res.redirect("/topics");
};

const update = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    await topicModel.updateTopic(id, title, description);
    res.redirect("/topics");
};

export { index, store, vote, show, destroy, update };
