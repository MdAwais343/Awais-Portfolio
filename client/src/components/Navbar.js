import React, { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Menu, X, Github, Linkedin, Twitter } from "lucide-react";
import { NAV_ITEMS, SOCIALS, PROFILE } from "../data/portfolio";

const Logo = ({ onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-3 outline-none"
    aria-label="Back to top"
  >
    <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-secondary font-display text-sm font-bold text-white shadow-glow">
      MA
      <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20" />
    </span>
    <span className="hidden flex-col leading-tight sm:flex">
      <span className="font-display text-sm font-semibold text-white">
        {PROFILE.name}
      </span>
      <span className="text-[11px] uppercase tracking-[0.18em] text-muted">
        {PROFILE.role}
      </span>
    </span>
  </button>
);

const Navbar = () => {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("hero");
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 40);
    if (latest > previous && latest > 240 && !open) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  // Active section tracking
  useEffect(() => {
    const ids = ["hero", ...NAV_ITEMS.map((n) => n.id)];
    const handler = () => {
      const mid = window.innerHeight * 0.35;
      let current = "hero";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= mid) current = id;
      }
      setActive(current);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: hidden ? -120 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <nav
          className={`mx-auto mt-3 flex max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 sm:px-6 ${
            scrolled
              ? "glass-strong shadow-soft"
              : "border border-transparent bg-transparent"
          } ${scrolled ? "mx-3 sm:mx-auto" : "mx-3 sm:mx-auto"}`}
        >
          <Logo onClick={() => scrollTo("hero")} />

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollTo(item.id)}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    active === item.id ? "text-white" : "text-muted hover:text-white"
                  }`}
                >
                  {active === item.id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full border border-white/10 bg-white/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-1 md:flex">
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
                  whileHover={{ y: -2 }}
                  className="grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:bg-white/10 hover:text-white"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </motion.a>
              ))}
            </div>

            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-xl glass text-white lg:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                {open ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>

        {/* Scroll progress bar */}
        <motion.div
          style={{ scaleX: scrollYProgress }}
          className="mx-3 mt-2 h-[3px] origin-left rounded-full bg-gradient-to-r from-accent via-accent-highlight to-accent-secondary sm:mx-auto sm:max-w-6xl"
        />
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-bg/70 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              className="absolute right-0 top-0 flex h-full w-[78%] max-w-sm flex-col gap-2 border-l border-white/10 bg-bg/95 px-6 pb-8 pt-24 backdrop-blur-2xl"
            >
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06 }}
                  onClick={() => scrollTo(item.id)}
                  className={`rounded-xl px-4 py-3 text-left text-lg font-medium transition-colors ${
                    active === item.id
                      ? "bg-white/10 text-white"
                      : "text-muted hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
              <div className="mt-auto flex items-center gap-3 pt-6">
                {[
                  { Icon: Github, href: SOCIALS.github, label: "GitHub" },
                  { Icon: Linkedin, href: SOCIALS.linkedin, label: "LinkedIn" },
                  { Icon: Twitter, href: SOCIALS.twitter, label: "Twitter" },
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid h-11 w-11 place-items-center rounded-xl glass text-white"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
