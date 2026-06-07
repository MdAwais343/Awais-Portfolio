import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiDjango,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiAmazonaws,
  SiVercel,
  SiCloudflare,
  SiDigitalocean,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiDocker,
  SiPostman,
  SiFigma,
  SiVisualstudiocode,
} from "react-icons/si";
import { Code2, Server, Smartphone, Database, Cloud, GitBranch, Wrench } from "lucide-react";

export const PROFILE = {
  name: "Muhammad Awais",
  role: "Software Engineer",
  photo: "/images/profile-photo.jpg",
  resume: "/resume.pdf.pdf",
  resumeFileName: "Muhammad_Awais_Resume.pdf",
  location: "Lahore, Pakistan",
  email: "awaisafzal343@gmail.com",
  phone: "+92 3080146122",
  whatsapp: "923080146122",
};

export const SOCIALS = {
  github: "https://github.com/MdAwais343",
  linkedin: "https://www.linkedin.com/in/muhammadawais343",
  twitter: "https://x.com/mhmdawys1",
};

export const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export const ROTATING_TITLES = [
  "Full Stack Developer",
  "React Developer",
  "React Native Developer",
  "Backend Developer",
];

export const STATS = [
  { value: 1, suffix: "+", label: "Years Experience" },
  { value: 10, suffix: "+", label: "Projects Completed" },
  { value: 2, suffix: "+", label: "Happy Clients" },
  { value: 17, suffix: "+", label: "Technologies" },
];

export const ABOUT_FEATURES = [
  {
    icon: Code2,
    title: "Full-Stack Development",
    description:
      "Expert across the stack — React & React Native on the front, Node, Express and Django on the back.",
  },
  {
    icon: Server,
    title: "Scalable Architecture",
    description:
      "Building fast, scalable web and mobile applications with clean, maintainable architecture.",
  },
  {
    icon: Cloud,
    title: "Cloud & Deployment",
    description:
      "Comfortable shipping to AWS, Vercel, Cloudflare and DigitalOcean with reliable workflows.",
  },
  {
    icon: GitBranch,
    title: "DevOps & CI/CD",
    description:
      "Automated pipelines with GitHub Actions and Docker for confident, repeatable releases.",
  },
];

// Brand colors used for soft glows on skill cards
export const SKILL_CATEGORIES = [
  {
    id: "frontend",
    title: "Frontend",
    icon: Code2,
    skills: [
      { name: "React.js", icon: SiReact, color: "#61DAFB", level: 92 },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", level: 92 },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6", level: 85 },
      { name: "HTML5", icon: SiHtml5, color: "#E34F26", level: 95 },
      { name: "CSS3", icon: SiCss3, color: "#1572B6", level: 92 },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4", level: 90 },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    icon: Server,
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E", level: 88 },
      { name: "Express.js", icon: SiExpress, color: "#FFFFFF", level: 86 },
      { name: "Django", icon: SiDjango, color: "#0C9D58", level: 78 },
    ],
  },
  {
    id: "mobile",
    title: "Mobile Development",
    icon: Smartphone,
    skills: [{ name: "React Native", icon: SiReact, color: "#61DAFB", level: 84 }],
  },
  {
    id: "databases",
    title: "Databases",
    icon: Database,
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", level: 82 },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248", level: 84 },
      { name: "MySQL", icon: SiMysql, color: "#4479A1", level: 80 },
    ],
  },
  {
    id: "cloud",
    title: "Cloud & Deployment",
    icon: Cloud,
    skills: [
      { name: "AWS", icon: SiAmazonaws, color: "#FF9900", level: 75 },
      { name: "Vercel", icon: SiVercel, color: "#FFFFFF", level: 90 },
      { name: "Cloudflare", icon: SiCloudflare, color: "#F38020", level: 78 },
    ],
  },
  {
    id: "devops",
    title: "DevOps & CI/CD",
    icon: GitBranch,
    skills: [
      { name: "Git", icon: SiGit, color: "#F05032", level: 90 },
      { name: "GitHub", icon: SiGithub, color: "#FFFFFF", level: 90 },
      { name: "GitHub Actions", icon: SiGithubactions, color: "#2088FF", level: 80 },
      { name: "Docker", icon: SiDocker, color: "#2496ED", level: 78 },
    ],
  },
  {
    id: "tools",
    title: "Tools & Version Control",
    icon: Wrench,
    skills: [
      { name: "Postman", icon: SiPostman, color: "#FF6C37", level: 88 },
      { name: "VS Code", icon: SiVisualstudiocode, color: "#007ACC", level: 95 },
      { name: "Figma", icon: SiFigma, color: "#F24E1E", level: 82 },
    ],
  },
];

// Marquee tech list (icon + label)
export const MARQUEE_TECH = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "React Native", icon: SiReact, color: "#61DAFB" },
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
  { name: "Express.js", icon: SiExpress, color: "#FFFFFF" },
  { name: "Django", icon: SiDjango, color: "#0C9D58" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "AWS", icon: SiAmazonaws, color: "#FF9900" },
  { name: "Vercel", icon: SiVercel, color: "#FFFFFF" },
  { name: "Cloudflare", icon: SiCloudflare, color: "#F38020" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "GitHub", icon: SiGithub, color: "#FFFFFF" },
  { name: "GitHub Actions", icon: SiGithubactions, color: "#2088FF" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
];

// Default data — used as fallback when API is unavailable (matches original behaviour)
export const DEFAULT_EXPERIENCE = [
  {
    id: 1,
    position: "Full Stack Developer",
    company: "Sortup.Dev",
    duration: "2023 - Present",
    description:
      "Leading development of enterprise applications, mentoring junior developers, and implementing best practices for scalable software solutions.",
    technologies: ["React", "Node.js", "Django", "PostgreSQL", "AWS", "CI/CD"],
  },
  {
    id: 2,
    position: "Frontend Developer",
    company: "Upwork-Freelancing",
    duration: "2025 - Present",
    description:
      "Freelancing as a frontend developer, building responsive user interfaces and optimizing application performance.",
    technologies: ["React", "JavaScript", "CSS3", "HTML5", "Git", "Tailwind CSS"],
  },
];

export const DEFAULT_EDUCATION = [
  {
    id: 1,
    degree: "Bachelor of Science in Computer Science",
    institution: "University of Okara",
    duration: "2021 - 2025",
    gpa: "3.5/4.0",
    description:
      "Graduated with honors. Specialized in software engineering and web development.",
  }
];

// Project data — content & links preserved exactly from the original site
export const DEFAULT_PROJECTS = [
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
    title: "Getir Clone",
    description:
      "Full-stack getir clone application with React, Node.js, and MongoDB. Features include user authentication, product management, shopping cart, and payment integration.",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe", "Tailwind CSS"],
    image: "/images/getir-clone.png",
    github: "https://github.com/MdAwais343/Getir-Clone",
    live: "https://getir-clone-silk.vercel.app/",
  },
  {
    id: 2,
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

