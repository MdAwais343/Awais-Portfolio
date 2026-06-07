import React, { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import AnimatedBackground from "./components/effects/AnimatedBackground";
import CursorGlow from "./components/effects/CursorGlow";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import TechMarquee from "./components/ui/TechMarquee";

// Lazy-load below-the-fold sections to keep the initial bundle lean
const Skills = lazy(() => import("./components/Skills"));
const Projects = lazy(() => import("./components/Projects"));
const Experience = lazy(() => import("./components/Experience"));
const Education = lazy(() => import("./components/Education"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

const SectionFallback = () => (
  <div className="flex min-h-[40vh] items-center justify-center">
    <span className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-accent" />
  </div>
);

function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AnimatedBackground />
      <CursorGlow />
      <Navbar />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Hero />
        <About />

        {/* Tech stack marquee divider */}
        <div className="border-y border-white/5 bg-white/[0.02]">
          <div className="shell">
            <p className="px-5 pt-8 text-center text-xs uppercase tracking-[0.3em] text-muted sm:px-8">
              Technologies I work with
            </p>
          </div>
          <TechMarquee />
        </div>

        <Suspense fallback={<SectionFallback />}>
          <Skills />
          <Projects />
          <Experience />
          <Education />
          <Contact />
          <Footer />
        </Suspense>
      </motion.main>
    </div>
  );
}

export default App;
