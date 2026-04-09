import { Router } from "express";
import { index, store, vote, destroy, update } from "../controllers/linkController.js";

const router = Router();

router.get("/topics/:topicId/links", index);
router.post("/topics/:topicId/links", store);
router.post("/topics/:topicId/links/:id/vote", vote);
router.delete("/topics/:topicId/links/:id", destroy);
router.put("/topics/:topicId/links/:id", update);

export default router;