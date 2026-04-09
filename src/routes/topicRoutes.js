import { Router } from "express";
import { index, store, vote, show, destroy, update } from "../controllers/topicController.js";

const router = Router();

router.get("/topics", index);
router.post("/topics", store);
router.post("/topics/:id/vote", vote);
router.get("/topics/:id", show);
router.delete("/topics/:id", destroy);
router.put("/topics/:id", update);

export default router;