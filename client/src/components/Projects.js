import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, Maximize2, X } from "lucide-react";
import api from "../api/client";
import { DEFAULT_PROJECTS, SOCIALS } from "../data/portfolio";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

const FALLBACK_CATEGORY = "Projects";

const CATEGORY_STYLES = {
  Healthcare: {
    chip: "border-accent-warm/30 bg-accent-warm/10 text-accent-warm",
    glow: "rgba(255,122,198,0.16)",
  },
  Commerce: {
    chip: "border-accent-highlight/30 bg-accent-highlight/10 text-accent-highlight",
    glow: "rgba(0,212,255,0.15)",
  },
  "Web Platforms": {
    chip: "border-accent/30 bg-accent/10 text-accent",
    glow: "rgba(79,140,255,0.18)",
  },
};
const DEFAULT_CATEGORY_STYLE = {
  chip: "border-accent-secondary/30 bg-accent-secondary/10 text-accent-secondary",
  glow: "rgba(123,97,255,0.16)",
};

const getCategory = (project) => project.category || FALLBACK_CATEGORY;
const getCategoryStyle = (project) => CATEGORY_STYLES[getCategory(project)] || DEFAULT_CATEGORY_STYLE;

// "Name — Tagline" → { name, tagline }
const splitTitle = (title = "") => {
  const [name, ...rest] = title.split(" — ");
  return { name, tagline: rest.join(" — ") };
};

const hostOf = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
};

const BrowserFrame = ({ project, className = "", children }) => {
  const [failed, setFailed] = useState(false);
  const host = hostOf(project.live);

  return (
    <div
      className={`overflow-hidden rounded-xl border border-white/10 bg-[#0b1020] shadow-soft ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-3 py-2">
        <span className="flex gap-1.5" aria-hidden>
          <i className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <i className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="ml-2 flex-1 truncate rounded-md bg-white/5 px-3 py-0.5 text-center text-[11px] text-muted">
          {host || project.title}
        </span>
      </div>

      <div className="relative aspect-[16/10] overflow-hidden bg-white/[0.03]">
        {failed ? (
          <div className="grid h-full w-full place-items-center bg-gradient-to-br from-accent/30 to-accent-secondary/30">
            <span className="font-display text-5xl font-bold text-white/80">
              {project.title.charAt(0)}
            </span>
          </div>
        ) : (
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            loading="lazy"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/50 via-transparent to-transparent" />
        {children}
      </div>
    </div>
  );
};

const RoleLabel = ({ role }) =>
  role ? (
    <p className="mt-3 flex items-center gap-2 text-xs font-medium text-white/75">
      <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/50">
        My role
      </span>
      {role}
    </p>
  ) : null;

const TechChips = ({ technologies = [], limit }) => {
  const shown = limit ? technologies.slice(0, limit) : technologies;
  const extra = technologies.length - shown.length;
  return (
    <div className="flex flex-wrap gap-2">
      {shown.map((tech) => (
        <span
          key={tech}
          className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-white/75"
        >
          {tech}
        </span>
      ))}
      {extra > 0 && (
        <span className="rounded-md border border-dashed border-white/15 px-2.5 py-1 text-xs font-medium text-muted">
          +{extra}
        </span>
      )}
    </div>
  );
};

const ProjectCard = ({ project, index, featured, reverse, onOpen }) => {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: -300, y: -300 });
  const [hover, setHover] = useState(false);
  const { name, tagline } = splitTitle(project.title);
  const style = getCategoryStyle(project);

  const handleMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`group gradient-border relative flex flex-col overflow-hidden rounded-3xl glass transition-shadow duration-500 hover:shadow-glow ${
        featured
          ? `md:col-span-2 lg:col-span-3 ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"}`
          : ""
      }`}
    >
      {/* cursor spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: hover ? 1 : 0,
          background: `radial-gradient(460px circle at ${pos.x}px ${pos.y}px, ${style.glow}, transparent 65%)`,
        }}
      />

      {/* media */}
      <button
        type="button"
        onClick={() => onOpen(project)}
        aria-label={`View details for ${name}`}
        className={`relative z-10 block shrink-0 p-4 pb-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-accent ${
          featured
            ? `lg:w-[55%] lg:self-center lg:p-6 ${reverse ? "lg:pl-0" : "lg:pr-0"}`
            : ""
        }`}
      >
        <BrowserFrame project={project}>
          <span className="absolute inset-0 grid place-items-center bg-bg/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-bg/70 px-4 py-2 text-xs font-semibold text-white">
              <Maximize2 className="h-3.5 w-3.5" />
              View details
            </span>
          </span>
        </BrowserFrame>
      </button>

      {/* content */}
      <div
        className={`relative z-10 flex flex-1 flex-col p-5 pt-5 sm:p-6 ${
          featured ? "lg:justify-center lg:p-10" : "lg:p-7"
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${style.chip}`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {getCategory(project)}
          </span>
          <span className="font-mono text-xs tracking-widest text-white/30">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3 className="mt-4 font-display text-xl font-semibold leading-snug text-white sm:text-2xl">
          {name}
        </h3>
        {tagline && <p className="mt-1 text-sm font-medium text-accent-highlight/90">{tagline}</p>}
        <RoleLabel role={project.role} />

        <p
          className={`mt-3 text-sm leading-relaxed text-muted ${
            featured ? "line-clamp-5" : "line-clamp-3"
          }`}
        >
          {project.description}
        </p>

        <div className="mt-5">
          <TechChips technologies={project.technologies} limit={featured ? 6 : 4} />
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-secondary px-5 py-2 text-sm font-semibold text-white shadow-glow transition-transform duration-200 hover:scale-105"
            >
              Live Demo
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} source code on GitHub`}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white/80 transition-colors hover:border-white/30 hover:text-white"
            >
              <Github className="h-[18px] w-[18px]" />
            </a>
          )}
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="ml-auto text-sm font-medium text-muted transition-colors hover:text-white"
          >
            Details →
          </button>
        </div>
      </div>
    </motion.article>
  );
};

const ProjectModal = ({ project, onClose }) => {
  const closeRef = useRef(null);
  const { name, tagline } = splitTitle(project.title);
  const style = getCategoryStyle(project);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="absolute inset-0 bg-bg/80 backdrop-blur-md" onClick={onClose} aria-hidden />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        initial={{ opacity: 0, y: 48, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 32, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl border border-white/10 bg-[#0a0f1c] shadow-glow-lg sm:rounded-3xl"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-bg/80 text-white backdrop-blur transition-colors hover:border-accent/50 hover:bg-accent/20"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="overflow-y-auto">
          <div className="p-4 pb-0 sm:p-6 sm:pb-0">
            <BrowserFrame project={project} />
          </div>

          <div className="p-6 sm:p-8">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${style.chip}`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              {getCategory(project)}
            </span>

            <h3
              id="project-modal-title"
              className="mt-4 font-display text-2xl font-semibold text-white sm:text-4xl"
            >
              {name}
            </h3>
            {tagline && <p className="mt-2 text-base font-medium text-accent-highlight">{tagline}</p>}
            <RoleLabel role={project.role} />

            <p className="mt-5 text-sm leading-relaxed text-muted sm:text-base">
              {project.description}
            </p>

            <p className="mb-3 mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              Tech stack
            </p>
            <TechChips technologies={project.technologies} />

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-secondary px-6 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform duration-200 hover:scale-105"
                >
                  Visit live site
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/10"
                >
                  <Github className="h-4 w-4" />
                  Source code
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);

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

  const categories = useMemo(() => {
    const counts = new Map();
    projects.forEach((p) => counts.set(getCategory(p), (counts.get(getCategory(p)) || 0) + 1));
    return [
      { name: "All", count: projects.length },
      ...Array.from(counts, ([name, count]) => ({ name, count })),
    ];
  }, [projects]);

  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => getCategory(p) === filter)),
    [projects, filter]
  );

  const closeModal = useCallback(() => setSelected(null), []);

  if (!projects.length) return null;

  return (
    <section id="projects" className="section-pad">
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow="Projects"
            title="Selected work"
            subtitle="Products I've helped design and ship — healthcare platforms, marketplaces, media and more."
          />
        </Reveal>

        {categories.length > 2 && (
          <Reveal delay={0.05}>
            <div className="-mt-6 mb-10 flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => {
                const isActive = filter === cat.name;
                return (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => setFilter(cat.name)}
                    aria-pressed={isActive}
                    className={`relative rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "border-transparent text-white"
                        : "border-white/10 bg-white/[0.04] text-muted hover:border-white/25 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="project-filter-active"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-accent-secondary shadow-glow"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">
                      {cat.name}
                      <span className={`ml-2 text-xs ${isActive ? "text-white/80" : "text-white/40"}`}>
                        {cat.count}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        )}

        <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                featured={filter === "All" && i < 2}
                reverse={i === 1}
                onOpen={setSelected}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-col items-center gap-3 text-center">
            <p className="text-sm text-muted">Want to see more of what I've built?</p>
            <a
              href={SOCIALS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/10"
            >
              <Github className="h-4 w-4" />
              Browse more on GitHub
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal key={selected.id} project={selected} onClose={closeModal} />}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
