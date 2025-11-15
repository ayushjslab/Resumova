"use client";

import React from "react";
import { ArrowRight, Star, Zap, Shield, Rocket } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerParent = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const Hero = () => {
  const router = useRouter();

  return (
    <section className="relative flex items-center justify-center overflow-hidden py-20 md:py-32 lg:py-40">
      <motion.div
        initial="hidden"
        animate="show"
        variants={staggerParent}
        className="relative z-10 max-w-7xl mx-auto px-6 text-center"
      >
        {/* Badge */}
        <motion.div
          variants={fadeUp}
          className="inline-flex items-center px-5 py-2 bg-black/40 backdrop-blur-md border border-blue-500/30 rounded-full mb-8 shadow-md shadow-blue-500/20"
        >
          <Star className="w-4 h-4 text-yellow-400 mr-2 animate-pulse" />
          <span className="text-sm text-gray-300">
            Trusted by{" "}
            <span className="text-blue-400 font-semibold">100K+</span>{" "}
            professionals
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg"
        >
          Build Your{" "}
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent animate-text-shimmer">
            Dream Resume
          </span>{" "}
          in Minutes
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={fadeUp}
          className="text-lg md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Create stunning, professional resumes with our{" "}
          <span className="text-blue-400 font-semibold">
            AI-powered builder
          </span>
          . Stand out from the crowd and land your dream job faster{" "}
          <span className="inline-flex items-center text-blue-400">
            <Rocket className="w-6 h-6 ml-1" />
          </span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-20"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/dashboard/create")}
            className="group bg-gradient-to-r from-blue-600 to-cyan-600 cursor-pointer text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg shadow-blue-500/40 hover:from-blue-700 hover:to-cyan-700 transition-all"
          >
            Start Building Free
            <ArrowRight className="inline ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/dashboard/templates")}
            className="px-10 py-4 cursor-pointer border-2 border-gray-700 text-gray-300 rounded-full text-lg font-semibold hover:border-blue-400 hover:text-white hover:shadow-md hover:shadow-blue-500/30 transition-all"
          >
            View Templates
          </motion.button>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          variants={fadeUp}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto"
        >
          {/* 1 */}
          <motion.div
            variants={scaleIn}
            className="flex items-center justify-center space-x-4"
          >
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-full shadow-md shadow-blue-500/40">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold text-white">5 Min</div>
              <div className="text-gray-400">Quick Setup</div>
            </div>
          </motion.div>

          {/* 2 */}
          <motion.div
            variants={scaleIn}
            className="flex items-center justify-center space-x-4"
          >
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-full shadow-md shadow-blue-500/40">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold text-white">ATS</div>
              <div className="text-gray-400">Optimized</div>
            </div>
          </motion.div>

          {/* 3 */}
          <motion.div
            variants={scaleIn}
            className="flex items-center justify-center space-x-4"
          >
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 rounded-full shadow-md shadow-blue-500/40">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold text-white">4.9/5</div>
              <div className="text-gray-400">Rating</div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
