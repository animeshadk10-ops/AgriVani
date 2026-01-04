import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Impact from "./components/Impact/Impact";
import Vision from "./components/Vision/Vision";
import HowItWorks from "./components/HowItWorks/HowItWorks";
import Features from "./components/Features/Features";
import TechCore from "./components/TechCore/TechCore";
import Download from "./components/Download/Download";
import Team from "./components/Team/Team";
import FAQ from "./components/FAQ/FAQ";
import Footer from "./components/Footer/Footer";
import "./App.css";

export default function App() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Custom Cursor
    const move = (e) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);

    // Scroll Reveal
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll("section").forEach(el => {
      el.style.opacity = 0;
      el.style.transform = "translateY(50px)";
      el.style.transition = "all 1s ease";
      observer.observe(el);
    });

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="app">
      <div className="cursor" style={{ left: cursor.x, top: cursor.y }}></div>
      <Navbar />
      <Hero />
      <Impact />
      <Vision />
      <HowItWorks />
      <Features />
      <TechCore />
      <Download />
      <Team />
      <FAQ />
      <Footer />
    </div>
  );
}