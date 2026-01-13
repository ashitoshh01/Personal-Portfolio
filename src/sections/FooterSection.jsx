import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

const FooterSection = () => {
  return (
    <section id="footer" className="bg-[#050505] text-white py-20 px-5 md:px-10">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Header */}
        <h1 className="text-5xl md:text-8xl font-bold text-center tracking-tighter uppercase font-['Antonio'] md:mb-20 mb-10 text-[#F2F0E9]">
          Let's build something together
        </h1>

        <div className="grid lg:grid-cols-3 gap-10">

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-[#1A1A1A] rounded-3xl p-8 md:p-12 border border-white/5">
            <p className="text-gray-400 mb-8 text-lg">
              Tell me about your idea, project or collab. I usually reply within <span className="text-white font-semibold">24 hours</span>.
            </p>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 ml-1">Name</label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    className="w-full bg-[#262626] border border-white/5 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all placeholder:text-gray-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 ml-1">Email</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full bg-[#262626] border border-white/5 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all placeholder:text-gray-600"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400 ml-1">Subject</label>
                <input
                  type="text"
                  placeholder="What's this about?"
                  className="w-full bg-[#262626] border border-white/5 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all placeholder:text-gray-600"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400 ml-1">Project budget (optional)</label>
                <div className="relative">
                  <select className="w-full bg-[#262626] border border-white/5 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all text-gray-400 appearance-none cursor-pointer">
                    <option>Select a range</option>
                    <option>$500 - $1k</option>
                    <option>$1k - $5k</option>
                    <option>$5k - $10k</option>
                    <option>$10k+</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                    ▼
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400 ml-1">Message</label>
                <textarea
                  rows={5}
                  placeholder="Share your idea, goals, and timeline..."
                  className="w-full bg-[#262626] border border-white/5 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all placeholder:text-gray-600 resize-none"
                />
              </div>

              <button className="w-full bg-white text-black font-bold text-lg py-4 rounded-full hover:bg-gray-200 transition-colors mt-4">
                SEND MESSAGE
              </button>
            </form>
          </div>

          {/* Side Info */}
          <div className="space-y-6">

            {/* Quick Info Card */}
            <div className="bg-[#1A1A1A] rounded-3xl p-8 border border-white/5">
              <h3 className="text-xl font-semibold mb-6 text-gray-200">Quick info</h3>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                  <span>Based in India, working with clients worldwide</span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowUpRight className="w-5 h-5 text-gray-500 mt-0.5" />
                  <span>Open for freelance, collabs & internships</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg leading-none">⚡</span>
                  <span>Full-stack, apps, UI/UX & interactive experiences</span>
                </li>
              </ul>
            </div>

            {/* Direct Contact Card */}
            <div className="bg-[#1A1A1A] rounded-3xl p-8 border border-white/5">
              <h3 className="text-xl font-semibold mb-6 text-gray-200">Direct contact</h3>
              <div className="space-y-4">
                <a href="mailto:aniketsingh821305@gmail.com" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                  aniketsingh821305@gmail.com
                </a>
                <a href="tel:+919117901046" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                  <Phone className="w-5 h-5" />
                  +91 91179 01046
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 pt-10 border-t border-white/5">
          <p>Copyright © 2025 Luohino - All Rights Reserved</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FooterSection;
