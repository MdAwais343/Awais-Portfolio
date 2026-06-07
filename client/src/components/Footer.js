import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, ArrowUp } from "lucide-react";
import { PROFILE, SOCIALS, NAV_ITEMS } from "../data/portfolio";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socials = [
    { Icon: Github, href: SOCIALS.github, label: "GitHub" },
    { Icon: Linkedin, href: SOCIALS.linkedin, label: "LinkedIn" },
    { Icon: Twitter, href: SOCIALS.twitter, label: "Twitter" },
  ];

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative border-t border-white/10 px-5 pb-10 pt-16 sm:px-8">
      <div className="shell">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-secondary font-display text-sm font-bold text-white shadow-glow">
                MA
              </span>
              <div>
                <h3 className="font-display text-base font-semibold text-white">{PROFILE.name}</h3>
                <p className="text-xs text-muted">Software Engineer & Full-Stack Developer</p>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-sm text-muted">
              Building scalable web and mobile applications with modern technologies and a strong
              focus on detail.
            </p>
          </div>

          {/* Quick links */}
          <div className="md:justify-self-center">
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white/80">
              Quick Links
            </h4>
            <ul className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-sm text-muted transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="md:justify-self-end">
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white/80">
              Connect With Me
            </h4>
            <div className="mt-4 flex items-center gap-3">
              {socials.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="grid h-11 w-11 place-items-center rounded-xl glass text-white/80 transition-colors hover:text-white"
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="flex items-center gap-1.5 text-sm text-muted">
            © {currentYear} {PROFILE.name}. All rights reserved.          </p>
          <button
            onClick={scrollTop}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm text-muted transition-colors hover:text-white"
          >
            Back to top
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
