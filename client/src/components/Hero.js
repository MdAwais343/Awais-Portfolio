import React, { useEffect, useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, Twitter, Sparkles } from "lucide-react";
import { PROFILE, SOCIALS, ROTATING_TITLES } from "../data/portfolio";
import MagneticButton from "./ui/MagneticButton";

const useTypingEffect = (words, { typeSpeed = 90, deleteSpeed = 45, pause = 1600 } = {}) => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      setText(words[index]);
      const t = setTimeout(() => setIndex((i) => (i + 1) % words.length), 2200);
      return () => clearTimeout(t);
    }
    const current = words[index];
    let timeout;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(
        () => {
          setText((prev) =>
            deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1)
          );
        },
        deleting ? deleteSpeed : typeSpeed
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pause, reduce]);

  return text;
};

const FloatingShape = ({ className, children, delay = 0 }) => (
  <motion.div
    className={`absolute hidden md:block ${className}`}
    animate={{ y: [0, -18, 0], rotate: [0, 8, 0] }}
    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay }}
  >
    {children}
  </motion.div>
);

const Hero = () => {
  const typed = useTypingEffect(ROTATING_TITLES);

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleResume = () => {
    const link = document.createElement("a");
    link.href = process.env.PUBLIC_URL + PROFILE.resume;
    link.download = PROFILE.resumeFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden px-5 pb-16 pt-28 sm:px-8"
    >
      <div className="shell grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Text column */}
        <motion.div variants={container} initial="hidden" animate="show" className="order-2 lg:order-1">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-accent-highlight backdrop-blur"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Available for new opportunities
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Hi, I'm <br className="hidden sm:block" />
            <span className="gradient-text text-glow">{PROFILE.name}</span>
          </motion.h1>

          <motion.div
            variants={item}
            className="mt-5 flex h-9 items-center font-display text-xl font-medium text-white/90 sm:text-2xl md:text-3xl"
          >
            <span className="text-muted">I'm a&nbsp;</span>
            <span className="text-accent-highlight">{typed}</span>
            <span className="ml-0.5 inline-block h-7 w-[2px] animate-blink bg-accent-highlight sm:h-8" />
          </motion.div>

          <motion.p variants={item} className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            Passionate full-stack developer with 1+ years of experience building scalable web and
            mobile applications. Specializing in React, React Native, Node.js, Django, and modern
            cloud deployment with solid DevOps and CI/CD practices.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <MagneticButton onClick={() => scrollTo("projects")} variant="primary">
              View Projects
              <ArrowDown className="h-4 w-4 -rotate-90" />
            </MagneticButton>
            <MagneticButton onClick={handleResume} variant="secondary">
              <Download className="h-4 w-4" />
              Download Resume
            </MagneticButton>
          </motion.div>

          <motion.div variants={item} className="mt-9 flex items-center gap-4">
            <span className="text-xs uppercase tracking-[0.2em] text-muted">Find me on</span>
            <div className="h-px w-10 bg-white/15" />
            <div className="flex items-center gap-3">
              {[
                { Icon: Github, href: SOCIALS.github, label: "GitHub" },
                { Icon: Linkedin, href: SOCIALS.linkedin, label: "LinkedIn" },
                { Icon: Twitter, href: SOCIALS.twitter, label: "Twitter" },
              ].map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="grid h-10 w-10 place-items-center rounded-full glass text-white/80 transition-colors hover:text-white"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Image column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative order-1 mx-auto flex w-full max-w-sm justify-center lg:order-2"
        >
          <FloatingShape className="-left-2 top-6" delay={0}>
            <div className="h-16 w-16 rounded-2xl border border-white/15 bg-white/5 backdrop-blur" />
          </FloatingShape>
          <FloatingShape className="right-2 top-1/4" delay={1.2}>
            <div className="h-10 w-10 rotate-45 rounded-lg bg-gradient-to-br from-accent to-accent-secondary opacity-80" />
          </FloatingShape>
          <FloatingShape className="bottom-8 left-4" delay={2}>
            <div className="h-12 w-12 rounded-full border border-accent-highlight/40 bg-accent-highlight/10 backdrop-blur" />
          </FloatingShape>

          <div className="relative">
            {/* glow rings */}
            <div className="absolute -inset-6 rounded-full bg-gradient-to-tr from-accent/30 via-accent-secondary/20 to-accent-highlight/30 blur-2xl" />
            <div className="absolute -inset-3 animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,rgba(79,140,255,0.7),rgba(123,97,255,0.2),rgba(0,212,255,0.7),rgba(79,140,255,0.7))] opacity-70 [mask:radial-gradient(farthest-side,transparent_calc(100%-3px),#000_calc(100%-3px))]" />
            <div className="relative aspect-square w-72 overflow-hidden rounded-full border border-white/15 bg-white/5 sm:w-80">
              <img
                src={PROFILE.photo}
                alt={`${PROFILE.name} — ${PROFILE.role}`}
                className="h-full w-full object-cover object-top"
                loading="eager"
              />
              <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo("about")}
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted hover:text-white sm:flex"
      >
        <span className="text-[11px] uppercase tracking-[0.25em]">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.button>
    </section>
  );
};

export default Hero;
