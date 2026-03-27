// Controlador de votos: responde con JSON para actualización dinámica del DOM
const topicModel = require('../models/topicModel');
const linkModel = require('../models/linkModel');

// Vota por un topic y retorna el nuevo conteo + orden actualizado
function voteTopic(req, res) {
  const result = topicModel.vote(req.params.id);
  if (!result) return res.status(404).json({ error: 'Topic no encontrado' });
  // responde con JSON para que el JS del cliente actualice el DOM
  res.json(result);
}

// Vota por un link y retorna el nuevo conteo + orden actualizado
function voteLink(req, res) {
  const result = linkModel.vote(req.params.id, req.params.lid);
  if (!result) return res.status(404).json({ error: 'Link no encontrado' });
  // responde con JSON para que el JS del cliente actualice el DOM
  res.json(result);
}

module.exports = { voteTopic, voteLink };
