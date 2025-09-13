"use client";
import {  Suspense, useRef, useState, useMemo } from "react";
import BasicDetailsForm from "./_components/ResumeForms/basic-details";
import SocialLinksForm from "./_components/ResumeForms/social-links";
import SummaryForm from "./_components/ResumeForms/summary";
import SkillsForm from "./_components/ResumeForms/skills";
import ExperienceForm from "./_components/ResumeForms/experience";
import EducationForm from "./_components/ResumeForms/education";
import Certifications from "./_components/ResumeForms/certifications";
import LanguagesForm from "./_components/ResumeForms/languages";
import AchievementsForm from "./_components/ResumeForms/achievement";
import PreferencesForm from "./_components/ResumeForms/prefrences";
import ProjectsForm from "./_components/ResumeForms/projects";

import Template1 from "../../../../../../_templates/Template1";
import clsx from "clsx";
import { GrPrevious, GrNext } from "react-icons/gr";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { useReactToPrint } from "react-to-print";
import { FiDownload } from "react-icons/fi";
import axios from "axios";
import {
  UPDATE_RESUME,
} from "@/app/(main)/_routes/create-resume.routes";
import useResumeStore from "@/store/resumeStore";
import { useParams } from "next/navigation";
import { ShowToast } from "@/app/(main)/_shared/show-toast";
import TemplatesDialog from "./_components/TemplatesDialog"
import "./html.css";
import getTemplateComponent from "./_components/getTemplates"
const btnClass = clsx(
  "border py-2 px-4 rounded-lg flex items-center justify-center gap-1"
);
const disabledClass = clsx(
  "bg-gray-600 cursor-not-allowed border-2 border-gray-400"
);

export default function EditResumePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);

  const { resume } = useResumeStore();
  const { resumeId } = useParams();

  const printref = useRef(null);

  const TemplateComponent = useMemo(() => {
    return getTemplateComponent(resume.template);
  }, [resume.template]);

  // ✅ using contentRef for react-to-print
  const handlePrint = useReactToPrint({
    contentRef: printref,
    documentTitle: "",
    pageStyle: `
    @page {
      size: A4;
      margin: 15mm 12mm 15mm 12mm;
    }
    @media print {
      body {
        margin: 0 !important;
        padding: 0 !important;
        -webkit-print-color-adjust: exact;
        color-adjust: exact;
      }
      
      html {
        margin: 0;
        padding: 0;
      }
      
      * {
        box-sizing: border-box;
      }
      
      .resume-section {
        page-break-inside: avoid;
        margin-bottom: 15px;
      }
      
      .page-break {
        page-break-before: always;
        margin-top: 0;
      }
    }
  `,
    onBeforeGetContent: () => {
      // Hide elements before printing
      const elementsToHide = document.querySelectorAll(
        "header, nav, .no-print"
      );
      elementsToHide.forEach((el) => (el.style.display = "none"));
    },
    onAfterPrint: () => {
      // Show elements after printing
      const elementsToShow = document.querySelectorAll(
        "header, nav, .no-print"
      );
      elementsToShow.forEach((el) => (el.style.display = ""));
    },
  });

  const steps = [
    <BasicDetailsForm />,
    <SummaryForm />,
    <SkillsForm />,
    <ExperienceForm />,
    <EducationForm />,
    <Certifications />,
    <ProjectsForm />,
    <AchievementsForm />,
    <LanguagesForm />,
    <PreferencesForm />,
    <SocialLinksForm />,
  ];
  const StepComponent = steps[currentStep - 1] || null;

  async function handleSave() {
    if (isSaving) return; // ⛔ prevent spamming
    setIsSaving(true);
    try {
      const res = await axios.post(UPDATE_RESUME(resumeId), { data: resume });
      if (res.data.success) {
        ShowToast(true, res.data.message);
      }
    } catch (error) {
      console.log(error);
      ShowToast(false, error.response.data.message);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    // Make the page a fixed-height viewport and prevent the body from scrolling
    <div className="h-screen bg-black text-white overflow-hidden">
      {/* Desktop */}
      <div className="hidden lg:block h-full">
        <PanelGroup direction="horizontal" className="h-full overflow-hidden">
          {/* Left: Form */}
          <Panel defaultSize={50} minSize={30} className="min-w-0 min-h-0">
            <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 flex h-full min-h-0 flex-col">
              {/* Scrollable form content */}
              <div className="flex-1 min-h-0 overflow-y-auto p-6">
                {StepComponent}
              </div>

              {/* Fixed footer */}
              <div className="text-white flex items-center justify-end gap-5 px-5 py-4 border-t border-gray-700 shrink-0">
                {/* Previous Button */}
                <button
                  onClick={() => setCurrentStep((p) => Math.max(p - 1, 1))}
                  disabled={currentStep === 1}
                  className={`${btnClass} ${
                    currentStep === 1 ? disabledClass : "cursor-pointer"
                  }`}
                >
                  <GrPrevious />
                  Previous
                </button>

                {/* Next Button - only visible if not last step */}
                {currentStep < steps.length && (
                  <button
                    onClick={() =>
                      currentStep < steps.length &&
                      setCurrentStep(currentStep + 1)
                    }
                    disabled={currentStep === steps.length}
                    className={`${btnClass} ${
                      currentStep === steps.length
                        ? disabledClass
                        : "cursor-pointer"
                    }`}
                  >
                    Next
                    <GrNext />
                  </button>
                )}

                {/* Save Button - only visible on last step */}
                {currentStep === steps.length && (
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className={`${btnClass} ${
                      isSaving
                        ? disabledClass
                        : "cursor-pointer bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-medium shadow-md hover:from-indigo-600 hover:to-blue-700 "
                    }`}
                  >
                    {isSaving ? "Saving..." : "Save"}
                  </button>
                )}
              </div>
            </div>
          </Panel>

          <PanelResizeHandle className="w-1 bg-gray-700 hover:bg-blue-500 transition cursor-col-resize" />

          {/* Right: Preview */}
          <Panel defaultSize={50} minSize={30} className="min-w-0 min-h-0">
            <div className="h-full flex flex-col">
              {/* ✅ Toolbar with Export button */}
              <div className="flex justify-end p-3 gap-5 border-b border-gray-300 bg-gray-200">
                <TemplatesDialog />
                <button
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-red-600 text-white font-medium shadow-md hover:from-pink-600 hover:to-red-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg active:scale-95"
                  aria-label="Export PDF"
                  onClick={handlePrint}
                >
                  <FiDownload size={20} />
                  Export PDF
                </button>
              </div>

              {/* ✅ Scrollable preview area */}
              <div
                className="flex-1 overflow-y-auto p-6 bg-white"
                id="print-area"
                ref={printref}
              >
                <Suspense fallback={<div>Loading...</div>}>
                  <TemplateComponent />
                </Suspense>
              </div>
            </div>
          </Panel>
        </PanelGroup>
      </div>

      {/* Mobile View */}
      <div className="block lg:hidden h-full overflow-y-auto">
        {/* Step Form Section */}
        <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 flex flex-col min-h-screen">
          {/* Form Step */}
          <div className="flex-1 overflow-y-auto p-4">{StepComponent}</div>

          {/* Navigation Buttons */}
          <div className="sticky bottom-0 bg-black p-4 flex flex-col gap-3 border-t border-gray-700">
            <div className="flex items-center justify-between gap-3 text-white">
              <button
                onClick={() => setCurrentStep((p) => Math.max(p - 1, 1))}
                disabled={currentStep === 1}
                className={`${btnClass} ${
                  currentStep === 1 ? disabledClass : "cursor-pointer"
                } w-full`}
              >
                <GrPrevious />
                Previous
              </button>
              {currentStep < steps.length ? (
                <button
                  onClick={() =>
                    setCurrentStep((p) => Math.min(p + 1, steps.length))
                  }
                  disabled={currentStep === steps.length}
                  className={`${btnClass} ${
                    currentStep === steps.length
                      ? disabledClass
                      : "cursor-pointer"
                  } w-full`}
                >
                  Next
                  <GrNext />
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className={`${btnClass} ${
                    isSaving
                      ? disabledClass
                      : "cursor-pointer bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-medium shadow-md hover:from-indigo-600 hover:to-blue-700"
                  } w-full`}
                >
                  {isSaving ? "Saving..." : "Save"}
                </button>
              )}
            </div>

            <TemplatesDialog />
            {/* PDF Export Button */}
            <button
              onClick={handlePrint}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-red-600 text-white font-medium shadow-md hover:from-pink-600 hover:to-red-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg active:scale-95 w-full"
            >
              <FiDownload size={20} />
              Export PDF
            </button>
          </div>
        </div>

        {/* Resume Preview Section */}
        <div className="p-4 bg-white">
          <div ref={printref}>
            <Suspense fallback={<div>Loading preview...</div>}>
              <TemplateComponent />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
