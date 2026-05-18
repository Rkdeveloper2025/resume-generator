'use client'
import { SubmitHandler, useForm } from "react-hook-form";
import { ContactInfo, ResumeData } from "../models";
import { ResumeDataContext } from "../services/form-context";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import StepHeading from "../ui/step-heading";
import NavigationPanel from "../ui/navigation-panel";

export default function ContactPage() {
    const router = useRouter();
    const { register, formState: { errors }, handleSubmit } = useForm<ContactInfo>();
    const { resumeData, setResumeData } = useContext(ResumeDataContext);
    
    const onSubmit: SubmitHandler<ContactInfo> = (data) => {
        console.log(data);
        const updatedResumeData: ResumeData = { ...resumeData, currentIndex: 2, contactInfo: data };
        setResumeData(updatedResumeData);

        router.push("/skills");
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Header */}
            <StepHeading stepCount={2} stepLine="Add Your Contact Information" />
            
            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-2xl p-8 sm:p-10">
                    {/* <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Contact Information</h2>
                    <p className="text-slate-300 text-sm mb-8">Provide your contact details for the resume.</p> */}

                    <form className="w-full space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Title Field */}
                            <div>
                                <label htmlFor="title" className="block text-sm font-semibold text-white mb-2">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    placeholder="e.g., Contact"
                                    defaultValue={resumeData.contactInfo.title}
                                    className="w-full h-11 px-4 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:bg-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all outline-none"
                                    {...register("title")}
                                />
                            </div>

                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="your.email@example.com"
                                    defaultValue={resumeData.contactInfo.email}
                                    className="w-full h-11 px-4 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:bg-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all outline-none"
                                    {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })}
                                />
                                {errors.email && (
                                    <p className="text-red-400 text-xs mt-2 flex items-center">
                                        <span className="mr-1">⚠</span> {errors.email.message}
                                    </p>
                                )}
                            </div>

                            {/* Phone Field */}
                            <div>
                                <label htmlFor="phone" className="block text-sm font-semibold text-white mb-2">
                                    Phone *
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    placeholder="+1 (123) 456-7890"
                                    defaultValue={resumeData.contactInfo.phone}
                                    className="w-full h-11 px-4 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:bg-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all outline-none"
                                    {...register("phone", { required: "Phone is required" })}
                                />
                                {errors.phone && (
                                    <p className="text-red-400 text-xs mt-2 flex items-center">
                                        <span className="mr-1">⚠</span> {errors.phone.message}
                                    </p>
                                )}
                            </div>

                            {/* Location Field */}
                            <div>
                                <label htmlFor="location" className="block text-sm font-semibold text-white mb-2">
                                    Location *
                                </label>
                                <input
                                    type="text"
                                    id="location"
                                    placeholder="City, State, Country"
                                    defaultValue={resumeData.contactInfo.location}
                                    className="w-full h-11 px-4 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:bg-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all outline-none"
                                    {...register("location", { required: "Location is required" })}
                                />
                                {errors.location && (
                                    <p className="text-red-400 text-xs mt-2 flex items-center">
                                        <span className="mr-1">⚠</span> {errors.location.message}
                                    </p>
                                )}
                            </div>

                            {/* Profile Link Field */}
                            <div>
                                <label htmlFor="profileLink" className="block text-sm font-semibold text-white mb-2">
                                    Profile Link
                                </label>
                                <input
                                    type="url"
                                    id="profileLink"
                                    defaultValue={resumeData.contactInfo.profileLink}
                                    placeholder="https://linkedin.com/in/yourprofile"
                                    className="w-full h-11 px-4 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:bg-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all outline-none"
                                    {...register("profileLink")}
                                />
                            </div>

                            {/* Link Title Field */}
                            <div>
                                <label htmlFor="linkTitle" className="block text-sm font-semibold text-white mb-2">
                                    Link Title
                                </label>
                                <input
                                    type="text"
                                    id="linkTitle"
                                    placeholder="LinkedIn"
                                    defaultValue={resumeData.contactInfo.linkTitle}
                                    className="w-full h-11 px-4 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:bg-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all outline-none"
                                    {...register("linkTitle")}
                                />
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
                <NavigationPanel backStatus={false} next="skills" nextStatus={false} />
            </div>
        </div>
    );
}