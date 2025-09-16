import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaCode, FaRocket, FaUsers, FaLightbulb } from "react-icons/fa";
import "./About.css";

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: <FaCode />,
      title: "Full-Stack Development",
      description:
        "Expert in both frontend and backend technologies, creating seamless user experiences.",
    },
    {
      icon: <FaRocket />,
      title: "Performance Optimization",
      description:
        "Specialized in building fast, scalable applications that handle high traffic efficiently.",
    },
    {
      icon: <FaUsers />,
      title: "Team Collaboration",
      description:
        "Experienced in working with cross-functional teams and mentoring junior developers.",
    },
    {
      icon: <FaLightbulb />,
      title: "Problem Solving",
      description:
        "Passionate about finding innovative solutions to complex technical challenges.",
    },
  ];

  return (
    <section className="about section" id="about">
      <div className="container">
        <motion.div
          className="section-title"
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>About Me</h2>
          <p>
            Get to know me better and understand what drives my passion for
            software development
          </p>
        </motion.div>

        <div className="about-content">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3>Who I Am</h3>
            <p>
              I'm Muhammad Awais, a passionate and experienced Software Engineer
              with a deep love for creating innovative digital solutions. With
              over 1 years of experience in the tech industry, I've had the
              privilege of working on diverse projects that have shaped my
              expertise in full-stack development.
            </p>

            <p>
              My journey in software development began with a curiosity about
              how things work on the web. This curiosity evolved into a passion
              for building applications that not only solve real-world problems
              but also provide exceptional user experiences. I believe in
              writing clean, maintainable code and staying up-to-date with the
              latest technologies and best practices.
            </p>

            <h3>What I Do</h3>
            <p>
              I specialize in building modern web applications using
              cutting-edge technologies like React, Node.js, and cloud
              platforms. My expertise spans from creating responsive user
              interfaces to designing robust backend architectures and
              implementing efficient database solutions.
            </p>

            <p>
              I'm particularly passionate about performance optimization, user
              experience design, and creating scalable solutions that can grow
              with your business needs. Every project I work on is an
              opportunity to learn, innovate, and deliver value to users.
            </p>
          </motion.div>

          <motion.div
            className="about-features"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="features-grid">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="feature-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="feature-icon">{feature.icon}</div>
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="about-stats"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="stats-grid">
            <div className="stat-item">
              <h3>1+</h3>
              <p>Years Experience</p>
            </div>
            <div className="stat-item">
              <h3>10+</h3>
              <p>Projects Completed</p>
            </div>
            <div className="stat-item">
              <h3>2+</h3>
              <p>Happy Clients</p>
            </div>
            <div className="stat-item">
              <h3>10+</h3>
              <p>Technologies</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
