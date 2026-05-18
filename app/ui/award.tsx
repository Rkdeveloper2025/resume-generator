import { UseFieldArrayRemove, UseFormRegister } from "react-hook-form";
import { Achievement } from "../models";
import { list } from "@material-tailwind/react";
import { ResumeDataContext } from "../services/form-context";
import { useContext } from "react";

export default function Award({index,register,remove}:{index:number,register:UseFormRegister<Achievement>,remove:UseFieldArrayRemove}) {
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
                <label htmlFor={`institution-${index}`} className="block text-sm font-semibold text-white mb-2">
                    Award & Recognition
                </label>
                <input
                    type="text"
                    id={`institution-${index}`}
                    defaultValue={resumeData.achievement.list[index]?.name}
                    className="w-full h-12 px-4 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:bg-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all outline-none"
                    {...register(`list.${index}.name`)}
                />
            </div>
            <div className="mb-4">
                <label htmlFor={`institution-${index}`} className="block text-sm font-semibold text-white mb-2">
                    Organization
                </label>
                <input
                    type="text"
                    id={`institution-${index}`}
                    defaultValue={resumeData.achievement.list[index]?.organization}
                    className="w-full h-12 px-4 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:bg-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all outline-none"
                    {...register(`list.${index}.organization`)}
                />
            </div>
            <div className="mb-4">
                <label htmlFor={`duration-${index}`} className="block text-sm font-semibold text-white mb-2">
                    Year
                </label>
                <input
                    type="text"
                    id={`duration-${index}`}
                    defaultValue={resumeData.achievement.list[index]?.year}
                    className="w-full h-12 px-4 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:bg-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all outline-none"
                    {...register(`list.${index}.year`)}
                />
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