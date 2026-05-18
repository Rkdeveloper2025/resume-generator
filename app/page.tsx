'use client'
import { ResumeData, ResumeHeading } from "./models";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { ResumeDataContext } from "./services/form-context";
import NavigationPanel from "./ui/navigation-panel";
import StepHeading from "./ui/step-heading";


export default function Home() {
    const router = useRouter()
    const {register, formState: { errors }, handleSubmit} = useForm<ResumeHeading>();
    const {resumeData,setResumeData} = useContext(ResumeDataContext);
    //console.log('Data=>',resumeData);
    const onSubmit:SubmitHandler<ResumeHeading> = (data) => {
       // console.log(data);
        const updatedResumeData:ResumeData = {...resumeData,currentIndex:1, heading: data};
        setResumeData(updatedResumeData);

        router.push("/contact");
    };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <StepHeading stepCount={1} stepLine="Complete Your Professional Heading" />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-2xl p-8 sm:p-10">
          {/* <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Heading</h2>
          <p className="text-slate-300 text-sm mb-8">(Top of the resume)</p> */}

          <form className="w-full space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  defaultValue={resumeData.heading.name}
                  placeholder="John Doe"
                  className="w-full h-11 px-4 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:bg-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all outline-none"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-red-400 text-xs mt-2 flex items-center">
                    <span className="mr-1">⚠</span> {errors.name.message}
                  </p>
                )}
              </div>

              {/* Title Field */}
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-white mb-2">
                  Professional Title *
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="Senior Developer"
                  defaultValue={resumeData.heading.title}
                  className="w-full h-11 px-4 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:bg-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all outline-none"
                  {...register("title", { required: "Title is required" })}
                />
                {errors.title && (
                  <p className="text-red-400 text-xs mt-2 flex items-center">
                    <span className="mr-1">⚠</span> {errors.title.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="px-8 py-3 cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                Save & Continue
              </button>
            </div>
          </form>
        </div>

        {/* Navigation Buttons */}
        <NavigationPanel backStatus={true} next="contact" nextStatus={false} />
      </div>
    </div>
  );
}