'use client'

import { useContext } from "react";
import { ResumeDataContext } from "../services/form-context";

export default function ResumeStepper() {
    const { resumeData } = useContext(ResumeDataContext);
    const currentIndex = resumeData?.currentIndex;
    
    const steps = [
        "Header",
        "Contact",
        "Skills",
        "Experience",
        "Summary",
        "Education",
        "Awards",
        "Projects",
        "Preview"
    ];

  return (
    <>
     <div className="hidden md:block sticky top-0 z-10 w-full overflow-x-auto overflow-y-hidden bg-slate-800 px-4 py-8 sm:px-6 lg:px-8">
      <ol className="flex w-full items-center text-xs text-gray-300 font-semibold sm:text-sm md:text-base">
        {steps.map((stepName: string, index: number) => {
          const isCompleted = currentIndex > index;
          const isCurrent = currentIndex === index;
          const isLast = index === steps.length - 1;

          return (
            <li key={index} className="flex items-center w-full">
              {/* Step Circle */}
              <div className="relative flex flex-col items-center">
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                    isCompleted || isCurrent
                      ? "bg-indigo-600 text-white border-2 border-indigo-600"
                      : "bg-slate-600 text-gray-300 border-2 border-slate-500"
                  }`}
                >
                  {isCompleted ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                {/* Step Label */}
                <span className="mt-2 text-xs sm:text-sm font-medium text-center whitespace-nowrap">
                  {stepName}
                </span>
              </div>

              {/* Connector Line */}
              {!isLast && (
                <div
                  className={`flex-1 h-1 mx-2 sm:mx-4 transition-all duration-300 ${
                    isCompleted ? "bg-indigo-600" : "bg-gray-200"
                  }`}
                />
              )}
            </li>
          );
        })}
       </ol>
      </div>
      <div className="flex md:hidden justify-center text-gray-300 sticky top-0 z-10 w-full overflow-x-auto overflow-y-hidden bg-slate-800 px-4 py-8 sm:px-6 lg:px-8">
         <span className="text-2xl">{currentIndex + 1}/{steps.length}</span>
         <span className="text-2xl ml-5">{steps[(currentIndex)]}</span>
      </div>
    </>
    
  );
}