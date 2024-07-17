import express from "express";

import { getPlayer, getPlayers } from "./handlers";

const router = express.Router();

router.get("/page/:page/limit/:limit", getPlayers);
router.get("/:id", getPlayer);

export default router;
