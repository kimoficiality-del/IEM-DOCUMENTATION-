import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import EngineeringPage from "./pages/EngineeringPage";
import PrintingPage from "./pages/PrintingPage";
import DataAnalysisPage from "./pages/DataAnalysisPage";
import ProjectEditingPage from "./pages/ProjectEditingPage";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import BackToTop from "./components/layout/BackToTop";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-blue-100 selection:text-blue-900">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/engineering" element={<EngineeringPage />} />
            <Route path="/printing" element={<PrintingPage />} />
            <Route path="/data-analysis" element={<DataAnalysisPage />} />
            <Route path="/project-editing" element={<ProjectEditingPage />} />
          </Routes>
        </main>
        <BackToTop />
        <Footer />
      </div>
    </Router>
  );
}
