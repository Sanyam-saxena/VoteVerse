import { useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { fetchElectionData } from "../services/api.js";

export default function Scenarios() {
  const [scenarios, setScenarios] = useState([]);
  const [expandedIds, setExpandedIds] = useState([]);

  useEffect(() => {
    fetchElectionData("scenarios").then((data) => setScenarios(data.scenarios));
  }, []);

  const allExpanded = useMemo(
    () => scenarios.length > 0 && expandedIds.length === scenarios.length,
    [expandedIds.length, scenarios.length]
  );

  const toggleScenario = (id) => {
    setExpandedIds((currentIds) =>
      currentIds.includes(id) ? currentIds.filter((currentId) => currentId !== id) : [...currentIds, id]
    );
  };

  const toggleAll = () => {
    setExpandedIds(allExpanded ? [] : scenarios.map((scenario) => scenario.id));
  };

  return (
    <section className="page narrow-page">
      <div className="module-header with-action">
        <div>
          <span className="module-kicker">Scenario Engine</span>
          <h1>Understand edge cases</h1>
          <p>Expand a scenario to see a simple step-by-step explanation.</p>
        </div>
        <button className="button button-secondary" type="button" onClick={toggleAll}>
          {allExpanded ? "Collapse all" : "Expand all"}
        </button>
      </div>

      <div className="scenario-list">
        {scenarios.map((scenario) => {
          const isExpanded = expandedIds.includes(scenario.id);

          return (
            <article className={isExpanded ? "scenario-card expanded" : "scenario-card"} key={scenario.id}>
              <button
                className="scenario-summary"
                type="button"
                onClick={() => toggleScenario(scenario.id)}
                aria-expanded={isExpanded}
                aria-controls={`${scenario.id}-content`}
              >
                <span>
                  <strong>{scenario.title}</strong>
                  <small>{scenario.summary}</small>
                </span>
                {isExpanded ? <ChevronUp size={20} aria-hidden="true" /> : <ChevronDown size={20} aria-hidden="true" />}
              </button>

              <div className="scenario-content" id={`${scenario.id}-content`} aria-hidden={!isExpanded}>
                <ol>
                  {scenario.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
