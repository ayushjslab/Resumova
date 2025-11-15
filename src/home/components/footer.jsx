import React from "react";
import { FaGithub, FaInstagram, FaLinkedin, FaGlobe } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiThreads } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="relative bg-black text-gray-400 border-t border-blue-500/10 overflow-hidden">
      {/* Futuristic Glows */}
      <div className="absolute -top-10 -left-10 w-96 h-96 bg-blue-600/20 blur-[140px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[32rem] h-[32rem] bg-cyan-500/20 blur-[160px] rounded-full"></div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-16">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
              Resumova
            </h2>
            <p className="text-gray-400 mt-2 max-w-sm">
              Build modern, professional resumes with stunning templates.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-5">
              {[
                { icon: FaGithub, link: "https://github.com/ayushjslab" },
                { icon: FaInstagram, link: "https://instagram.com/ayushjslab" },
                { icon: FaXTwitter, link: "https://x.com/AyushJSLab" },
                { icon: SiThreads, link: "https://threads.net/@ayushjslab" },
                {
                  icon: FaLinkedin,
                  link: "https://www.linkedin.com/in/ayush-saini-92126a296",
                },
                { icon: FaGlobe, link: "https://ayushjslab.vercel.app/" },
              ].map(({ icon: Icon, link }, i) => (
                <a
                  key={i}
                  href={link}
                  target="_blank"
                  className="p-3 rounded-xl bg-blue-950/20 border border-blue-700/20 hover:border-blue-400 hover:bg-blue-900/30 hover:text-blue-300 transition-all duration-300 hover:scale-110"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 text-sm font-medium">
            {/* Company */}
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <a href="/about" className="hover:text-blue-400">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-blue-400">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/blog" className="hover:text-blue-400">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <a href="/privacy-policy" className="hover:text-blue-400">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-blue-400">
                    Terms
                  </a>
                </li>
              </ul>
            </div>

            {/* Explore */}
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <a href="/" className="hover:text-blue-400">
                    Portfolio
                  </a>
                </li>
                <li>
                  <a href="/dashboard" className="hover:text-blue-400">
                    Dashboard
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-blue-500/10 mt-14 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2025 Resumova. All rights reserved.</p>

          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="/privacy-policy" className="hover:text-blue-400">
              Privacy
            </a>
            <a href="/terms" className="hover:text-blue-400">
              Terms
            </a>
            <a href="/contact" className="hover:text-blue-400">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
