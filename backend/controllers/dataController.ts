import type { Request, Response } from "express";
import chatResponses from "../../frontend/src/data/chatResponses.json" with { type: "json" };
import quizQuestions from "../../frontend/src/data/quizQuestions.json" with { type: "json" };
import scenarios from "../../frontend/src/data/scenarios.json" with { type: "json" };
import simulatorSteps from "../../frontend/src/data/simulatorSteps.json" with { type: "json" };
import timelineSteps from "../../frontend/src/data/timelineSteps.json" with { type: "json" };

/**
 * Interface representing the standardized API response for static data modules.
 */
interface StaticDataResponse {
  success: boolean;
  data: any;
  timestamp: string;
}

/**
 * Wraps data in a consistent response envelope for better client-side handling.
 */
function wrapResponse(data: any): StaticDataResponse {
  return {
    success: true,
    data,
    timestamp: new Date().toISOString()
  };
}

/**
 * Returns structured chat responses for local fallback.
 */
export function getChatResponses(_request: Request, response: Response): void {
  response.json(wrapResponse(chatResponses));
}

/**
 * Returns the step-by-step simulator data.
 */
export function getSimulatorSteps(_request: Request, response: Response): void {
  response.json(wrapResponse(simulatorSteps));
}

/**
 * Returns election timeline stages.
 */
export function getTimelineSteps(_request: Request, response: Response): void {
  response.json(wrapResponse(timelineSteps));
}

/**
 * Returns multiple-choice quiz questions.
 */
export function getQuizQuestions(_request: Request, response: Response): void {
  response.json(wrapResponse(quizQuestions));
}

/**
 * Returns election-day hypothetical scenarios.
 */
export function getScenarios(_request: Request, response: Response): void {
  response.json(wrapResponse(scenarios));
}
