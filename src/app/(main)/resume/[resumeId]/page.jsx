"use client";

import Template1 from "@/_templates/Template1";
import useResumeStore from "@/store/resumeStore";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import "@/app/(main)/dashboard/templates/html.css";
import ShareButton from "@/app/(main)/_shared/share-button";
import { Download } from "lucide-react";

const ResumePreviewPage = () => {
  const { resumeId } = useParams();
  const { resume, setResume } = useResumeStore();

  async function fetchedResume() {
    try {
      const res = await axios.get(`/api/fetch-resume/${resumeId}`);
      if (res.data.success) {
        setResume(res.data.resume);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchedResume();
  }, [resumeId]);

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Fixed buttons top-right */}
      <div className="fixed top-4 right-4 flex items-center gap-4 z-50">
        {/* Download Button */}
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-700 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          <Download size={18} />
          Download
        </button>

        {/* Share Button */}
        <ShareButton />
      </div>

      {/* Resume Content */}
      <div className="py-20 print:py-0 print:mt-0">
        <Template1 />
      </div>
    </div>
  );
};

export default ResumePreviewPage;
