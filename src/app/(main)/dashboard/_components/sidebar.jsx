/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  FilePlus,
  FileText,
  Heart,
  CreditCard,
  BarChart3,
  Download,
  Share2,
  Settings,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { TbTemplate } from "react-icons/tb";
import { Macondo } from "next/font/google";
import { usePathname, useRouter } from "next/navigation";

const macondo = Macondo({
  subsets: ["latin"],
  weight: ["400"],
});

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  const path = usePathname();

  // Main Navigation
  const menuItems = [
    { icon: FilePlus, tab: "create", label: "Create Resume" },
    { icon: FileText, tab: "edit", label: "Edit Resume" },
    { icon: TbTemplate, tab: "templates", label: "Templates" },
    { icon: BarChart3, tab: "analytics", label: "Analytics" },
    { icon: Download, tab: "downloads", label: "Downloads" },
    { icon: Share2, tab: "shared", label: "Shared Links" },
  ];
  return (
    <div
      className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-black via-blue-950/10 to-blue-950/30 backdrop-blur-sm border-r border-blue-800/40 text-white transition-all duration-300 ease-in-out z-50 rounded-r-2xl shadow-lg shadow-blue-900/30 ${
        isExpanded ? "w-64" : "w-20"
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Header */}
      <div className="p-4 border-b border-blue-800/40">
        <div className="flex items-center">
          <div
            className="flex items-center space-x-3"
            onClick={() => router.push("/")}
          >
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-2 rounded-xl shadow-lg shadow-blue-500/40 group-hover:scale-110 transition-transform cursor-pointer">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <span
              className={`font-bold text-4xl bg-gradient-to-r from-blue-400 to-blue-700 bg-clip-text text-transparent tracking-wide transition-all duration-300 cursor-pointer ${
                macondo.className
              } ${
                isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0"
              } overflow-hidden whitespace-nowrap`}
            >
              Resumova
            </span>
          </div>
          <button onClick={() => setIsExpanded((prev) => !prev)} className="absolute top-18 border-2 border-blue-500/40 h-8 w-8 -right-3 transform -translate-y-1/2 rounded-full p-1 bg-black/60 backdrop-blur-md transition-all duration-300 flex items-center justify-center shadow-md shadow-blue-900/50">
            {isExpanded ? (
              <ChevronLeft size={18} className="text-blue-400" />
            ) : (
              <ChevronRight size={18} className="text-blue-400" />
            )}
          </button>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 py-6">
        <ul className="space-y-1 pl-3">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = path.includes(item.tab);
            return (
              <li key={index}>
                <button
                  onClick={() => {
                    setActiveTab(item.tab);
                    router.push(`/dashboard/${item.tab}`);
                  }}
                  className={`flex items-center space-x-3 px-3 cursor-pointer py-3 rounded-l-lg group w-full text-left focus:outline-none transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600/30 to-blue-400/20 border-l-4 border-blue-400 text-blue-300"
                      : "hover:bg-gradient-to-r from-blue-600/10 to-blue-400/10 text-gray-300 hover:text-blue-300"
                  }`}
                >
                  <Icon
                    size={20}
                    className={`${isActive ? "text-blue-400" : ""}`}
                  />
                  <span
                    className={`font-medium transition-all duration-300 ${
                      isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0"
                    } overflow-hidden whitespace-nowrap`}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
