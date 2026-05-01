import { Link } from "react-router-dom";
import { ArrowRight, Bot, CalendarDays, Landmark, ListChecks, Route, Sparkles } from "lucide-react";
import { trackEvent } from "../services/googleAnalytics.js";

const features = [
  {
    title: "AI Chat",
    description: "Ask common election-process questions and get simple, guided explanations.",
    to: "/chat",
    icon: Bot
  },
  {
    title: "Simulator",
    description: "Walk through registration, verification, voting day, and result stages.",
    to: "/simulator",
    icon: Route
  },
  {
    title: "Timeline",
    description: "Explore the election journey from announcement to counting.",
    to: "/timeline",
    icon: CalendarDays
  },
  {
    title: "Quiz",
    description: "Check understanding with focused multiple-choice questions.",
    to: "/quiz",
    icon: ListChecks
  },
  {
    title: "Scenario Engine",
    description: "Learn how unusual election-day situations are handled.",
    to: "/scenarios",
    icon: Landmark
  },
  {
    title: "Personalized Roadmap",
    description: "Get a custom voting guide powered by Gemini AI tailored to your state.",
    to: "/roadmap",
    icon: Sparkles
  }
];


export default function Home() {
  const handleHeroMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;

    event.currentTarget.style.setProperty("--pointer-x", `${x.toFixed(2)}%`);
    event.currentTarget.style.setProperty("--pointer-y", `${y.toFixed(2)}%`);
    event.currentTarget.style.setProperty("--hero-shift-x", `${((x - 50) * 0.16).toFixed(2)}px`);
    event.currentTarget.style.setProperty("--hero-shift-y", `${((y - 50) * 0.16).toFixed(2)}px`);
  };

  const resetHeroMove = (event) => {
    event.currentTarget.style.setProperty("--pointer-x", "62%");
    event.currentTarget.style.setProperty("--pointer-y", "34%");
    event.currentTarget.style.setProperty("--hero-shift-x", "0px");
    event.currentTarget.style.setProperty("--hero-shift-y", "0px");
  };

  return (
    <section className="page page-home">
      <div className="home-hero-scene" onPointerMove={handleHeroMove} onPointerLeave={resetHeroMove}>
        <div className="hero-background" aria-hidden="true">
          <span className="civic-grid" />
          <span className="data-sweep data-sweep-one" />
          <span className="data-sweep data-sweep-two" />
          <span className="data-sweep data-sweep-three" />
          <span className="ballot-tile tile-one">Register</span>
          <span className="ballot-tile tile-two">Verify</span>
          <span className="ballot-tile tile-three">Vote</span>
        </div>

        <div className="hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">
              <Sparkles size={16} aria-hidden="true" />
              Interactive election education
            </span>
            <h1>VoteVerse</h1>
            <p>
              A clean, visual learning platform that helps first-time voters, students, and civic learners
              understand how elections move from registration to results.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" to="/simulator">
                Start simulator
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link className="button button-secondary" to="/chat">
                Ask AI assistant
              </Link>
            </div>
          </div>

          <div className="process-panel" aria-label="Election process preview">
            {["Registration", "Verification", "Voting", "Counting"].map((item, index) => (
              <div className="process-row" key={item}>
                <span className="process-index">{index + 1}</span>
                <span>{item}</span>
                <span className="process-status">Learn</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="section-heading">
        <h2>Learning modules</h2>
        <p>Choose a module and move through the process at your pace.</p>
      </div>

      <div className="feature-grid">
        {features.map(({ title, description, to, icon: Icon }) => (
          <Link
            className="feature-card"
            to={to}
            key={title}
            onClick={() => trackEvent("module_open", { module_name: title })}
          >
            <div className="feature-icon">
              <Icon size={24} aria-hidden="true" />
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
            <span className="card-link">
              Open module
              <ArrowRight size={16} aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
