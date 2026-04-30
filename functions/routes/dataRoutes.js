import { Router } from "express";
import { getChatResponses, getQuizQuestions, getScenarios, getSimulatorSteps, getTimelineSteps } from "../controllers/dataController.js";

const router = Router();

router.get("/chat-responses", getChatResponses);
router.get("/simulator-steps", getSimulatorSteps);
router.get("/timeline-steps", getTimelineSteps);
router.get("/quiz-questions", getQuizQuestions);
router.get("/scenarios", getScenarios);

export default router;
