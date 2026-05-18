'use client'

import { useEffect, useState } from "react";
import { ResumeDataContext } from "../services/form-context";
import { InitialData, ResumeData } from "../models";

export default function ResumeContextProvider({ children }: { children: React.ReactNode }) {
      
  const [resumeData, setResumeData] = useState<ResumeData>(InitialData);
  useEffect(() => {
    if (localStorage.getItem("resumeData")) {
      setResumeData(JSON.parse(localStorage.getItem("resumeData") || "{}"));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
  }, [resumeData]);
   return (<ResumeDataContext value={{ resumeData, setResumeData }}>
            {children}
          </ResumeDataContext>
        ); 
   }