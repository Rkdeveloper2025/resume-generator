import { UseFieldArrayRemove, UseFormRegister } from "react-hook-form";
import { Education, Institution } from "../models";
import { ResumeDataContext } from "../services/form-context";
import { useContext } from "react";

export default function InstitutionComp({index,register,remove,errors}:{index:number,register:UseFormRegister<Education>,remove:UseFieldArrayRemove,errors: any}) {
   const { resumeData, setResumeData } = useContext(ResumeDataContext);
    return (
        <>
         <style jsx>{`
            input[type="date"]::-webkit-calendar-picker-indicator {
                filter: invert(1) brightness(2);
            }
         `}</style>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/20 p-6 space-y-4">
            <div className="mb-4">
                <label htmlFor={`institution-${index}`} className="block text-sm font-semibold text-white mb-2">
                    Institution
                </label>
                <input
                    type="text"
                    id={`institution-${index}`}
                    defaultValue={resumeData.education.list[index]?.name}
                    className="w-full h-12 px-4 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:bg-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all outline-none"
                    {...register(`list.${index}.name`, { minLength: { value: 2, message: "Institution must be at least 2 characters long" }, maxLength: { value: 100, message: "Institution must be less than 100 characters long" } })}
                />
                {errors.list?.[index]?.name && (
                    <p className="text-red-400 text-xs mt-2 flex items-center">
                        <span className="mr-1">⚠</span> {errors.list[index].name.message}
                    </p>
                )}
            </div>
            <div className="mb-4">
                <label htmlFor={`institution-${index}`} className="block text-sm font-semibold text-white mb-2">
                    Degree
                </label>
                <input
                    type="text"
                    id={`institution-${index}`}
                    defaultValue={resumeData.education.list[index]?.degree}
                    className="w-full h-12 px-4 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:bg-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all outline-none"
                    {...register(`list.${index}.degree`, { minLength: { value: 2, message: "Degree must be at least 2 characters long" }, maxLength: { value: 100, message: "Degree must be less than 100 characters long" } })}
                />
                {errors.list?.[index]?.degree && (
                    <p className="text-red-400 text-xs mt-2 flex items-center">
                        <span className="mr-1">⚠</span> {errors.list[index].degree.message}
                    </p>
                )}
            </div>
            <div className="mb-4">
                <label htmlFor={`from-${index}`} className="block text-sm font-semibold text-white mb-2">
                    From
                </label>
                <input
                    type="date"
                    id={`from-${index}`}
                    defaultValue={resumeData.education.list[index]?.from}
                    className="w-full h-12 px-4 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:bg-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all outline-none"
                    {...register(`list.${index}.from`)}
                />
            </div>
            <div className="mb-4">
                <label htmlFor={`to-${index}`} className="block text-sm font-semibold text-white mb-2">
                    To
                </label>
                <input
                    type="date"
                    id={`to-${index}`}
                    defaultValue={resumeData.education.list[index]?.to}
                    className="w-full h-12 px-4 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:bg-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all outline-none"
                    {...register(`list.${index}.to`)}
                />
            </div>
            <div className="mb-4">
                <label htmlFor={`marks-${index}`} className="block text-sm font-semibold text-white mb-2">
                    Marks
                </label>
                <input
                    type="text"
                    id={`marks-${index}`}
                    defaultValue={resumeData.education.list[index]?.marks}
                    className="w-full h-12 px-4 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:bg-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all outline-none"
                    {...register(`list.${index}.marks`)}
                />
            </div>
            <div className="mb-4">
                <label htmlFor={`link-${index}`} className="block text-sm font-semibold text-white mb-2">
                    Link
                </label>
                <input
                    type="text"
                    id={`link-${index}`}
                    defaultValue={resumeData.education.list[index]?.link}
                    className="w-full h-12 px-4 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:bg-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all outline-none"
                    {...register(`list.${index}.link`,{pattern: { value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/, message: "Please enter a valid URL" }})}
                />
                {errors.list?.[index]?.link && (
                    <p className="text-red-400 text-xs mt-2 flex items-center">
                        <span className="mr-1">⚠</span> {errors.list[index].link.message}
                    </p>
                )}
            </div>

            <div className="flex justify-end md:col-span-2">
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