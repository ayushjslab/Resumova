"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  FileText,
  Download,
  Share2,
  Eye,
  ZoomIn,
  ZoomOut,
  Upload,
  AlertCircle,
} from "lucide-react";

function App() {
  const [mounted, setMounted] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);
  const iframeRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    // Example PDF URL - replace with your actual PDF
    setPdfUrl(
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
    );
  }, []);

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type !== "application/pdf") {
        setError("Please select a valid PDF file.");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        // 10MB limit
        setError("File size must be less than 10MB.");
        return;
      }

      setError("");
      setIsLoading(true);
      setPdfFile(file);

      const url = URL.createObjectURL(file);
      setPdfUrl(url);
      setCurrentPage(1);
      setIsLoading(false);
    }
  };

  // Handle drag and drop
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const mockEvent = { target: { files: [file] } };
      handleFileUpload(mockEvent);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Zoom controls
  const handleZoomIn = () => {
    if (zoomLevel < 200) {
      const newZoom = Math.min(zoomLevel + 25, 200);
      setZoomLevel(newZoom);
      // Apply zoom immediately
      if (iframeRef.current) {
        iframeRef.current.style.transform = `scale(${newZoom / 100})`;
        iframeRef.current.style.width = `${10000 / newZoom}%`;
        iframeRef.current.style.height = `${10000 / newZoom}%`;
      }
    }
  };

  const handleZoomOut = () => {
    if (zoomLevel > 50) {
      const newZoom = Math.max(zoomLevel - 25, 50);
      setZoomLevel(newZoom);
      // Apply zoom immediately
      if (iframeRef.current) {
        iframeRef.current.style.transform = `scale(${newZoom / 100})`;
        iframeRef.current.style.width = `${10000 / newZoom}%`;
        iframeRef.current.style.height = `${10000 / newZoom}%`;
      }
    }
  };

  const handleZoomChange = (event) => {
    const newZoom = parseInt(event.target.value);
    setZoomLevel(newZoom);
    updateIframeZoom(newZoom);
  };

  const updateIframeZoom = (zoom) => {
    if (iframeRef.current) {
      try {
        const iframeDoc =
          iframeRef.current.contentDocument ||
          iframeRef.current.contentWindow.document;
        if (iframeDoc) {
          iframeDoc.body.style.zoom = `${zoom}%`;
        }
      } catch (e) {
        // Cross-origin restrictions may prevent access
        console.log(
          "Unable to control iframe zoom due to cross-origin restrictions"
        );
      }
    }
  };

  // Page navigation
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      // Note: PDF page navigation in iframe is limited due to cross-origin restrictions
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      // Note: PDF page navigation in iframe is limited due to cross-origin restrictions
    }
  };

  // Download functionality
  const handleDownload = () => {
    if (pdfFile) {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(pdfFile);
      link.download = pdfFile.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (pdfUrl) {
      // For external URLs, open in new tab
      window.open(pdfUrl, "_blank");
    }
  };

  // Share functionality
  const handleShare = async () => {
    if (navigator.share && pdfFile) {
      try {
        await navigator.share({
          title: "Resume PDF",
          text: "Check out this resume",
          files: [pdfFile],
        });
      } catch (error) {
        console.log("Error sharing:", error);
        // Fallback: copy URL to clipboard
        if (pdfUrl) {
          navigator.clipboard.writeText(pdfUrl);
          alert("PDF URL copied to clipboard!");
        }
      }
    } else if (pdfUrl) {
      // Fallback: copy URL to clipboard
      try {
        await navigator.clipboard.writeText(pdfUrl);
        alert("PDF URL copied to clipboard!");
      } catch (error) {
        console.log("Could not copy to clipboard");
      }
    }
  };

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-30"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-cyan-300 rounded-full animate-ping opacity-20"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-blue-300 rounded-full animate-bounce opacity-25"></div>
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-sky-400 rounded-full animate-pulse opacity-15"></div>
        <div className="absolute bottom-1/3 right-1/5 w-2 h-2 bg-blue-500 rounded-full animate-ping opacity-10"></div>
        <div className="absolute top-2/3 left-1/5 w-1 h-1 bg-cyan-400 rounded-full animate-bounce opacity-20"></div>
      </div>

      {/* Subtle gradient orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-600/10 to-cyan-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-purple-600/8 to-blue-500/8 rounded-full blur-3xl animate-float-delayed"></div>

      {/* Error notification */}
      {error && (
        <div className="fixed top-4 right-4 z-50 bg-red-600/20 border border-red-500/50 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex items-center space-x-2 text-red-300">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm">{error}</span>
          </div>
        </div>
      )}

      {/* Loading indicator */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-gray-900/80 rounded-lg p-6 border border-blue-500/30">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-400 border-t-transparent"></div>
              <span className="text-blue-300">Loading PDF...</span>
            </div>
          </div>
        </div>
      )}

      {/* Header with brand */}
      <header className="relative z-20 p-6 border-b border-blue-900/30 backdrop-blur-sm">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Brand logo */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 animate-gradient-x tracking-wide">
                Resumova
              </h1>
              <div className="absolute inset-0 text-3xl font-bold text-blue-400 opacity-20 blur-sm animate-pulse tracking-wide">
                Resumova
              </div>
            </div>
            <div className="h-8 w-px bg-gradient-to-b from-transparent via-blue-400/50 to-transparent"></div>
            <p className="text-blue-200/80 text-sm font-light tracking-wider">
              PDF Viewer
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handleZoomOut}
              disabled={zoomLevel <= 50}
              className="p-2 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-300 hover:bg-blue-600/30 hover:border-blue-400/50 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ZoomOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={handleZoomIn}
              disabled={zoomLevel >= 200}
              className="p-2 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-300 hover:bg-blue-600/30 hover:border-blue-400/50 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ZoomIn className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={handleDownload}
              disabled={!pdfUrl}
              className="p-2 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-300 hover:bg-blue-600/30 hover:border-blue-400/50 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={handleShare}
              disabled={!pdfUrl}
              className="p-2 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-300 hover:bg-blue-600/30 hover:border-blue-400/50 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 rounded-lg bg-green-600/20 border border-green-500/30 text-green-300 hover:bg-green-600/30 hover:border-green-400/50 transition-all duration-300 group"
            >
              <Upload className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </header>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Main content area */}
      <main className="relative z-10 flex-1 p-6">
        <div className="max-w-7xl mx-auto h-full">
          <div
            className={`transition-all duration-1000 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {/* PDF Container */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-blue-900/30 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-blue-600/20 border border-blue-500/30">
                    <FileText className="w-6 h-6 text-blue-300" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      {pdfFile ? pdfFile.name : "Resume Document"}
                    </h2>
                    <p className="text-blue-200/60 text-sm">
                      {pdfFile
                        ? `${(pdfFile.size / 1024 / 1024).toFixed(2)} MB`
                        : "Professional Resume PDF"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-blue-200/60 text-sm">
                  <Eye className="w-4 h-4" />
                  <span>Preview Mode</span>
                  <span className="mx-2">•</span>
                  <span>{zoomLevel}% zoom</span>
                </div>
              </div>

              {/* PDF Viewer */}
              <div className="relative bg-white rounded-xl overflow-hidden shadow-2xl border-4 border-blue-500/20">
                <div className="aspect-[8.5/11] w-full">
                  {pdfUrl ? (
                    <iframe
                      ref={iframeRef}
                      src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1&page=${currentPage}`}
                      className="w-full h-full border-0"
                      title="PDF Viewer"
                      onLoad={() => setIsLoading(false)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <div className="text-center">
                        <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 text-lg font-medium">
                          No PDF loaded
                        </p>
                        <p className="text-gray-500 text-sm mt-2">
                          Upload or select a PDF to view
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* PDF overlay effects */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/50 via-cyan-400/50 to-blue-500/50 animate-shimmer"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/30 via-cyan-400/30 to-blue-500/30"></div>
                </div>
              </div>

              {/* PDF Controls */}
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage <= 1}
                    className="px-4 py-2 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-300 hover:bg-blue-600/30 hover:border-blue-400/50 transition-all duration-300 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous Page
                  </button>
                  <span className="text-blue-200/80 text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage >= totalPages}
                    className="px-4 py-2 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-300 hover:bg-blue-600/30 hover:border-blue-400/50 transition-all duration-300 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next Page
                  </button>
                </div>
              </div>
            </div>

            {/* Upload area */}
            <div
              className="mt-6 p-6 border-2 border-dashed border-blue-500/30 rounded-2xl bg-blue-900/10 backdrop-blur-sm hover:border-blue-400/50 hover:bg-blue-900/20 transition-all duration-300 cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <div className="text-center">
                <FileText className="w-12 h-12 text-blue-400 mx-auto mb-3 opacity-60" />
                <p className="text-blue-200 font-medium mb-1">
                  Drop your PDF here or click to upload
                </p>
                <p className="text-blue-200/60 text-sm">
                  Supports PDF files up to 10MB
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating brand elements */}
      <div className="absolute top-1/2 left-8 transform -translate-y-1/2 opacity-10 pointer-events-none">
        <div className="text-6xl font-bold text-blue-400 transform -rotate-90 tracking-widest">
          RESUMOVA
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(20px) rotate(-5deg);
          }
        }

        @keyframes gradient-x {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }

        .animate-shimmer {
          background-size: 200% 100%;
          animation: shimmer 2s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default App;
