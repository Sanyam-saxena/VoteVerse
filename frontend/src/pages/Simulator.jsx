import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { fetchElectionData } from "../services/api.js";
import { trackEvent } from "../services/googleAnalytics.js";

export default function Simulator() {
  const [steps, setSteps] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetchElectionData("simulator-steps").then((data) => setSteps(data.steps));
  }, []);

  const activeStep = steps[activeIndex];
  const progress = steps.length ? ((activeIndex + 1) / steps.length) * 100 : 0;

  return (
    <section className="page narrow-page">
      <div className="module-header">
        <span className="module-kicker">Election Simulator</span>
        <h1>Move through the election flow</h1>
        <p>Learn each stage one step at a time, with clear actions and outcomes.</p>
      </div>

      <div className="simulator-shell">
        <div className="step-indicator" aria-label="Simulator steps">
          {steps.map((step, index) => (
            <button
              type="button"
              key={step.id}
              className={index === activeIndex ? "step-dot active" : "step-dot"}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to ${step.title}`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <div
          className="progress-track"
          role="progressbar"
          aria-label="Election simulator progress"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={Math.round(progress)}
        >
          <span style={{ width: `${progress}%` }} />
        </div>

        {activeStep && (
          <article className="interactive-card simulator-card">
            <div className="card-meta">Step {activeIndex + 1} of {steps.length}</div>
            <h2>{activeStep.title}</h2>
            <p>{activeStep.description}</p>
            <ul className="check-list">
              {activeStep.points.map((point) => (
                <li key={point}>
                  <CheckCircle2 size={18} aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>
        )}

        <div className="module-actions">
          <button
            className="button button-secondary"
            type="button"
            disabled={!steps.length || activeIndex === 0}
            onClick={() => {
              setActiveIndex((index) => index - 1);
              trackEvent("simulator_step_back", { module_name: "Simulator" });
            }}
          >
            <ArrowLeft size={18} aria-hidden="true" />
            Back
          </button>
          <button
            className="button button-primary"
            type="button"
            disabled={!steps.length || activeIndex === steps.length - 1}
            onClick={() => {
              setActiveIndex((index) => index + 1);
              trackEvent("simulator_step_next", { module_name: "Simulator" });
            }}
          >
            Next
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
