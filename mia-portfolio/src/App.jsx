import { useRef } from "react";
import {
  Routes,
  Route,
} from "react-router";

import Navbar from "./components/Navbar";
import usePageMotion from "./hooks/usePageMotion";

import Home from "./pages/Home";
import Resume from "./pages/Resume";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  const motionRootRef = useRef(null);
  usePageMotion(motionRootRef);

  return (
    <div
      ref={motionRootRef}
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#fffaf1",
      }}
    >
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/resume"
          element={<Resume />}
        />

        <Route
          path="/projects"
          element={<Projects />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />
        <Route
          path="*"
          element={<Home />}
        />
      </Routes>
    </div>
  );
}

export default App;
