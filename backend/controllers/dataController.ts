import type { Request, Response } from "express";
import chatResponses from "../../frontend/src/data/chatResponses.json" with { type: "json" };
import quizQuestions from "../../frontend/src/data/quizQuestions.json" with { type: "json" };
import scenarios from "../../frontend/src/data/scenarios.json" with { type: "json" };
import simulatorSteps from "../../frontend/src/data/simulatorSteps.json" with { type: "json" };
import timelineSteps from "../../frontend/src/data/timelineSteps.json" with { type: "json" };

export function getChatResponses(_request: Request, response: Response) {
  response.json(chatResponses);
}

export function getSimulatorSteps(_request: Request, response: Response) {
  response.json(simulatorSteps);
}

export function getTimelineSteps(_request: Request, response: Response) {
  response.json(timelineSteps);
}

export function getQuizQuestions(_request: Request, response: Response) {
  response.json(quizQuestions);
}

export function getScenarios(_request: Request, response: Response) {
  response.json(scenarios);
}

