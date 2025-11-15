"use client";

import React, { useEffect, useState } from "react";
import { Menu, X, FileText } from "lucide-react";
import { Macondo } from "next/font/google";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  IS_AUTHENTICATED,
  LOGOUT,
} from "@/app/(main)/_routes/registration.routes";
import { ShowToast } from "@/app/(main)/_shared/show-toast";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const macondo = Macondo({
  subsets: ["latin"],
  weight: ["400"],
});

const fadeDown = {
  hidden: { opacity: 0, y: -20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const staggerNav = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  const isAuthenticated = async () => {
    try {
      const res = await axios.get(IS_AUTHENTICATED);
      if (res.data.success) {
        setUser(res.data.user);
      }
    } catch (error) {
      console.log("Not authenticated", error);
    }
  };

  const logOut = async () => {
    try {
      const res = await axios.get(LOGOUT);
      if (res.data.success) {
        ShowToast(true, res.data.message);
        router.push("/auth");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    isAuthenticated();
  }, []);

  return (
    <motion.header
      variants={fadeDown}
      initial="hidden"
      animate="show"
      className="fixed w-full top-0 z-50 bg-gradient-to-r from-black via-gray-900/60 to-black/95 backdrop-blur-md  shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-gradient-to-r from-blue-500 to-blue-700 p-2 rounded-xl shadow-lg shadow-blue-500/40"
            >
              <FileText className="w-6 h-6 text-white" />
            </motion.div>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`text-4xl font-extrabold text-white tracking-wide ${macondo.className}`}
            >
              Resumova
            </motion.span>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            className="hidden lg:flex items-center space-x-10"
            variants={staggerNav}
            initial="hidden"
            animate="show"
          >
            {["Features", "Contact", "Pricing", "About"].map((item) => (
              <motion.a
                variants={fadeUp}
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative text-gray-300 hover:text-blue-400 font-medium transition-colors group"
              >
                {item}
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-blue-500 to-blue-700 transition-all group-hover:w-full"></span>
              </motion.a>
            ))}
          </motion.nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="cursor-pointer">
                      <motion.div whileHover={{ scale: 1.1 }}>
                        <Image
                          src={user.profilePic}
                          width={100}
                          height={100}
                          alt="Profile"
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      </motion.div>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent asChild>
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <DropdownMenuLabel>My Profile</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={logOut}>
                          Logout
                        </DropdownMenuItem>
                      </motion.div>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <span className="text-gray-200 font-medium">{user.name}</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2 rounded-full shadow-md shadow-blue-500/40 transition-all"
                  onClick={() => router.push("/dashboard")}
                >
                  Dashboard
                </motion.button>
              </>
            ) : (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => router.push("/auth")}
                  className="text-gray-300 hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Sign In
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push("/dashboard")}
                  className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2 rounded-full shadow-md shadow-blue-500/40 transition-all"
                >
                  Get Started
                </motion.button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden py-4 border-t border-blue-500/20 bg-black/90"
            >
              <nav className="flex flex-col space-y-4">
                {["Features", "Contact", "Pricing", "About"].map((item) => (
                  <motion.a
                    key={item}
                    whileHover={{ x: 5 }}
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    {item}
                  </motion.a>
                ))}

                <div className="flex flex-col space-y-2 pt-4">
                  {user ? (
                    <>
                      <div className="flex items-center space-x-2">
                        <Image
                          src={user.profilePic}
                          width={100}
                          height={100}
                          alt="Profile"
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="text-gray-200">{user.name}</span>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => router.push("/dashboard")}
                        className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2 rounded-full shadow-md shadow-blue-500/40 transition-all"
                      >
                        Dashboard
                      </motion.button>
                    </>
                  ) : (
                    <>
                      <motion.button
                        whileHover={{ x: 5 }}
                        onClick={() => router.push("/auth")}
                        className="text-gray-300 hover:text-blue-400 transition-colors text-left"
                      >
                        Sign In
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => router.push("/dashboard")}
                        className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2 rounded-full shadow-md shadow-blue-500/40 transition-all"
                      >
                        Get Started
                      </motion.button>
                    </>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
