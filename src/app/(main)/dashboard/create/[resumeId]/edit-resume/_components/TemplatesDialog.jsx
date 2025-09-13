import React, { useState } from "react";
import { Palette, Star, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "./Dialog";
import { TemplateForViews } from "./constants/templates";
import useResumeStore from "@/store/resumeStore";
import Image from "next/image";

const TemplatesDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredTemplate, setHoveredTemplate] = useState(null);

  const { resume, setResume } = useResumeStore();

  const getCategoryIcon = (category) => {
    switch (category) {
      case "creative":
        return <Palette className="w-4 h-4" />;
      case "modern":
        return <Star className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const selectedIndex = resume?.template ?? null;

  return (
    <>
      <DialogTrigger
        onClick={() => setIsOpen(true)}
        className="group px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center"
      >
        <span className="flex items-center gap-2">
          <Palette className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
          Choose Template
        </span>
      </DialogTrigger>

      <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <DialogContent className="w-full max-w-6xl">
          <DialogClose onClose={() => setIsOpen(false)} />

          <DialogHeader>
            <DialogTitle>Select Your Perfect Template</DialogTitle>
            <DialogDescription>
              Choose from our carefully crafted resume templates. Each template
              is designed to make a lasting impression and can be customized
              after saving your resume.
            </DialogDescription>
          </DialogHeader>

          <div className="px-8 py-6 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {TemplateForViews.map((template, index) => {
                const templateIndex = index + 1;
                const isSelected = resume.template === templateIndex;
                const isHovered = hoveredTemplate === template.name;

                return (
                  <div
                    key={template.name}
                    className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? "border-blue-500 shadow-lg shadow-blue-500/25"
                        : isHovered
                        ? "border-gray-300 shadow-lg"
                        : "border-gray-200 hover:border-gray-300"
                    } ${isHovered ? "transform scale-105" : ""}`}
                    onClick={() => {
                      setResume({ ...resume, template: templateIndex });
                    }}
                    onMouseEnter={() => setHoveredTemplate(template.name)}
                    onMouseLeave={() => setHoveredTemplate(null)}
                  >
                    {/* Template Preview */}
                    <div
                      className={`h-48 bg-gradient-to-br ${template.color} relative overflow-hidden `}
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={`/templates/template${index+1}.png`}
                          alt="template"
                          layout="fill"
                          objectFit="contain"
                        />
                      </div>

                      {/* Category badge */}
                      <div className="absolute top-3 right-3 px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full flex items-center gap-1 text-white text-xs font-medium">
                        {getCategoryIcon(template.category)}
                        <span className="capitalize">{template.category}</span>
                      </div>

                      {/* Selection indicator */}
                      {isSelected && (
                        <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                          <div className="bg-blue-500 text-white rounded-full p-2">
                            <Star className="w-6 h-6 fill-current" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Template info */}
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {template.displayName}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {template.description}
                      </p>
                    </div>

                    {/* Hover overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-blue-600/0 to-blue-600/0 group-hover:from-blue-600/5 group-hover:to-transparent transition-all duration-300 pointer-events-none ${
                        isHovered ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          </div>

        </DialogContent>
      </Dialog>
    </>
  );
};

export default TemplatesDialog;
