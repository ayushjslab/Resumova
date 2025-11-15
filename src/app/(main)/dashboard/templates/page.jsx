  "use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import useResumeStore from "@/store/resumeStore";
import { fakeData1 } from "../../../../lib/fakeData";
import "./html.css";

const TemplateForViews = [
  { name: "Template1", displayName: "Modern Layout" },
  { name: "Template2", displayName: "Minimalist Design" },
  { name: "Template3", displayName: "Corporate Theme" },
  { name: "Template4", displayName: "Creative Portfolio" },
  { name: "Template5", displayName: "Blog Layout" },
  { name: "Template6", displayName: "E-commerce" },
  { name: "Template7", displayName: "Landing Page" },
  { name: "Template8", displayName: "Dashboard" },
  { name: "Template9", displayName: "Magazine Style" },
  { name: "Template10", displayName: "Photography" },
  { name: "Template11", displayName: "Clubs Pro" },
  { name: "Template12", displayName: "Business Pro" },
  { name: "Template13", displayName: "Tech Startup" },
  { name: "Template14", displayName: "Agency" },
  { name: "Template15", displayName: "Restaurant" },
  { name: "Template16", displayName: "Fashion" },
  { name: "Template17", displayName: "Education" },
  { name: "Template18", displayName: "Healthcare" },
  { name: "Template19", displayName: "Real Estate" },
  { name: "Template20", displayName: "Music & Arts" },
];

const TemplatesPage = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { setResume } = useResumeStore();

  // ✅ only run once on mount
  useEffect(() => {
    setResume(fakeData1);
  }, [setResume]);

  const selectedTemplateName = TemplateForViews[selectedIndex].name;

  // ✅ dynamic import only loads the chosen template
  const SelectedTemplate = dynamic(
    () => import(`../../../../_templates/${selectedTemplateName}`),
    { ssr: false, loading: () => <p className="text-gray-400">Loading...</p> }
  );

  const handleTemplateSelect = (index) => setSelectedIndex(index);

  return (
    <div className="bg-black text-white grid grid-cols-1 lg:grid-cols-3 ml-22">
      {/* Template Selector */}
      <div className="border-r border-gray-800 bg-black col-span-1">

        <div className="p-4 max-h-screen overflow-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-900">
          <div className="space-y-2">
            {TemplateForViews.map((item, index) => (
              <div
                key={index}
                role="button"
                tabIndex={0}
                onClick={() => handleTemplateSelect(index)}
                onKeyDown={(e) =>
                  (e.key === "Enter" || e.key === " ") &&
                  handleTemplateSelect(index)
                }
                className={`
                  group relative cursor-pointer rounded-lg border transition-all duration-300 ease-in-out
                  ${
                    selectedIndex === index
                      ? "border-blue-500 bg-gradient-to-r from-blue-900/50 to-cyan-900/30 shadow-lg shadow-blue-500/20"
                      : "border-gray-700 bg-gray-900/50 hover:border-blue-600 hover:bg-gradient-to-r hover:from-blue-900/30 hover:to-cyan-900/20"
                  }
                `}
              >
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <h3
                      className={`font-semibold transition-colors ${
                        selectedIndex === index
                          ? "text-blue-300"
                          : "text-white group-hover:text-blue-200"
                      }`}
                    >
                      {item.displayName}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 capitalize">
                      {item.name}
                    </p>
                  </div>
                  <div
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      selectedIndex === index
                        ? "bg-blue-500 shadow-lg shadow-blue-500/50"
                        : "bg-gray-600 group-hover:bg-blue-400"
                    }`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rendered Template */}
      <div className="bg-black col-span-2">
       
        <div className="p-6 max-h-screen overflow-hidden overflow-y-auto">
          <div className="bg-gray-900/50 rounded-lg border border-gray-700 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-60"></div>
            <div className="p-8">
              <SelectedTemplate />
            </div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-blue-600/20 to-transparent rounded-tl-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;
