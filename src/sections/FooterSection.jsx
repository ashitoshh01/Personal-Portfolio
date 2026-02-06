import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

const FooterSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section id="footer" className="bg-[#050505] text-white py-20 px-5 md:px-10">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Header */}
        <h1 className="text-5xl md:text-8xl font-bold text-center tracking-tighter uppercase font-['Antonio'] md:mb-20 mb-10 text-[#F2F0E9]">
          Let's build something together
        </h1>

        <div className="flex flex-col items-center gap-10 max-w-4xl mx-auto w-full">

          {/* Quick Info Card */}
          <div className="w-full bg-[#1A1A1A] rounded-3xl p-8 border border-white/5 relative z-10 shadow-xl">
            <h3 className="text-xl font-semibold mb-6 text-gray-200 text-center">Quick info</h3>
            <ul className="space-y-4 text-gray-400 flex flex-col items-center md:items-start md:grid md:grid-cols-3 md:gap-4 md:space-y-0">
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                <span>Passionate about Technology & Innovation</span>
              </li>
              <li className="flex items-center gap-3">
                <ArrowUpRight className="w-5 h-5 text-gray-500 mt-0.5" />
                <span>Open for Collabs & Internships</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-lg leading-none">⚡</span>
                <span>Full-Stack, UI/UX & Interactive Experiences</span>
              </li>
            </ul>
          </div>

          {/* Contact Form */}
          <div className="w-full bg-[#1A1A1A] rounded-3xl p-8 md:p-12 border border-white/5">
            <p className="text-gray-400 mb-8 text-lg text-center">
              Tell me about your idea, project or collab. I usually reply within <span className="text-white font-semibold">24 hours</span>.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 ml-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                    className="w-full bg-[#262626] border border-white/5 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all placeholder:text-gray-600 outline-none text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 ml-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="w-full bg-[#262626] border border-white/5 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all placeholder:text-gray-600 outline-none text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400 ml-1">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What's this about?"
                  className="w-full bg-[#262626] border border-white/5 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all placeholder:text-gray-600 outline-none text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400 ml-1">Message</label>
                <textarea
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Share your idea, goals, and timeline..."
                  className="w-full bg-[#262626] border border-white/5 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all placeholder:text-gray-600 resize-none outline-none text-white"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black font-bold text-lg py-4 rounded-full hover:bg-gray-200 transition-colors mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
              </button>
              {submitStatus === "success" && (
                <p className="text-green-500 text-center mt-2">Message sent successfully!</p>
              )}
              {submitStatus === "error" && (
                <p className="text-red-500 text-center mt-2">Failed to send message. Please try again.</p>
              )}
            </form>
          </div>

          {/* Direct Contact Card */}
          <div className="w-full bg-[#1A1A1A] rounded-3xl p-8 border border-white/5">
            <h3 className="text-xl font-semibold mb-6 text-gray-200 text-center">Direct contact</h3>
            <div className="flex flex-col md:flex-row justify-center gap-8">
              <a href="mailto:ashitoshlavhate2@gmail.com" className="flex items-center justify-center gap-3 text-gray-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
                ashitoshlavhate2@gmail.com
              </a>
              <a href="tel:+919518352166" className="flex items-center justify-center gap-3 text-gray-400 hover:text-white transition-colors">
                <Phone className="w-5 h-5" />
                +91 9518352166
              </a>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 pt-10 border-t border-white/5">
          <p>Copyright © 2026 Ashitosh - All Rights Reserved</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </section >
  );
};

export default FooterSection;
