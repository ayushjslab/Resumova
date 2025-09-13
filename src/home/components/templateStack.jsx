import React, { useState, useEffect, lazy, Suspense } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import useResumeStore from "@/store/resumeStore";
import { fakeData1 } from "@/lib/fakeData";
import "../../app/(main)/dashboard/templates/html.css";

// === Lazy Load Resume Templates ===
const templates = Array.from({ length: 20 }, (_, i) =>
  lazy(() => import(`../../_templates/Template${i + 1}`))
);

const ProgressBar = ({ duration = 10000, isRunning }) => {
  return (
    <>
      <div className="w-full h-1 bg-blue-900/40 rounded overflow-hidden">
        <div
          key={isRunning}
          className="h-full bg-blue-400 fill-animation"
          style={{
            animationDuration: `${duration}ms`,
            animationPlayState: isRunning ? "running" : "paused",
          }}
        />
      </div>
      <style jsx>{`
        @keyframes fillBar {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        .fill-animation {
          animation-name: fillBar;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
        }
      `}</style>
    </>
  );
};

const TemplateStack = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const totalTemplates = templates.length;
  const { setResume } = useResumeStore();

  useEffect(() => {
    setResume(fakeData1);
  }, [setResume]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalTemplates);
    }, 10000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, totalTemplates]);

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalTemplates) % totalTemplates);
    setIsAutoPlaying(false);
  };

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % totalTemplates);
    setIsAutoPlaying(false);
  };

  const goTo = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const TemplateComponent = templates[currentIndex];

const Loading = () => (
  <div className="relative w-full max-w-[794px] mx-auto">
    {/* Desktop/Tablet loader - hidden on mobile */}
    <div
      className="hidden sm:flex aspect-[794/1123] items-center justify-center overflow-hidden rounded-xl border border-white/20 bg-white backdrop-blur-md shadow-xl"
      role="status"
      aria-label="Loading content"
    >
      <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
    </div>

    {/* Mobile loader - visible only on mobile */}
    <div
      className="flex sm:hidden bg-white rounded-md shadow-lg w-full max-w-[100vw] h-[calc(100vh-120px)] items-center justify-center"
      role="status"
      aria-label="Loading content"
    >
      <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
    </div>
  </div>
);


  return (
    <div className=" w-full px-4 py-8 bg-gradient-to-br from-black to-gray-900/10 flex flex-col items-center">
      <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-gray-400 to-gray-600 bg-clip-text text-transparent mb-6 text-center">
        Templates Preview
      </h1>

      {/* Loader bar */}
      <div className="w-full max-w-[794px] mb-4">
        <ProgressBar
          key={currentIndex}
          duration={10000}
          isRunning={isAutoPlaying}
        />
      </div>

      {/* Resume Container */}
      <div className="relative w-full max-w-[794px] mx-auto">
        {/* Desktop/Tablet: scaled preview */}
        <div className="hidden sm:block aspect-[794/1123] overflow-hidden rounded-xl border border-white/20 bg-white/10 backdrop-blur-md shadow-xl">
          <Suspense fallback={<Loading />}>
            <div className="relative w-full h-[1122px] overflow-hidden ">
              <TemplateComponent />
            </div>
          </Suspense>

          {/* Navigation Buttons */}
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 hidden -translate-y-1/2 w-10 h-10 bg-gray-600 hover:bg-gray-700 cursor-pointer text-white rounded-full flex items-center justify-center z-50 backdrop-blur-sm"
          >
            <ChevronLeft className="w-6 h-6 " />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 hidden -translate-y-1/2 w-10 h-10 bg-gray-600 hover:bg-gray-700 cursor-pointer text-white rounded-full flex items-center justify-center z-50 backdrop-blur-sm"
          >
            <ChevronRight className="w-6 h-6 " />
          </button>
        </div>

        {/* Mobile: full PDF view */}
        <div className="block sm:hidden w-full max-w-[100vw] h-[calc(100vh-120px)] overflow-auto rounded-xl border border-white/20 bg-white/10 backdrop-blur-md shadow-xl">
          <Suspense fallback={<Loading />}>
            <div className="w-full min-h-full">
              <TemplateComponent />
            </div>
          </Suspense>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        {/* Play / Pause Button */}
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className={`px-6 py-2 rounded-full text-white font-semibold shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 ${
            isAutoPlaying
              ? "bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800"
              : "bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800"
          }`}
        >
          {isAutoPlaying ? "Pause" : "Play"}
        </button>

        {/* Restart Button */}
        <button
          onClick={() => {
            setCurrentIndex(0);
            setIsAutoPlaying(true);
          }}
          className="px-6 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Restart
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {templates.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === currentIndex
                ? "bg-blue-400 scale-125"
                : "bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Info Text */}
      <p className="text-gray-400 mt-4 text-sm">
        Template {currentIndex + 1} of {totalTemplates}
      </p>
    </div>
  );
};

export default TemplateStack;
