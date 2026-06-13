import { UseFieldArrayRemove, UseFormRegister } from "react-hook-form";
import { Projects } from "../models";
import { ResumeDataContext } from "../services/form-context";
import { useContext } from "react";

export default function Project({index,register,remove,errors}:{index:number,register:UseFormRegister<Projects>,remove:UseFieldArrayRemove,errors:any}) {
    const { resumeData, setResumeData } = useContext(ResumeDataContext);
    return (
        <>
         <style jsx>{`
            .custom-select option {
                background-color: #1e293b;
                color: white;
            }
         `}</style>
         <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/20 p-6 space-y-4">
            <div className="mb-4">
                <label htmlFor={`name-${index}`} className="block text-sm font-semibold text-white mb-2">
                    Project Name
                </label>
                <input
                    type="text"
                    id={`name-${index}`}
                    defaultValue={resumeData.projects.list[index]?.name}
                    className="w-full h-12 px-4 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:bg-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all outline-none"
                    {...register(`list.${index}.name`, { minLength: { value: 2, message: "Name must be at least 2 characters long" }, maxLength: { value: 100, message: "Name must be less than 100 characters long" } })}
                />
                {errors.list?.[index]?.name && (
                    <p className="text-red-400 text-xs mt-2 flex items-center">
                        <span className="mr-1">⚠</span> {errors.list[index].name.message}
                    </p>
                )}
            </div>
            <div className="mb-4">
                <label htmlFor={`description-${index}`} className="block text-sm font-semibold text-white mb-2">
                    Description
                </label>
                <input
                    type="text"
                    id={`description-${index}`}
                    defaultValue={resumeData.projects.list[index]?.description}
                    className="w-full h-12 px-4 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:bg-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all outline-none"
                    {...register(`list.${index}.description`,{minLength: {value: 2, message: "Description must be at least 2 characters long"},maxLength: {value: 200, message: "Description must be less than 200 characters long"}})}
                />
               {errors.list?.[index]?.description && (
                    <p className="text-red-400 text-xs mt-2 flex items-center">
                        <span className="mr-1">⚠</span> {errors.list[index].description.message}
                    </p>
                )}
            </div>
            <div className="mb-4">
                <label htmlFor={`link-${index}`} className="block text-sm font-semibold text-white mb-2">
                    Link
                </label>
                <input
                    type="text"
                    id={`link-${index}`}
                    defaultValue={resumeData.projects.list[index]?.link}
                    className="w-full h-12 px-4 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:bg-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all outline-none"
                    {...register(`list.${index}.link`,{pattern: {value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/, message: "Please enter a valid URL"}})}
                />
                {errors.list?.[index]?.link && (
                    <p className="text-red-400 text-xs mt-2 flex items-center">
                        <span className="mr-1">⚠</span> {errors.list[index].link.message}
                    </p>
                )}
            </div>
            
            <div className="flex justify-end">
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