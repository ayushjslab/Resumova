"use client";
import useResumeStore from "@/store/resumeStore";
import axios from "axios";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const PreviewPage = () => {
  const router = useRouter();
  const { resumeId } = useParams();
  const { resume, setResume } = useResumeStore();

  useEffect(() => {
    async function fetchResume() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URI}/api/fetch-resume/${resumeId}`
        );
        if (res.data.success) {
          setResume(res.data.resume);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchResume();
  }, [resumeId, setResume]);

  const PreviewTemplate = dynamic(
    () => import(`@/_templates/Template${resume?.template}`),
    {
      ssr: false,
      loading: () => (
        <p className="text-gray-400 text-center mt-10">Loading template...</p>
      ),
    }
  );

  return (
    <div className="min-h-screen bg-[#05060A] flex flex-col items-center px-6 py-10">
      {/* Back Button */}
      <button
        onClick={() => router.push(`/dashboard/edit/${resumeId}`)}
        className="
          flex items-center gap-2 px-5 py-2.5 mb-10
          rounded-xl bg-blue-950/40 border border-blue-700/40
          text-blue-200 hover:bg-blue-900/30 hover:border-blue-400/40
          transition-all duration-200 hover:scale-105
        "
      >
        <ArrowLeft size={18} />
        Back to Edit page
      </button>

      {/* Main Preview */}
      <div className="max-w-4xl w-full rounded-xl overflow-hidden shadow-[0_0_40px_rgba(0,0,60,0.45)] bg-black">
        <PreviewTemplate />
      </div>
    </div>
  );
};

export default PreviewPage;
