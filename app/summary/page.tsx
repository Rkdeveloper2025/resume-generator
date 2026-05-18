'use client';
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { ContactInfo, ProfessionalSummary, ResumeData } from "../models";
import { ResumeDataContext } from "../services/form-context";
import { useContext } from "react";
import StepHeading from "../ui/step-heading";
import NavigationPanel from "../ui/navigation-panel";

export default function SummaryStep() {
    const router = useRouter();
        const { register, formState: { errors }, handleSubmit } = useForm<ProfessionalSummary>();
        const { resumeData, setResumeData } = useContext(ResumeDataContext);
        
        const onSubmit: SubmitHandler<ProfessionalSummary> = (data) => {
            const updatedResumeData: ResumeData = { ...resumeData, currentIndex: 5, professionalSummary: data };
            setResumeData(updatedResumeData);
    
            router.push("/education");
        };
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Header */}
            <StepHeading stepCount={5} stepLine="Review Your Summary" />
            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-2xl p-8 sm:p-10">
                    {/* <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Summary Information</h2>
                    <p className="text-slate-300 text-sm mb-8">Describe your professional career</p> */}

                    <form className="w-full space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1">
                            {/* Title Field */}
                            <div className="mb-4">
                                <label htmlFor="title" className="block text-sm font-semibold text-white mb-2">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    placeholder="e.g., Objective"
                                    defaultValue={resumeData.professionalSummary.title}
                                    className="w-full h-11 px-4 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:bg-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all outline-none"
                                    {...register("title")}
                                />
                            </div>

                            {/* Description Field */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-semibold text-white mb-2">
                                    Professional Summary *
                                </label>
                                <textarea
                                    id="description"
                                    defaultValue={resumeData.professionalSummary.description}
                                    className="w-full h-32 px-4 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:bg-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all outline-none"
                                    {...register("description", { required: "Professional summary is required" })}
                                />
                                {errors.description && (
                                    <p className="text-red-400 text-xs mt-2 flex items-center">
                                        <span className="mr-1">⚠</span> {errors.description.message}
                                    </p>
                                )}
                            </div>
  
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center pt-4">
                            <button
                                type="submit"
                                className="cursor-pointer px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                            >
                                Save & Continue
                            </button>
                        </div>
                    </form>
                </div>

                {/* Navigation Buttons */}
                <NavigationPanel backStatus={false} next="education" nextStatus={false} />
            </div>
        </div>
    );
}