import express from "express";
import {
  generateScript,
  saveScript,
  getScripts,
} from "../controllers/scriptController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/generate", auth, generateScript);

router.post("/save", auth, saveScript);

router.get("/", auth, getScripts);

export { router as scriptRoutes };
