import * as linkModel from "../models/linkModel.js";

const index = async (req, res) => {
    const { topicId } = req.params;
    const links = await linkModel.getLinksByTopic(topicId);
    res.render("links/index", { links });
};

const store = async (req, res) => {
    const { topicId } = req.params;
    const { title, url } = req.body;
    await linkModel.createLink(topicId, title, url);
    res.redirect(`/topics/${topicId}`);
};

const vote = async (req, res) => {
    const { id, topicId } = req.params;
    await linkModel.voteLink(id);
    res.redirect(`/topics/${topicId}`);
};

const edit = async (req, res) => {
    const { id, topicId } = req.params;
    const link = await linkModel.getLinkById(id);
    res.render("links/edit", { link, topicId });
};

const destroy = async (req, res) => {
    const { id, topicId } = req.params;
    await linkModel.deleteLink(id);
    res.redirect(`/topics/${topicId}`);
};

const update = async (req, res) => {
    const { id, topicId } = req.params;
    const { title, url } = req.body;
    await linkModel.updateLink(id, title, url);
    res.redirect(`/topics/${topicId}`);
};

export { index, store, vote, edit, destroy, update };
