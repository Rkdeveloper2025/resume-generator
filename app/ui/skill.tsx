import { UseFieldArrayRemove, UseFormRegister } from "react-hook-form";
import { Skills } from "../models";
import { ResumeDataContext } from "../services/form-context";
import { useContext, useState } from "react";

export function Skill({ index, register, remove, errors }: { index: number; register: UseFormRegister<Skills>; remove: UseFieldArrayRemove; errors: any }) {
  const { resumeData } = useContext(ResumeDataContext);
  const [open, setOpen] = useState(true);

  const title = resumeData.skills.skillGroups[index]?.title || "";
  const level = resumeData.skills.skillGroups[index]?.level || "Beginner";
  const [skillTitle, setSkillTitle] = useState(title);
  const [proficiencyLevel, setProficiencyLevel] = useState(level);

  return (
    <>
      <style jsx>{`
        .custom-select option {
          background-color: #1e293b;
          color: white;
        }
      `}</style>

      <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/20 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 cursor-pointer" onClick={() => setOpen((prev) => !prev)}>
          <div>
            <p className="text-sm font-semibold text-white">Skill {index + 1}</p>
            {!open &&
              <p className="text-xs text-slate-300 sm:text-sm">
                {skillTitle || "No skill entered"} · {proficiencyLevel}
              </p>
            }
            
          </div>
          <button
            type="button"
            className="self-end sm:self-center px-3 py-2 bg-slate-800/80 hover:bg-slate-700 text-white rounded-lg text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onClick={(event) => {
              event.stopPropagation();
              setSkillTitle((document.getElementById(`skill-${index}`) as HTMLInputElement)?.value || "");
              setProficiencyLevel((document.getElementById(`level-${index}`) as HTMLSelectElement)?.value || "Beginner");
              setOpen((prev) => !prev);
            }}
            aria-expanded={open}
            aria-controls={`skill-panel-${index}`}
          >
            {open ? "Collapse" : "Expand"}
          </button>
        </div>

        {open && (
          <div id={`skill-panel-${index}`} className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <div className="mb-4">
              <label htmlFor={`skill-${index}`} className="block text-sm font-semibold text-white mb-2">
                Skill
              </label>
              <input
                type="text"
                id={`skill-${index}`}
                defaultValue={title}  
                className="w-full h-12 px-4 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:bg-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all outline-none"
                {...register(`skillGroups.${index}.title`,{minLength: {value: 2, message: "Skill must be at least 2 characters long"}, maxLength: {value: 100, message: "Skill must be less than 100 characters long"}})}
              />
              {errors.skillGroups?.[index]?.title && (
                <p className="text-red-400 text-xs mt-2 flex items-center">
                  <span className="mr-1">⚠</span> {errors.skillGroups[index].title.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor={`level-${index}`} className="block text-sm font-semibold text-white mb-2">
                Proficiency Level
              </label>
              <select
                id={`level-${index}`}
                defaultValue={level}
                className="custom-select w-full h-12 px-4 bg-white/5 border border-white/20 rounded-lg text-white focus:bg-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all outline-none"
                {...register(`skillGroups.${index}.level`)}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
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
        )}
      </div>
    </>
  );
}