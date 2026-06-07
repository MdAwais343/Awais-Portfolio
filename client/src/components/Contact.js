import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Github, Linkedin, MessageCircle, Send, CheckCircle2, AlertCircle } from "lucide-react";
import api from "../api/client";
import { PROFILE, SOCIALS } from "../data/portfolio";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

const Field = ({ label, name, type = "text", value, onChange, required, placeholder, textarea }) => (
  <label className="group block">
    <span className="mb-2 block text-sm font-medium text-white/80">
      {label}
      {required && <span className="text-accent-highlight"> *</span>}
    </span>
    {textarea ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={5}
        placeholder={placeholder}
        className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-muted/60 outline-none transition-all duration-300 focus:border-accent/60 focus:bg-white/[0.06] focus:shadow-[0_0_0_3px_rgba(79,140,255,0.15)]"
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-muted/60 outline-none transition-all duration-300 focus:border-accent/60 focus:bg-white/[0.06] focus:shadow-[0_0_0_3px_rgba(79,140,255,0.15)]"
      />
    )}
  </label>
);

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus(null);
    try {
      const response = await api.post("/api/contact", formData);
      if (response.data.success) {
        setSubmitStatus({ type: "success", message: response.data.message });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitStatus({ type: "error", message: response.data.message });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Failed to send message. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: PROFILE.email,
      href: `mailto:${PROFILE.email}`,
      color: "#4F8CFF",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "in/muhammadawais343",
      href: SOCIALS.linkedin,
      color: "#0A66C2",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "MdAwais343",
      href: SOCIALS.github,
      color: "#FFFFFF",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: PROFILE.phone,
      href: `https://wa.me/${PROFILE.whatsapp}`,
      color: "#25D366",
    },
    {
      icon: MapPin,
      label: "Location",
      value: PROFILE.location,
      href: null,
      color: "#00D4FF",
    },
  ];

  return (
    <section id="contact" className="section-pad">
      <div className="shell">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something together"
          subtitle="Have a project in mind or just want to say hello? My inbox is always open."
        />

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Contact info */}
          <Reveal direction="right">
            <div className="flex h-full flex-col rounded-3xl glass p-8">
              <h3 className="font-display text-2xl font-semibold text-white">Get in touch</h3>
              <p className="mt-3 text-sm text-muted">
                I'm always interested in new opportunities and exciting projects. Reach out through
                any of the channels below.
              </p>

              <div className="mt-8 flex flex-col gap-3">
                {contactMethods.map((method, i) => {
                  const Icon = method.icon;
                  const inner = (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors duration-300 hover:border-white/20"
                    >
                      <span
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/5 ring-1 ring-inset ring-white/10"
                        style={{ color: method.color }}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs uppercase tracking-wider text-muted">{method.label}</p>
                        <p className="truncate text-sm font-medium text-white">{method.value}</p>
                      </div>
                    </motion.div>
                  );
                  return method.href ? (
                    <a
                      key={method.label}
                      href={method.href}
                      target={method.href.startsWith("http") ? "_blank" : undefined}
                      rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div key={method.label}>{inner}</div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal direction="left">
            <form onSubmit={handleSubmit} className="rounded-3xl glass p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>
              <div className="mt-5">
                <Field
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                />
              </div>
              <div className="mt-5">
                <Field
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell me about your project or just say hello!"
                  textarea
                />
              </div>

              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-5 flex items-center gap-2 rounded-xl border px-4 py-3 text-sm ${
                    submitStatus.type === "success"
                      ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                      : "border-red-400/30 bg-red-400/10 text-red-300"
                  }`}
                >
                  {submitStatus.type === "success" ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                  ) : (
                    <AlertCircle className="h-4 w-4 shrink-0" />
                  )}
                  {submitStatus.message}
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-secondary px-7 py-3.5 text-sm font-semibold text-white shadow-glow transition-shadow hover:shadow-glow-lg disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
