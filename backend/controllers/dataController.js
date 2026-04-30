import chatResponses from "../../frontend/src/data/chatResponses.json" with { type: "json" };
import quizQuestions from "../../frontend/src/data/quizQuestions.json" with { type: "json" };
import scenarios from "../../frontend/src/data/scenarios.json" with { type: "json" };
import simulatorSteps from "../../frontend/src/data/simulatorSteps.json" with { type: "json" };
import timelineSteps from "../../frontend/src/data/timelineSteps.json" with { type: "json" };

// MVP data is structured from public election-process concepts available through ECI, NVSP, and data.gov.in.
export function getChatResponses(request, response) {
  response.json(chatResponses);
}

export function getSimulatorSteps(request, response) {
  response.json(simulatorSteps);
}

export function getTimelineSteps(request, response) {
  response.json(timelineSteps);
}

export function getQuizQuestions(request, response) {
  response.json(quizQuestions);
}

export function getScenarios(request, response) {
  response.json(scenarios);
}
