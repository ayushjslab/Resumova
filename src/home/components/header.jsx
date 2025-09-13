import React, { useEffect, useState } from "react";
import { Menu, X, FileText } from "lucide-react";
import { Macondo } from "next/font/google";
import { useRouter } from "next/navigation";
import axios from "axios";
import { IS_AUTHENTICATED, LOGOUT } from "@/app/(main)/_routes/registration.routes";
import Image from "next/image";
import {ShowToast} from "@/app/(main)/_shared/show-toast"
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

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  const isAuthenticated = async () => {
    try {
      const res = await axios.get(IS_AUTHENTICATED);
      console.log(res.data)
      if (res.data.success) {
        setUser(res.data.user);
      }
    } catch (error) {
      console.log("Not authenticated", error);
    }
  };

  const logOut = async() => {
    try {
      const res = await axios.get(LOGOUT);
      if(res.data.success) {
        ShowToast(true, res.data.message)
        router.push("/auth")
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    isAuthenticated();
  }, []);

  return (
    <header className="fixed w-full top-0 z-50 bg-gradient-to-r from-black via-gray-900 to-black/95 backdrop-blur-md border-b border-blue-500/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 group cursor-pointer"
            onClick={() => router.push("/")}
          >
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-2 rounded-xl shadow-lg shadow-blue-500/40 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <span
              className={`text-4xl font-extrabold text-white tracking-wide group-hover:text-blue-400 transition-colors ${macondo.className}`}
            >
              Resumova
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-10">
            {["Features", "Contact", "Pricing", "About"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative text-gray-300 hover:text-blue-400 font-medium transition-colors group"
              >
                {item}
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-blue-500 to-blue-700 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="cursor-pointer focus:outline-0">
                      {" "}
                      <Image
                        src={user.profilePic}
                        width={100}
                        height={100}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>My Profile</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={logOut}>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <span className="text-gray-200 font-medium">{user.name}</span>
                </div>
                <button
                  className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2 rounded-full shadow-md shadow-blue-500/40 hover:from-blue-700 hover:to-blue-900 transition-all transform hover:scale-105"
                  onClick={() => router.push("/dashboard")}
                >
                  Dashboard
                </button>
              </>
            ) : (
              <>
                <button
                  className="text-gray-300 hover:text-blue-400 transition-colors cursor-pointer"
                  onClick={() => router.push("/auth")}
                >
                  Sign In
                </button>
                <button
                  className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2 rounded-full shadow-md shadow-blue-500/40 hover:from-blue-700 hover:to-blue-900 transition-all transform hover:scale-105"
                  onClick={() => router.push("/dashboard")}
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-blue-500/20 bg-black/90">
            <nav className="flex flex-col space-y-4">
              {["Features", "Contact", "Pricing", "About"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  {item}
                </a>
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
                    <button
                      onClick={() => router.push("/dashboard")}
                      className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2 rounded-full shadow-md shadow-blue-500/40 hover:from-blue-700 hover:to-blue-900 transition-all"
                    >
                      Dashboard
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => router.push("/auth")}
                      className="text-gray-300 hover:text-blue-400 transition-colors text-left"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => router.push("/dashboard")}
                      className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2 rounded-full shadow-md shadow-blue-500/40 hover:from-blue-700 hover:to-blue-900 transition-all"
                    >
                      Get Started
                    </button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
