import { Router } from "express";
import { index, store, vote, show, edit, destroy, update } from "../controllers/topicController.js";

// Crea el enrutador para los topics
const router = Router();

router.get("/topics", index);        // GET    - Lista todos los topics
router.post("/topics", store);       // POST   - Crea un nuevo topic
router.get("/topics/:id/edit", edit);// GET    - Formulario de edición de topic
router.post("/topics/:id/vote", vote);// POST  - Vota por un topic (AJAX)
router.get("/topics/:id", show);     // GET    - Detalle de un topic con sus enlaces
router.delete("/topics/:id", destroy);// DELETE - Elimina un topic
router.put("/topics/:id", update);   // PUT    - Actualiza un topic

export default router; // Exporta el enrutador
