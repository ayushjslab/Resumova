"use client";

import React from "react";
import {
  Palette,
  Brain,
  Download,
  Globe,
  Lock,
  Smartphone,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Content",
    description:
      "Let our AI suggest compelling content and optimize your resume for specific jobs.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Palette,
    title: "Beautiful Templates",
    description:
      "Choose from 50+ professionally designed templates that make you stand out.",
    color: "from-indigo-500 to-blue-500",
  },
  {
    icon: Download,
    title: "Multiple Formats",
    description:
      "Download your resume in PDF, Word, or share it online with a custom URL.",
    color: "from-cyan-500 to-blue-600",
  },
  {
    icon: Globe,
    title: "ATS Optimized",
    description:
      "All templates are optimized for Applicant Tracking Systems used by employers.",
    color: "from-blue-400 to-indigo-600",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description:
      "Your data is encrypted and secure. We never share your information with third parties.",
    color: "from-cyan-500 to-teal-500",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description:
      "Build and edit your resume on any device. Our platform works seamlessly everywhere.",
    color: "from-blue-500 to-cyan-600",
  },
];

// Motion Variants
const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const Features = () => {
  return (
    <section id="features" className="relative py-24 bg-black overflow-hidden">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 max-w-7xl mx-auto px-6"
      >
        {/* Section Header */}
        <motion.div variants={fadeUp} className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Why Choose
            <span className="ml-3 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent animate-text-shimmer">
              Our Platform?
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            We've built the most advanced resume builder with{" "}
            <span className="text-cyan-400">cutting-edge features</span> to help
            you land your dream job faster than ever.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="group relative backdrop-blur-md border border-gray-800 rounded-2xl p-8 hover:shadow-xl transition-all duration-300"
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 shadow-md shadow-blue-500/30 group-hover:shadow-lg group-hover:shadow-cyan-500/50 transition-all`}
              >
                <feature.icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                {feature.description}
              </p>

              {/* Glow Hover Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl blur-xl transition-opacity`}
              ></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-10 text-center"
        >
          {[
            { value: "100K+", label: "Resumes Created" },
            { value: "95%", label: "Success Rate" },
            { value: "50+", label: "Templates" },
            { value: "24/7", label: "Support" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ scale: 1.07 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="group transition-transform duration-300"
            >
              <div className="text-4xl md:text-5xl font-extrabold text-white mb-2 group-hover:text-cyan-400 transition-colors drop-shadow-md">
                {stat.value}
              </div>
              <div className="text-gray-400 group-hover:text-gray-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Features;
