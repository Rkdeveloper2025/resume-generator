'use client'
import { ResumeData, ResumeHeading } from "./models";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { ResumeDataContext } from "./services/form-context";
import NavigationPanel from "./ui/navigation-panel";
import StepHeading from "./ui/step-heading";


export default function Home() {
    const router = useRouter()
    const {register, formState: { errors }, handleSubmit} = useForm<ResumeHeading>();
    const {resumeData,setResumeData} = useContext(ResumeDataContext);
    const [profilePreview, setProfilePreview] = useState<string | null>(resumeData?.heading?.profileImage || null);
    
    
    const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      
      if (!file) {
        setProfilePreview(null);
        
        return;
      }

      
      const reader = new FileReader();
      reader.onload = (e) => setProfilePreview(e.target?.result as string);
      reader.readAsDataURL(file);
    };

    const onSubmit:SubmitHandler<ResumeHeading> = (data) => {
      data.profileImage = profilePreview;
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

              {/* Profile image upload */}
              <div className="md:col-span-2">
                <label htmlFor="profileImage" className="block text-sm font-semibold text-white mb-2">
                  Profile Image
                </label>
                <div className="rounded-3xl border border-dashed border-white/20 bg-white/5 p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <p aria-label="profile image description" className="text-sm text-slate-300">
                        Upload a clean, professional headshot for your resume.
                      </p>
                      <p aria-label="profile image guidelines" className="text-xs text-slate-500 mt-1">
                        Recommended: JPG or PNG, max 2MB.
                      </p>
                    </div>
                    <label
                      htmlFor="profileImage"
                      className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-slate-950/80 px-4 py-2 text-sm font-medium text-white hover:bg-slate-900 transition"
                    >
                      Choose File
                    </label>
                  </div>

                  <input
                    type="file"
                    id="profileImage"
                    accept="image/*"
                    className="hidden"
                    onChange={handleProfileImageChange}
                  />

                  {profilePreview && (
                    <div className="mt-4 w-28 h-28 overflow-hidden rounded-2xl border border-white/10 bg-slate-950">
                      <img
                        src={profilePreview}
                        alt="Profile preview"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                </div>
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