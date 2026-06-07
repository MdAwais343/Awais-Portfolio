import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import api from "../api/client";
import { DEFAULT_PROJECTS } from "../data/portfolio";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

const AUTOPLAY_MS = 5500;

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 320 : -320,
    opacity: 0,
    scale: 0.94,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (direction) => ({
    x: direction > 0 ? -320 : 320,
    opacity: 0,
    scale: 0.94,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  }),
};

const ProjectSlide = ({ project, index, total }) => {
  const num = String(index + 1).padStart(2, "0");

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl glass lg:flex-row">
      {/* Image */}
      <div className="relative aspect-[16/10] shrink-0 overflow-hidden lg:aspect-auto lg:w-[48%]">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover object-top"
          onError={(e) => {
            e.target.style.display = "none";
            if (e.target.nextSibling) e.target.nextSibling.style.display = "flex";
          }}
        />
        <div
          className="hidden h-full min-h-[220px] w-full items-center justify-center bg-gradient-to-br from-accent/30 to-accent-secondary/30"
          style={{ display: "none" }}
        >
          <span className="font-display text-5xl font-bold text-white/80">
            {project.title.charAt(0)}
          </span>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-bg/60" />

        <span className="absolute right-4 top-4 font-mono text-xs font-medium tracking-widest text-white/40">
          {num} / {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <motion.h3
          key={`title-${project.id}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="font-display text-2xl font-semibold text-white sm:text-3xl"
        >
          {project.title}
        </motion.h3>

        <motion.p
          key={`desc-${project.id}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.4 }}
          className="mt-3 line-clamp-4 text-sm leading-relaxed text-muted sm:text-base"
        >
          {project.description}
        </motion.p>

        <motion.div
          key={`tech-${project.id}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mt-5 flex flex-wrap gap-2"
        >
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-white/70"
            >
              {tech}
            </span>
          ))}
        </motion.div>

        <motion.div
          key={`links-${project.id}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, duration: 0.4 }}
          className="mt-auto flex flex-wrap items-center gap-4 pt-8"
        >
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-secondary px-6 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform duration-200 hover:scale-105"
            >
              Live Demo
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
            </a>
          )}
        </motion.div>
      </div>
    </article>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    let active = true;
    api
      .get("/api/projects")
      .then((res) => {
        if (active && Array.isArray(res.data) && res.data.length) {
          setProjects(res.data);
        }
      })
      .catch(() => {
        /* keep default data if API fails */
      });
    return () => {
      active = false;
    };
  }, []);

  const paginate = useCallback(
    (newDirection) => {
      setDirection(newDirection);
      setCurrent((prev) => {
        const next = prev + newDirection;
        if (next < 0) return projects.length - 1;
        if (next >= projects.length) return 0;
        return next;
      });
    },
    [projects.length]
  );

  const goTo = (index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  useEffect(() => {
    if (paused || projects.length <= 1) return;
    const timer = setInterval(() => paginate(1), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, paginate, projects.length, current]);

  if (!projects.length) return null;

  return (
    <section id="projects" className="section-pad">
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow="Projects"
            title="Selected work"
            subtitle="A showcase of products I've designed and built — from full-stack apps to polished frontends."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Carousel viewport */}
            <div className="relative min-h-[480px] overflow-hidden sm:min-h-[420px] lg:min-h-[380px]">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={projects[current].id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0"
                >
                  <ProjectSlide
                    project={projects[current]}
                    index={current}
                    total={projects.length}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation arrows */}
            {projects.length > 1 && (
              <>
                <button
                  onClick={() => paginate(-1)}
                  aria-label="Previous project"
                  className="absolute -left-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-bg/80 text-white backdrop-blur transition-all duration-200 hover:border-accent/40 hover:bg-accent/20 sm:-left-5 sm:h-12 sm:w-12"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => paginate(1)}
                  aria-label="Next project"
                  className="absolute -right-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-bg/80 text-white backdrop-blur transition-all duration-200 hover:border-accent/40 hover:bg-accent/20 sm:-right-5 sm:h-12 sm:w-12"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            {/* Dots + progress */}
            {projects.length > 1 && (
              <div className="mt-8 flex flex-col items-center gap-4">
                <div className="flex items-center gap-2">
                  {projects.map((project, i) => (
                    <button
                      key={project.id}
                      onClick={() => goTo(i)}
                      aria-label={`Go to project ${i + 1}`}
                      className="group relative h-2 overflow-hidden rounded-full transition-all duration-300"
                      style={{ width: i === current ? 40 : 8 }}
                    >
                      <span className="absolute inset-0 rounded-full bg-white/15" />
                      {i === current && (
                        <motion.span
                          layoutId="project-dot-active"
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-accent-secondary"
                        />
                      )}
                      {!paused && i === current && (
                        <motion.span
                          key={`progress-${current}`}
                          className="absolute inset-y-0 left-0 rounded-full bg-white/30"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                        />
                      )}
                    </button>
                  ))}
                </div>

                <p className="text-xs text-muted">
                  {projects[current].title}
                </p>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Projects;
