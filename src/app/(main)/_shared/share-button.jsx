"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Share2,
  X,
  Copy,
  CheckCircle2,
  Facebook,
  Linkedin,
  Twitter,
  Mail,
  Pin,
  User,
  FileText,
} from "lucide-react";
import { FaTelegramPlane, FaWhatsapp, FaRedditAlien } from "react-icons/fa";

const ShareButton = ({
  url = typeof window !== "undefined" ? window.location.href : "",
  title = typeof document !== "undefined" ? document.title : "Shared Page",
  description = "Check this out!",
  resumeLink = "",
  websiteName = "My Portfolio",
  personalName = "Professional",
  customMessage = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef(null);

  // Create enhanced share content
  const createShareContent = (platform) => {
    const baseContent = customMessage || `${personalName}'s ${websiteName}`;
    const resumeText = resumeLink ? `📄 Resume: ${resumeLink}` : "";
    const websiteText = `🌐 Website: ${url}`;
    
    let shareContent = "";
    
    switch (platform) {
      case "professional": // LinkedIn, Email
        shareContent = `${baseContent}\n\n${resumeText ? resumeText + '\n' : ''}${websiteText}`;
        break;
      case "casual": // WhatsApp, Telegram, Twitter
        shareContent = `${baseContent} ${resumeText ? '📄 ' + resumeLink + ' ' : ''}🌐 ${url}`;
        break;
      case "formal": // Facebook, Reddit
        shareContent = `${baseContent}\n${resumeText ? resumeText + '\n' : ''}${websiteText}`;
        break;
      default:
        shareContent = `${baseContent} ${url}`;
    }
    
    return encodeURIComponent(shareContent);
  };

  const shareUrl = encodeURIComponent(url);
  const shareTitle = encodeURIComponent(title);

  const platforms = [
    {
      name: "WhatsApp",
      icon: <FaWhatsapp size={18} />,
      color: "bg-green-600 hover:bg-green-700",
      url: `https://wa.me/?text=${createShareContent("casual")}`,
      category: "instant"
    },
    {
      name: "Telegram",
      icon: <FaTelegramPlane size={18} />,
      color: "bg-cyan-500 hover:bg-cyan-600",
      url: `https://t.me/share/url?url=${shareUrl}&text=${createShareContent("casual")}`,
      category: "instant"
    },
    {
      name: "LinkedIn",
      icon: <Linkedin size={18} />,
      color: "bg-sky-700 hover:bg-sky-800",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}&summary=${createShareContent("professional")}`,
      category: "professional"
    },
    {
      name: "Twitter",
      icon: <Twitter size={18} />,
      color: "bg-blue-400 hover:bg-blue-500",
      url: `https://twitter.com/intent/tweet?text=${createShareContent("casual")}`,
      category: "social"
    },
    {
      name: "Email",
      icon: <Mail size={18} />,
      color: "bg-gray-600 hover:bg-gray-700",
      url: `mailto:?subject=${encodeURIComponent(`${personalName} - ${websiteName}`)}&body=${createShareContent("professional")}`,
      category: "professional"
    },
    {
      name: "Facebook",
      icon: <Facebook size={18} />,
      color: "bg-blue-700 hover:bg-blue-800",
      url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${createShareContent("formal")}`,
      category: "social"
    },
    {
      name: "Reddit",
      icon: <FaRedditAlien size={18} />,
      color: "bg-orange-600 hover:bg-orange-700",
      url: `https://reddit.com/submit?url=${shareUrl}&title=${createShareContent("formal")}`,
      category: "social"
    },
    {
      name: "Pinterest",
      icon: <Pin size={18} />,
      color: "bg-red-600 hover:bg-red-700",
      url: `https://pinterest.com/pin/create/button/?url=${shareUrl}&description=${createShareContent("formal")}`,
      category: "social"
    },
  ];

  const handleShare = (platform) => {
    window.open(platform.url, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  const copyToClipboard = async () => {
    try {
      const fullContent = `${personalName}'s ${websiteName}\n${resumeLink ? '📄 Resume: ' + resumeLink + '\n' : ''}🌐 Website: ${url}`;
      await navigator.clipboard.writeText(fullContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const professionalPlatforms = platforms.filter(p => p.category === "professional");
  const socialPlatforms = platforms.filter(p => p.category === "social" || p.category === "instant");

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
      >
        <Share2 size={18} />
        Share Profile
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-96 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl shadow-2xl border border-blue-800 z-50 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Share Your Profile
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-slate-700"
            >
              <X size={20} />
            </button>
          </div>

          {/* Profile Preview */}
          <div className="mb-6 p-4 bg-slate-800 rounded-lg border border-slate-700">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <User size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-blue-300">{personalName}</h4>
                <p className="text-sm text-gray-300 mb-2">{websiteName}</p>
                <div className="space-y-1">
                  {resumeLink && (
                    <div className="flex items-center gap-2 text-xs text-green-400">
                      <FileText size={14} />
                      <span>Resume included</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-xs text-blue-400">
                    <Share2 size={14} />
                    <span>Website link included</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Platforms */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-blue-300 mb-2 flex items-center gap-2">
              <Linkedin size={14} />
              Professional Networks
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {professionalPlatforms.map((platform) => (
                <button
                  key={platform.name}
                  onClick={() => handleShare(platform)}
                  className={`flex items-center gap-2 p-3 text-sm rounded-lg transition-all font-medium transform hover:scale-105 ${platform.color}`}
                >
                  {platform.icon}
                  {platform.name}
                </button>
              ))}
            </div>
          </div>

          {/* Social Platforms */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-purple-300 mb-2 flex items-center gap-2">
              <Share2 size={14} />
              Social & Messaging
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {socialPlatforms.map((platform) => (
                <button
                  key={platform.name}
                  onClick={() => handleShare(platform)}
                  className={`flex flex-col items-center gap-1 p-2 text-xs rounded-lg transition-all font-medium transform hover:scale-105 ${platform.color}`}
                >
                  {platform.icon}
                  {platform.name}
                </button>
              ))}
            </div>
          </div>

          {/* Copy Link Section */}
          <div className="border-t border-slate-700 pt-4">
            <h4 className="text-sm font-semibold text-gray-300 mb-2">
              Copy Complete Profile
            </h4>
            <div className="flex items-center gap-2 p-3 bg-slate-800 rounded-lg border border-slate-600">
              <div className="flex-1 text-sm text-gray-300">
                <div className="font-medium text-blue-300">
                  {personalName}'s {websiteName}
                </div>
                {resumeLink && (
                  <div className="text-xs text-green-400">
                    📄 Resume included
                  </div>
                )}
                <div className="text-xs text-blue-400">🌐 Website included</div>
              </div>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
              >
                {copied ? (
                  <>
                    <CheckCircle2 size={14} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    Copy All
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareButton;