import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <FaGithub />,
      name: "GitHub",
      url: "https://github.com/MdAwais343",
      color: "#333",
    },
    {
      icon: <FaLinkedin />,
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/muhammadawais343",
      color: "#0077b5",
    },
    {
      icon: <FaTwitter />,
      name: "Twitter",
      url: "https://x.com/mhmdawys1",
      color: "#1da1f2",
    },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <motion.div
            className="footer-brand"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="footer-logo-container">
              <svg viewBox="0 0 32 32" className="footer-logo-svg">
                <defs>
                  <linearGradient
                    id="footerGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: "#667eea", stopOpacity: 1 }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: "#764ba2", stopOpacity: 1 }}
                    />
                  </linearGradient>
                </defs>
                <circle
                  cx="16"
                  cy="16"
                  r="15"
                  fill="url(#footerGradient)"
                  stroke="url(#footerGradient)"
                  strokeWidth="1"
                />
                <g fill="white">
                  <path d="M6 24V8h3l3 8 3-8h3v16h-2V12l-3 8-3-8v12H6z" />
                  <path d="M20 8h3l4 12h-2l-1-3h-4l-1 3h-2L20 8zm1 2l-2.5 7h5L21 10z" />
                </g>
              </svg>
              <div className="footer-logo-text">
                <h3>Muhammad Awais</h3>
                <p>Software Engineer & Full-Stack Developer</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="footer-social"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4>Connect With Me</h4>
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  style={{ "--social-color": social.color }}
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="footer-links"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#skills">Skills</a>
              </li>
              <li>
                <a href="#projects">Projects</a>
              </li>
              <li>
                <a href="#experience">Experience</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="footer-line"></div>
          <p>
            © {currentYear} Muhammad Awais. Made with{" "}
            <FaHeart className="heart-icon" />
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
