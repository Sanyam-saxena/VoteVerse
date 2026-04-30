import { useEffect, useState } from "react";
import { fetchElectionData } from "../services/api.js";

export default function Timeline() {
  const [steps, setSteps] = useState([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    fetchElectionData("timeline-steps").then((data) => {
      setSteps(data.steps);
      setActiveId(data.steps[0]?.id || "");
    });
  }, []);

  const activeStep = steps.find((step) => step.id === activeId);
  const activeIndex = steps.findIndex((step) => step.id === activeId);

  const handleTimelineKeyDown = (event) => {
    if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(event.key) || !steps.length) return;

    event.preventDefault();
    const direction = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1;
    const nextIndex = (activeIndex + direction + steps.length) % steps.length;
    setActiveId(steps[nextIndex].id);
  };

  return (
    <section className="page">
      <div className="module-header">
        <span className="module-kicker">Election Timeline</span>
        <h1>Follow the election calendar</h1>
        <p>Click a stage to see what happens and why it matters.</p>
      </div>

      <div className="timeline-layout">
        <div className="timeline-list" role="tablist" aria-label="Election timeline stages">
          {steps.map((step, index) => (
            <button
              className={step.id === activeId ? "timeline-item active" : "timeline-item"}
              key={step.id}
              type="button"
              onClick={() => setActiveId(step.id)}
              onKeyDown={handleTimelineKeyDown}
              role="tab"
              aria-selected={step.id === activeId}
              tabIndex={step.id === activeId ? 0 : -1}
            >
              <span className="timeline-number">{index + 1}</span>
              <span>{step.title}</span>
            </button>
          ))}
        </div>

        {activeStep && (
          <article className="interactive-card detail-panel">
            <span className="card-meta">Timeline stage</span>
            <h2>{activeStep.title}</h2>
            <p>{activeStep.description}</p>
            <div className="detail-note">{activeStep.detail}</div>
          </article>
        )}
      </div>
    </section>
  );
}
