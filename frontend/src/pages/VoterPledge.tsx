import { useState } from "react";
import { Award, CheckCircle, Download, Share2 } from "lucide-react";
import { trackEvent } from "../services/googleAnalytics";

export default function VoterPledge() {
  const [name, setName] = useState("");
  const [hasPledged, setHasPledged] = useState(false);

  const handlePledge = (e: React.FormEvent) => {
    e.preventDefault();
    setHasPledged(true);
    trackEvent("voter_pledge_taken", { voter_name: name });
  };

  return (
    <section className="page narrow-page">
      <div className="module-header">
        <span className="module-kicker">Civic Commitment</span>
        <h1>Take the Voter Pledge</h1>
        <p>Join thousands of citizens committing to a stronger democracy.</p>
      </div>

      {!hasPledged ? (
        <div className="interactive-card card pledge-entry">
          <form onSubmit={handlePledge}>
            <div className="form-group">
              <label htmlFor="voter-name">Your Full Name</label>
              <input
                id="voter-name"
                type="text"
                placeholder="Enter your name for the certificate"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <p className="pledge-text">
              "I solemnly pledge to exercise my right to vote with responsibility and pride, 
              contributing to the democratic fabric of my nation."
            </p>
            <button className="button button-primary" type="submit">
              <CheckCircle size={18} />
              Commit to Vote
            </button>
          </form>
        </div>
      ) : (
        <div className="certificate-container animate-in">
          <div className="certificate card">
            <div className="cert-border">
              <Award size={48} className="cert-icon" />
              <span className="cert-eyebrow">Certificate of Commitment</span>
              <h2 className="voter-name">{name}</h2>
              <p>has solemnly pledged to participate in the democratic process</p>
              <div className="cert-footer">
                <span className="cert-brand">VoteVerse</span>
                <span className="cert-date">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <div className="cert-actions">
            <button className="button button-secondary" onClick={() => window.print()}>
              <Download size={18} />
              Download PDF
            </button>
            <button className="button button-primary">
              <Share2 size={18} />
              Share on Social
            </button>
          </div>
        </div>
      )}

      <style>{`
        .pledge-text {
          margin: 24px 0;
          font-style: italic;
          color: var(--text-muted);
          line-height: 1.6;
          border-left: 3px solid var(--primary);
          padding-left: 20px;
        }
        .certificate-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 32px;
        }
        .certificate {
          width: 100%;
          max-width: 600px;
          padding: 10px;
          background: #fff;
          color: #1a202c;
          border-radius: 4px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.1);
        }
        .cert-border {
          border: 6px double var(--primary);
          padding: 40px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .cert-icon {
          color: var(--gold);
          margin-bottom: 20px;
        }
        .cert-eyebrow {
          text-transform: uppercase;
          letter-spacing: 2px;
          font-size: 14px;
          color: var(--text-muted);
        }
        .voter-name {
          font-size: 42px;
          margin: 20px 0;
          font-family: serif;
          border-bottom: 2px solid #eee;
          padding-bottom: 10px;
          width: 80%;
        }
        .cert-footer {
          margin-top: 40px;
          display: flex;
          justify-content: space-between;
          width: 100%;
          font-size: 14px;
          color: var(--text-muted);
        }
        .cert-brand {
          font-weight: 800;
          color: var(--primary);
        }
        .cert-actions {
          display: flex;
          gap: 16px;
        }
        .animate-in {
          animation: scaleUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  );
}
