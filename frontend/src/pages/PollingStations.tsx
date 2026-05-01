import { MapPin, Search } from "lucide-react";

export default function PollingStations() {
  return (
    <section className="page narrow-page">
      <div className="module-header">
        <span className="module-kicker">Google Maps Integration</span>
        <h1>Find Your Polling Station</h1>
        <p>Locate the nearest voting center using the Google Maps Platform.</p>
      </div>

      <div className="maps-shell">
        <div className="maps-controls card">
          <div className="search-bar">
            <input type="text" placeholder="Enter your area or pincode..." />
            <button className="button button-primary">
              <Search size={18} />
              Search
            </button>
          </div>
        </div>

        <div className="maps-placeholder card">
          <div className="placeholder-content">
            <MapPin size={48} className="text-primary" />
            <h3>Google Maps Platform</h3>
            <p>Maps API integration for spatial voter guidance.</p>
            <div className="mock-map">
               {/* In a real environment, the Google Map component would render here */}
               <div className="map-layer">
                  <div className="marker" style={{ top: "40%", left: "50%" }}>Center 1</div>
                  <div className="marker" style={{ top: "60%", left: "30%" }}>Center 2</div>
               </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .mock-map {
          height: 300px;
          background: #f0f4f8;
          border-radius: 12px;
          position: relative;
          margin-top: 20px;
          border: 1px solid #e2e8f0;
          overflow: hidden;
        }
        .map-layer {
          background: url('https://maps.googleapis.com/maps/api/staticmap?center=28.6139,77.2090&zoom=13&size=600x300&key=MOCK_KEY') center/cover;
          width: 100%;
          height: 100%;
          opacity: 0.8;
        }
        .marker {
          position: absolute;
          background: var(--primary);
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 10px;
          font-weight: bold;
        }
        .search-bar {
          display: flex;
          gap: 12px;
        }
      `}</style>
    </section>
  );
}
