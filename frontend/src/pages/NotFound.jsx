import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="page narrow-page">
      <div className="interactive-card">
        <span className="module-kicker">404</span>
        <h1>Page not found</h1>
        <p>The VoteVerse module you are looking for does not exist.</p>
        <Link className="button button-primary" to="/">
          Back home
        </Link>
      </div>
    </section>
  );
}
