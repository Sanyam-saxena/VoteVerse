import { NavLink, Outlet } from "react-router-dom";
import { Bot, CalendarDays, Home, Landmark, ListChecks, LogIn, MapPin, Moon, Route, Sparkles, Sun, Vote } from "lucide-react";

import { useTheme } from "../hooks/useTheme";
import RouteAnalytics from "./RouteAnalytics";

const navItems = [
  { label: "Home", to: "/", icon: Home },
  { label: "AI Chat", to: "/chat", icon: Bot },
  { label: "Simulator", to: "/simulator", icon: Route },
  { label: "Roadmap", to: "/roadmap", icon: Sparkles },
  { label: "Stations", to: "/polling-stations", icon: MapPin },
  { label: "Timeline", to: "/timeline", icon: CalendarDays },
  { label: "Quiz", to: "/quiz", icon: ListChecks },
  { label: "Scenarios", to: "/scenarios", icon: Landmark }
];


export default function Layout() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="app-shell">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <RouteAnalytics />
      <header className="site-header">
        <NavLink to="/" className="brand" aria-label="VoteVerse home">
          <span className="brand-mark">
            <Vote size={21} strokeWidth={2.4} aria-hidden="true" />
          </span>
          <span className="brand-wordmark">VoteVerse</span>
        </NavLink>

        <nav className="primary-nav" aria-label="Primary navigation">
          {navItems.map(({ label, to, icon: Icon }) => (
            <NavLink key={to} to={to} end={to === "/"} className="nav-link">
              <Icon size={17} aria-hidden="true" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <button 
          className="button button-secondary login-button" 
          onClick={() => alert("Google Login would initiate here using Firebase Auth.")}
          aria-label="Login with Google"
        >
          <LogIn size={16} />
          <span>Login</span>
        </button>

        <button className="icon-button" type="button" onClick={toggleTheme} aria-label="Toggle dark mode">
          {theme === "dark" ? <Sun size={19} aria-hidden="true" /> : <Moon size={19} aria-hidden="true" />}
        </button>

      </header>

      <main id="main-content" className="page-transition">
        <Outlet />
      </main>
    </div>
  );
}

