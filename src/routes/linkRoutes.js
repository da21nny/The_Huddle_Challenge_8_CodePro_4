import { Router } from "express";
import { store, vote, edit, destroy, update } from "../controllers/linkController.js";

const router = Router();

router.post("/topics/:topicId/links", store);        // POST   - Crea un nuevo enlace
router.get("/topics/:topicId/links/:id/edit", edit); // GET    - Formulario de edición de enlace
router.post("/topics/:topicId/links/:id/vote", vote);// POST   - Vota por un enlace
router.delete("/topics/:topicId/links/:id", destroy);// DELETE - Elimina un enlace
router.put("/topics/:topicId/links/:id", update);    // PUT    - Actualiza un enlace

export default router; // Exporta el enrutador