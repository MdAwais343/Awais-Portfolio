const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

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
      id: 5,
      title: "SMN Online — Enterprise News & Media Platform",
      description:
        "Scalable digital publishing ecosystem featuring real-time news delivery, multimedia content management, push notifications, and advanced administration tools. Developed and maintained production-grade features for a high-traffic news platform with live streaming and broadcasting, focusing on content management, backend services, notification workflows, and performance optimization. Worked across the full stack to deliver reliable, scalable, and user-friendly publishing experiences.",
      technologies: [
        "React",
        "Django",
        "PostgreSQL",
        "Firebase",
        "AWS",
        "CI/CD",
        "Stripe",
        "PayPal",
      ],
      image: "/images/smn-online.png",
      live: "https://smn-online.com/",
    },
    {
      id: 6,
      title: "Bitesy — Smart Food Ordering & Restaurant Platform",
      description:
        "End-to-end food ordering system with restaurant management, real-time order tracking, digital menu control, and seamless customer checkout experience. Built and contributed to a production-grade food ordering platform designed for restaurants and customers to manage orders efficiently in real time. Worked across backend APIs, order processing workflows, payment integration, and restaurant dashboard features. Focused on performance optimization, scalable architecture, and smooth user experience across web and mobile.",
      technologies: [
        "React",
        "Node.js",
        "Express",
        "PostgreSQL",
        "Firebase",
        "Stripe",
        "AWS",
        "CI/CD",
      ],
      image: "/images/bitesy.png",
      live: "https://bitesy.net/"
    },
    {
      id: 1,
      title: "Ojiyo — Smart Marketplace Platform",
      description:
        "Multi-vendor e-commerce ecosystem with social commerce, live chat, wallet, service booking, and real-time order tracking. Built and maintained a production-grade marketplace platform combining e-commerce, service booking, social engagement, and real-time communication. Contributed across the full stack, including backend APIs, payment integration, vendor management, chat systems, and scalable database architecture.",
      technologies: [
        "React Native",
        "React",
        "Node.js",
        "Express",
        "PostgreSQL",
        "Firebase",
        "Stripe",
        "AWS",
      ],
      image: "/images/ojiyo.png",
      live: "https://ojiyo.ai/",
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
    },
    {
      id: 3,
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
      live: "https://awais-portfolio-sage.vercel.app/",
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
      company: "Sortup.Dev",
      position: "Full Stack Developer",
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
      company: "Upwork-Freelancing",
      position: "Frontend Developer",
      duration: "2023 - 2025",
      description:
        "Freelancing as a frontend developer, building responsive user interfaces and optimizing application performance.",
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
    }

  ];

  res.json(education);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Portfolio server running on port ${PORT}`);
  console.log(`📧 Contact endpoint: http://localhost:${PORT}/api/contact`);
  console.log(`🔧 Health check: http://localhost:${PORT}/api/health`);
});
