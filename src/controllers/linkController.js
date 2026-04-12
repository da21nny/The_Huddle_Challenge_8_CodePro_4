import * as linkModel from "../models/linkModel.js";

// Redirige al detalle del topic (los links se muestran dentro del topic)
const index = (req, res) => {
    try {
        const { topicId } = req.params; // Obtiene el ID del topic de los parámetros de la ruta
        res.redirect(`/topics/${topicId}`); // Redirige a la página del topic
    } catch (error) {
        res.render("error", { message: "Error al obtener los enlaces" }); // Renderiza la página de error
    }
};

// Crea un nuevo enlace asociado al tópic y redirige
const store = async (req, res) => {
    try {
        const { topicId } = req.params; // Obtiene el ID del topic de los parámetros de la ruta
        const { title, url } = req.body; // Obtiene el título y la URL del cuerpo de la solicitud
        await linkModel.createLink(topicId, title, url); // Crea el enlace en la base de datos
        res.redirect(`/topics/${topicId}`); // Redirige a la página del topic
    } catch (error) {
        res.render("error", { message: "Error al crear el enlace" }); // Renderiza la página de error
    }
};

// Incrementa el voto de un enlace y retorna el nuevo conteo (respuesta JSON para AJAX)
const vote = async (req, res) => {
    try {
        const { id } = req.params; // Obtiene el ID del enlace de los parámetros de la ruta
        await linkModel.voteLink(id); // Incrementa el voto del enlace en la base de datos
        const updatedLink = await linkModel.getLinkById(id); // Obtiene el enlace actualizado de la base de datos
        res.json({ votes: updatedLink.votes }); // Retorna el nuevo conteo de votos
    } catch (error) {
        res.status(500).json({ error: "Error al votar el enlace" }); // Renderiza la página de error
    }
};

// Obtiene un enlace por ID y renderiza el formulario de edición
const edit = async (req, res) => {
    try {
        const { id, topicId } = req.params; // Obtiene el ID del enlace y del topic de los parámetros de la ruta
        const link = await linkModel.getLinkById(id); // Obtiene el enlace de la base de datos
        res.render("links/edit", { link, topicId }); // Renderiza el formulario de edición
    } catch (error) {
        res.render("error", { message: "Error al editar el enlace" }); // Renderiza la página de error
    }
};

// Elimina un enlace por ID y redirige al topic
const destroy = async (req, res) => {
    try {
        const { id, topicId } = req.params; // Obtiene el ID del enlace y del topic de los parámetros de la ruta
        await linkModel.deleteLink(id); // Elimina el enlace de la base de datos
        res.redirect(`/topics/${topicId}`); // Redirige a la página del topic
    } catch (error) {
        res.render("error", { message: "Error al eliminar el enlace" }); // Renderiza la página de error
    }
};

// Actualiza título y URL de un enlace existente y redirige
const update = async (req, res) => {
    try {
        const { id, topicId } = req.params; // Obtiene el ID del enlace y del topic de los parámetros de la ruta
        const { title, url } = req.body; // Obtiene el título y la URL del cuerpo de la solicitud
        await linkModel.updateLink(id, title, url); // Actualiza el enlace en la base de datos
        res.redirect(`/topics/${topicId}`); // Redirige a la página del topic
    } catch (error) {
        res.render("error", { message: "Error al actualizar el enlace" }); // Renderiza la página de error
    }
};

export { index, store, vote, edit, destroy, update }; // Exporta las funciones
