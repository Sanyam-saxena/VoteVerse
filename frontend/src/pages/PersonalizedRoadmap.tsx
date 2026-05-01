import { useState } from "react";
import { Sparkles, Loader2, Map as MapIcon } from "lucide-react";
import { trackEvent } from "../services/googleAnalytics";

export default function PersonalizedRoadmap() {
  const [formData, setFormData] = useState({ age: 18, state: "", interest: "all" });
  const [roadmap, setRoadmap] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5001/api/roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      setRoadmap(data.roadmap);
      trackEvent("roadmap_generated", { state: formData.state });
    } catch (error) {
      console.error("Failed to fetch roadmap:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="page narrow-page">
      <div className="module-header">
        <span className="module-kicker">Personalized Guide</span>
        <h1>Your Voting Roadmap</h1>
        <p>Get a custom guide powered by Gemini AI based on your age and state.</p>
      </div>

      <div className="interactive-card">
        <form onSubmit={handleSubmit} className="roadmap-form">
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              id="age"
              type="number"
              min="18"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="state">State</label>
            <input
              id="state"
              type="text"
              placeholder="e.g., Maharashtra"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="interest">Primary Interest</label>
            <select
              id="interest"
              value={formData.interest}
              onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
            >
              <option value="all">Full Process</option>
              <option value="registration">Voter Registration</option>
              <option value="verification">ID Verification</option>
              <option value="voting-day">Voting Day Guide</option>
            </select>
          </div>
          <button className="button button-primary" type="submit" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />}
            Generate Roadmap
          </button>
        </form>
      </div>

      {roadmap && (
        <div className="roadmap-output markdown-content" aria-live="polite">
          <div className="output-header">
            <MapIcon size={20} />
            <h2>Your Custom Roadmap</h2>
          </div>
          <div className="roadmap-text">
            {roadmap.split("\n").map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
