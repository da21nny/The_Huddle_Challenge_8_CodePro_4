import { Router } from "express";
import { index, store, vote, edit, destroy, update } from "../controllers/linkController.js";

const router = Router();

router.get("/topics/:topicId/links", index);
router.post("/topics/:topicId/links", store);
router.get("/topics/:topicId/links/:id/edit", edit);
router.post("/topics/:topicId/links/:id/vote", vote);
router.delete("/topics/:topicId/links/:id", destroy);
router.put("/topics/:topicId/links/:id", update);

export default router;