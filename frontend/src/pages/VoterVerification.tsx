import { useState } from "react";
import { Camera, FileCheck, Loader2, Upload } from "lucide-react";
import { trackEvent } from "../services/googleAnalytics";

export default function VoterVerification() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<null | { valid: boolean; reason: string }>(null);

  const handleSimulateUpload = () => {
    setIsVerifying(true);
    setResult(null);
    
    // Simulate Gemini Pro Vision analysis
    setTimeout(() => {
      setIsVerifying(false);
      setResult({
        valid: true,
        reason: "Gemini AI confirmed the document matches official ECI standards for structural integrity and data placement."
      });
      trackEvent("voter_id_verified", { status: "success" });
    }, 2500);
  };

  return (
    <section className="page narrow-page">
      <div className="module-header">
        <span className="module-kicker">Advanced AI Services</span>
        <h1>ID Document Analysis</h1>
        <p>Experience how Google Gemini Pro Vision can assist in verifying voter documentation.</p>
      </div>

      <div className="interactive-card">
        <div className="upload-zone">
          <div className="upload-prompt">
            <Camera size={48} aria-hidden="true" />
            <h3>Upload ID Mock</h3>
            <p>Select a sample image to test AI analysis (Simulated)</p>
          </div>
          
          <button 
            className="button button-primary" 
            onClick={handleSimulateUpload}
            disabled={isVerifying}
          >
            {isVerifying ? <Loader2 className="animate-spin" /> : <Upload size={18} />}
            {isVerifying ? "Gemini is analyzing..." : "Upload Sample ID"}
          </button>
        </div>
      </div>

      {result && (
        <div className={`verification-result card ${result.valid ? "success" : "error"}`} aria-live="assertive">
          <div className="result-header">
            <FileCheck size={24} aria-hidden="true" />
            <h2>Verification Result</h2>
          </div>
          <p>{result.reason}</p>
          <div className="disclaimer">
            * This is an AI-powered educational simulation. Actual verification happens via NVSP portals.
          </div>
        </div>
      )}

      <style>{`
        .upload-zone {
          border: 2px dashed var(--border);
          padding: 40px;
          text-align: center;
          border-radius: var(--radius-md);
          background: var(--surface-muted);
        }
        .upload-prompt {
          margin-bottom: 24px;
        }
        .upload-prompt h3 {
          margin: 16px 0 8px;
        }
        .verification-result {
          margin-top: 32px;
          border-left: 4px solid var(--success);
          animation: slideIn 0.3s ease-out;
        }
        .result-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
          color: var(--success);
        }
        .disclaimer {
          margin-top: 16px;
          font-size: 12px;
          color: var(--text-muted);
          font-style: italic;
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
