const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan("combined"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Serve static files from client public directory
app.use(express.static(path.join(__dirname, "../client/public")));

// Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Portfolio server is running" });
});

// Contact form endpoint
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email, and message",
      });
    }

    // Email configuration (you'll need to set up your email credentials)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "your-email@gmail.com",
        pass: process.env.EMAIL_PASS || "your-app-password",
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER || "your-email@gmail.com",
      to: process.env.EMAIL_USER || "your-email@gmail.com",
      subject: `Portfolio Contact: ${subject || "New Message"}`,
      html: `
        <h3>New Contact Message from Portfolio</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || "No subject"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: "Message sent successfully! I will get back to you soon.",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again later.",
    });
  }
});

// Projects data endpoint
app.get("/api/projects", (req, res) => {
  const projects = [
    {
      id: 1,
      title: "Getir Clone",
      description:
        "Full-stack getir clone application with React, Node.js, and MongoDB. Features include user authentication, product management, shopping cart, and payment integration.",
      technologies: [
        "React",
        "Node.js",
        "MongoDB",
        "Express",
        "Stripe",
        "Tailwind CSS",
      ],
      image: "/images/getir-clone.png",
      github: "https://github.com/MdAwais343/Getir-Clone",
      live: "https://getir-clone-silk.vercel.app/",
      featured: true,
    },
    {
      id: 2,
      title: "NewsUpdate",
      description:
        "NewsUpdate is a news application that allows you to read news from different sources.",
      technologies: [
        "React",
        "Node.js",
        "MongoDB",
        "NewsAPI",
        "Express",
        "Tailwind CSS",
        "React Icons",
        "React Router",
        "React Icons",
      ],
      image: "/images/NewsUpdate.png",
      github: "https://github.com/MdAwais343/NewsUpdate",
      live: "https://news-update-mauve.vercel.app/",
      featured: true,
    },
    {
      id: 3,
      title: "TextStruct App",
      description:
        "Real-time text structure application with text analysis, text summarization, and text generation.",
      technologies: [
        "React",
        "Chart.js",
        "TextSummarization API",
        "CSS3",
        "Responsive Design",
        "Tailwind CSS",
        "Framer Motion",
      ],
      image: "/images/TextStruct.png",
      github: "https://github.com/MdAwais343/textstruct",
      live: "https://textstruct308.vercel.app/",
      featured: false,
    },
    {
      id: 4,
      title: "Portfolio Website",
      description:
        "Personal portfolio website built with modern web technologies and responsive design.",
      technologies: [
        "React",
        "Node.js",
        "Express",
        "CSS3",
        "Responsive Design",
        "Tailwind CSS",
        "Framer Motion",
      ],
      image: "/images/Portfolio.png",
      github: "https://github.com/MdAwais343/Awais-Portfolio",
      live: "https://muhammad-awais.com",
      featured: false,
    },
  ];

  res.json(projects);
});

// Skills data endpoint
app.get("/api/skills", (req, res) => {
  const skills = {
    frontend: [
      { name: "React", level: 90 },
      { name: "JavaScript", level: 95 },
      { name: "TypeScript", level: 85 },
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 90 },
      { name: "Redux", level: 85 },
    ],
    backend: [
      { name: "Node.js", level: 90 },
      { name: "Express", level: 90 },
      { name: "MongoDB", level: 80 },
    ],
    tools: [
      { name: "Git", level: 90 },
      { name: "AWS", level: 70 },
    ],
  };

  res.json(skills);
});

// Experience data endpoint
app.get("/api/experience", (req, res) => {
  const experience = [
    {
      id: 1,
      company: "SortUP Inc.",
      position: "Frontend Software Engineer",
      duration: "2025 - Present",
      description:
        "Leading development of enterprise applications, mentoring junior developers, and implementing best practices for scalable software solutions.",
      technologies: ["React", "JavaScript", "CSS3", "HTML5", "Git"],
    },
    // {
    //   id: 2,
    //   company: "Digital Innovations",
    //   position: "Full Stack Developer",
    //   duration: "2020 - 2022",
    //   description:
    //     "Developed and maintained multiple web applications, collaborated with cross-functional teams, and delivered high-quality software products.",
    //   technologies: ["React", "Node.js", "MongoDB", "Express", "Redux"],
    // },
    {
      id: 2,
      company: "StartupXYZ",
      position: "Frontend Developer",
      duration: "2023 - 2025",
      description:
        "Built responsive user interfaces, optimized application performance, and worked closely with designers to implement pixel-perfect designs.",
      technologies: ["React", "JavaScript", "CSS3", "HTML5", "Git"],
    },
  ];

  res.json(experience);
});

// Education data endpoint
app.get("/api/education", (req, res) => {
  const education = [
    {
      id: 1,
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Okara",
      duration: "2021 - 2025",
      description:
        "Graduated with honors. Specialized in software engineering and web development.",
      gpa: "3.5/4.0",
    },
    {
      id: 2,
      degree: "Full Stack Web Development",
      institution: "Coursera",
      duration: "2022",
      description:
        "Intensive 12-week program covering modern web development technologies and best practices.",
      gpa: "N/A",
    },
  ];

  res.json(education);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Portfolio server running on port ${PORT}`);
  console.log(`📧 Contact endpoint: http://localhost:${PORT}/api/contact`);
  console.log(`🔧 Health check: http://localhost:${PORT}/api/health`);
});
