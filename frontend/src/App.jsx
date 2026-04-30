import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Chat from "./pages/Chat.jsx";
import Simulator from "./pages/Simulator.jsx";
import Timeline from "./pages/Timeline.jsx";
import Quiz from "./pages/Quiz.jsx";
import Scenarios from "./pages/Scenarios.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/simulator" element={<Simulator />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/scenarios" element={<Scenarios />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
