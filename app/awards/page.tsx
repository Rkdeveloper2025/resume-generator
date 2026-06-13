'use client';
import { useRouter } from "next/navigation";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { Achievement, ResumeData } from "../models";
import { ResumeDataContext } from "../services/form-context";
import { useContext, useEffect } from "react";
import Award from "../ui/award";
import StepHeading from "../ui/step-heading";
import NavigationPanel from "../ui/navigation-panel";

export default function AwardStep() {
    const router = useRouter();
    const {control, register, formState: { errors }, handleSubmit } = useForm<Achievement>();
    const {fields,append,replace,remove} = useFieldArray({
        control,
        name: 'list'
    })
    const { resumeData, setResumeData } = useContext(ResumeDataContext);
    useEffect(() => {
        if (resumeData.achievement.list.length > 0) {
            replace(resumeData.achievement.list);
        }
    }, []);
    const onSubmit: SubmitHandler<Achievement> = (data) => {
            const updatedResumeData: ResumeData = { ...resumeData, currentIndex: 7, achievement: data };
            setResumeData(updatedResumeData);
    
            router.push("/projects");
        };
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
            <StepHeading stepCount={7} stepLine="Awards & Achievements" />
            
            {/* Main content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-2xl p-8 sm:p-10">
                    {/* <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Awards & Achievements</h2>
                    <p className="text-slate-300 text-sm mb-8">List your awards and recognitions</p> */}

                    <form className="w-full space-y-8" onSubmit={handleSubmit(onSubmit)}>
                        {/* Title Field */}
                        <div className="mb-6">
                            <label htmlFor="title" className="block text-sm font-semibold text-white mb-2">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                placeholder="e.g., Awards & Achievements"
                                defaultValue={resumeData.achievement.title}
                                className="w-full h-12 px-4 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:bg-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all outline-none"
                                {...register("title", { minLength: { value: 2, message: "Title must be at least 2 characters long" }, maxLength: { value: 100, message: "Title must be less than 100 characters long" } })}
                            />
                            {errors.title && (
                                <p className="text-red-400 text-xs mt-2 flex items-center">
                                    <span className="mr-1">⚠</span> {errors.title.message}
                                </p>
                            )}
                        </div>

                        {/* Skill Groups */}
                        <div className="space-y-4">
                            {fields.map((field,index) => (
                                <Award key={field.id} index={index} register={register} remove={remove} errors={errors} />
                            ))}
                        </div>

                        {/* Add Skill Set Button */}
                        <div className="flex justify-start">
                            <button type="button" className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-slate-900" 
                            onClick={()=> append({name:'',organization:'',year:''})}>
                                Add Achievement
                            </button>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center pt-6">
                            <button
                                type="submit"
                                className="cursor-pointer px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                            >
                                Save & Continue
                            </button>
                        </div>
                    </form>
                </div>

                {/* Navigation Buttons */}
                <NavigationPanel backStatus={false} next="projects" nextStatus={false} />
            </div>
        </div>
    );
}