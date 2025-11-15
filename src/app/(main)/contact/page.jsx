import React from "react";
import { Mail, Phone, Globe, Home } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin, FaGlobe } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiThreads } from "react-icons/si";

export default function ContactPage() {
  return (
    <main className="min-h-screen  text-white px-6 py-20 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/20">
        <h1 className="text-4xl font-bold text-center mb-8 flex items-center justify-center gap-3">
          <a href="/" className="hover:text-blue-500 transition">
            <Home className="w-8 h-8" />
          </a>
          <span>|</span>
          <span>Get in Touch</span>
        </h1>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Mail className="w-7 h-7 text-blue-400" />
              <p className="text-lg">ayush.jslab@gmail.com</p>
            </div>

            <div className="flex items-center space-x-4">
              <Phone className="w-7 h-7 text-blue-400" />
              <p className="text-lg">+91 8824415430</p>
            </div>

            <div className="flex items-center space-x-4">
              <Globe className="w-7 h-7 text-blue-400" />
              <p className="text-lg">ayushjslab.com (portfolio)</p>
            </div>

            <h2 className="text-2xl font-semibold mt-6">Social Links</h2>
            <div className="flex flex-wrap gap-4 text-xl">
              <a
                href="https://github.com/ayushjslab"
                target="_blank"
                className="hover:text-blue-400 transition"
              >
                {" "}
                <FaGithub />{" "}
              </a>
              <a
                href="https://instagram.com/ayushjslab"
                target="_blank"
                className="hover:text-blue-400 transition"
              >
                {" "}
                <FaInstagram />{" "}
              </a>
              <a
                href="https://x.com/ayushjslab"
                target="_blank"
                className="hover:text-blue-400 transition"
              >
                {" "}
                <FaXTwitter />{" "}
              </a>
              <a
                href="https://threads.net/@ayushjslab"
                target="_blank"
                className="hover:text-blue-400 transition"
              >
                {" "}
                <SiThreads />{" "}
              </a>
              <a
                href="https://linkedin.com/in/ayushjslab"
                target="_blank"
                className="hover:text-blue-400 transition"
              >
                {" "}
                <FaLinkedin />{" "}
              </a>
              <a
                href="https://ayushjslab.com"
                target="_blank"
                className="hover:text-blue-400 transition"
              >
                {" "}
                <FaGlobe />{" "}
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <form className="space-y-6 bg-white/5 p-6 rounded-2xl border border-white/10">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:border-blue-400"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:border-blue-400"
            />
            <textarea
              placeholder="Your Message"
              rows="5"
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:border-blue-400"
            ></textarea>
            <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 transition rounded-xl text-white font-semibold shadow-lg">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
