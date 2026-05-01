import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";

const Home = lazy(() => import("./pages/Home"));
const Chat = lazy(() => import("./pages/Chat"));
const Simulator = lazy(() => import("./pages/Simulator"));
const Timeline = lazy(() => import("./pages/Timeline"));
const Quiz = lazy(() => import("./pages/Quiz"));
const Scenarios = lazy(() => import("./pages/Scenarios"));
const PersonalizedRoadmap = lazy(() => import("./pages/PersonalizedRoadmap"));
const PollingStations = lazy(() => import("./pages/PollingStations"));
const VoterVerification = lazy(() => import("./pages/VoterVerification"));
const VoterPledge = lazy(() => import("./pages/VoterPledge"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  return (
    <Suspense fallback={<div className="loading-fallback">Loading...</div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/simulator" element={<Simulator />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/scenarios" element={<Scenarios />} />
          <Route path="/roadmap" element={<PersonalizedRoadmap />} />
          <Route path="/polling-stations" element={<PollingStations />} />
          <Route path="/verify" element={<VoterVerification />} />
          <Route path="/pledge" element={<VoterPledge />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );


