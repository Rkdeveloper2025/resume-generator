import { createContext } from "react";
import { ResumeContext } from "../models";


export const ResumeDataContext = createContext<ResumeContext>({resumeData:{currentIndex: 0, heading: { name: "", title: "" }, contactInfo: { title: "", email: "", phone: "", location: "", profileLink: "", linkTitle: "" }, skills: { title: "", skillGroups: [] }, professionalSummary: { title: "", description: "" }, experience: { title: "", experienceSet: [] }, education: { title: "", list: [] }, achievement: { title: "", list: [] }, projects: { title: "", list: [] } }, setResumeData: () => {}});