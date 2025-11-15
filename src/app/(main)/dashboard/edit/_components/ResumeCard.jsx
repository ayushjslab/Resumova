import React from "react";
import { Edit3, Trash2, Palette } from "lucide-react";

const ResumeCard = ({
  title,
  jobTitle,
  firstName,
  lastName,
  onEdit,
  onDelete,
  onChangeTemplate,
}) => {
  return (
    <div className="group relative w-80">
      <div
        className="
        relative rounded-2xl overflow-hidden 
        bg-black/60 backdrop-blur-xl 
        border border-blue-500/20 
        p-6 shadow-[0_8px_30px_rgba(0,0,0,0.45)]
        transition-all duration-300 
        hover:border-blue-400/40 hover:shadow-[0_8px_40px_rgba(59,130,246,0.25)]
      "
      >
        {/* Blue Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-blue-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

        {/* Header */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight text-white">
            {title}
          </h2>

          <p className="text-sm text-blue-300/90 font-medium">
            {jobTitle?.length > 0 ? jobTitle : "Untitled Role"}
          </p>

          <div
            className="
            inline-flex items-center 
            px-4 py-1.5 rounded-xl 
            bg-blue-950/40 border border-blue-800/50
            text-blue-100 font-medium text-sm
          "
          >
            {firstName || "First"} {lastName || "Last"}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mt-6">
          <div className="flex gap-3">
            <button
              onClick={onEdit}
              className="
              w-10 h-10 flex items-center justify-center 
              rounded-xl border border-blue-600/20 
              bg-blue-900/20 
              hover:border-blue-400/40 hover:bg-blue-900/30
              transition-all duration-200 hover:scale-110 active:scale-95
            "
            >
              <Edit3 className="w-4 h-4 text-blue-200" />
            </button>

            <button
              onClick={onDelete}
              className="
              w-10 h-10 flex items-center justify-center 
              rounded-xl border border-blue-600/20 
              bg-blue-900/20 
              hover:border-red-400/40 hover:bg-blue-900/30
              transition-all duration-200 hover:scale-110 active:scale-95
            "
            >
              <Trash2 className="w-4 h-4 text-red-300" />
            </button>

            <button
              onClick={onChangeTemplate}
              className="
              w-10 h-10 flex items-center justify-center 
              rounded-xl border border-blue-600/20 
              bg-blue-900/20 
              hover:border-blue-300/40 hover:bg-blue-900/30
              transition-all duration-200 hover:scale-110 active:scale-95
            "
            >
              <Palette className="w-4 h-4 text-blue-200" />
            </button>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-950/40 border border-blue-800/40">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-xs text-blue-200">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeCard;
