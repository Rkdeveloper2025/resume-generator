import { Controller, UseFieldArrayRemove, UseFormRegister } from "react-hook-form";
import { Experience } from "../models";
import { useContext } from "react";
import { ResumeDataContext } from "../services/form-context";
import dynamic from "next/dynamic";
import 'react-quill-new/dist/quill.snow.css';


export function ExperienceSet({index,register,remove,control}:{index:number,register:UseFormRegister<Experience>,remove:UseFieldArrayRemove,control:any})
 {
    const { resumeData, setResumeData } = useContext(ResumeDataContext);
    const ReactQuill = dynamic(() => import('react-quill-new'), { 
    ssr: false,
    loading: () => <p>Loading Editor...</p>
    });
    return (
        <>
         <style jsx>{`
            input[type="date"]::-webkit-calendar-picker-indicator {
                filter: invert(1) brightness(2);
            }
         `}</style>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/20 p-6 space-y-4">
            <div className="mb-4">
                <label htmlFor={`company-${index}`} className="block text-sm font-semibold text-white mb-2">
                    Company
                </label>
                <input
                    type="text"
                    id={`company-${index}`}
                    defaultValue={resumeData.experience.experienceSet[index]?.company}
                    className="w-full h-12 px-4 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:bg-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all outline-none"
                    {...register(`experienceSet.${index}.company`)}
                />
            </div>
            <div className="mb-4">
                <label htmlFor={`position-${index}`} className="block text-sm font-semibold text-white mb-2">
                    Position
                </label>
                <input
                    type="text"
                    id={`position-${index}`}
                    defaultValue={resumeData.experience.experienceSet[index]?.position}
                    className="w-full h-12 px-4 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:bg-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all outline-none"
                    {...register(`experienceSet.${index}.position`)}
                />
            </div>
            <div className="mb-4">
                <label htmlFor={`from-${index}`} className="block text-sm font-semibold text-white mb-2">
                    From
                </label>
                <input
                    type="date"
                    id={`from-${index}`}
                    defaultValue={resumeData.experience.experienceSet[index]?.from}
                    className="w-full h-12 px-4 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:bg-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all outline-none"
                    {...register(`experienceSet.${index}.from`)}
                />
            </div>
            <div className="mb-4">
                <label htmlFor={`to-${index}`} className="block text-sm font-semibold text-white mb-2">
                    To
                </label>
                <input
                    type="date"
                    id={`to-${index}`}
                    defaultValue={resumeData.experience.experienceSet[index]?.to}
                    className="w-full h-12 px-4 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:bg-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all outline-none"
                    {...register(`experienceSet.${index}.to`)}
                />
            </div>
            <div className="mb-4">
                <label htmlFor={`location-${index}`} className="block text-sm font-semibold text-white mb-2">
                    Location
                </label>
                <input
                    type="text"
                    id={`location-${index}`}
                    defaultValue={resumeData.experience.experienceSet[index]?.location}
                    className="w-full h-12 px-4 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:bg-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all outline-none"
                    {...register(`experienceSet.${index}.location`)}
                />
            </div>  
            
            <div className="mb-4 md:col-span-2">
                <label htmlFor={`description-${index}`} className="block text-sm font-semibold text-white mb-2">
                    Description
                </label>
                {/* <textarea
                    id={`description-${index}`}
                    defaultValue={resumeData.experience.experienceSet[index]?.description}
                    className="w-full h-24 px-4 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:bg-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all outline-none"
                    {...register(`experienceSet.${index}.description`)}
                /> */}
                <Controller
                    name={`experienceSet.${index}.description`}
                    control={control}
                    render={({ field }) => (
                        <ReactQuill
                            {...field}
                            className="w-full h-50 text-white [&_.ql-toolbar]:bg-blue-50 [&_.ql-toolbar]:border-blue-200 [&_.ql-toolbar]:rounded-t-lg [&_.ql-container]:rounded-b-lg"
                            theme="snow"
                            onChange={field.onChange} 
                        />
                    )}
                />
            </div>
            <div className="flex justify-end md:col-span-2 mt-5">
                <button 
                    type="button" 
                    onClick={() => remove(index)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                    Remove
                </button>
            </div>
         </div>
        </>
       
    );
}
// ...existing code...
