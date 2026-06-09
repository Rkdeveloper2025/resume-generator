export interface ResumeData {
 currentIndex: number;
 heading:ResumeHeading;
 contactInfo:ContactInfo; 
  skills:Skills;
  professionalSummary:ProfessionalSummary;
  experience:Experience;
  education:Education;
  achievement:Achievement
  projects:Projects;
  theme?: string;
}
/* export interface SkillGroup {
  title: string;
  skillSets: SkillDetail[];
} */
export interface SkillDetail {
  title: string;
  level?: string;
}
export interface ResumeContext {
  resumeData: ResumeData;
  setResumeData: (resumeData: ResumeData) => void;
}
export interface ResumeHeading{
    name: string;
    title: string;
    profileImage?: string|null;
}
export interface ContactInfo {
    title: string;
    email: string;
    phone: string;
    location: string;
    profileLink:string;
    linkTitle:string;
  };
export interface Skills {
    title:string;
    skillGroups:SkillDetail[];
  };
export interface ProfessionalSummary {
    title: string;
    description: string;
  };
export interface Experience {
    title:string;
    experienceSet:{
        company: string;
        position: string;
        from: string;
        to?: string;
        location: string;
        description: string;
    }[];
  };
export interface Education {
    title: string;
    list:Institution[];
  };
export interface Achievement {
    title: string;
    list: {
        name:string;
        organization:string;
        year: string;
    }[];
};
export interface Projects {
    title: string;
    list: {
        name: string;
        description: string;
        link?: string;
    }[];
};
export interface Institution {
        name: string;
        degree: string;
        from: string;
        to?: string;
        marks?: string;
        link?: string;
}

export const InitialData: ResumeData = {
            currentIndex: 0,
            heading: {
                name: "",
                title: "",
            },
            contactInfo: {
              title: "",
              email: "",
              phone: "",
              location: "",
              profileLink: "",
              linkTitle: "",
            },
            skills: {
              title: "",
              skillGroups: [{ title: "", level: "" }],
            },
            professionalSummary: {
              title: "",
              description: "",
            },
            experience: {
              title: "",
              experienceSet: [{ company: "", position: "", from: "", to: "", location: "", description: "" }],
            },
            education: {
              title: "",
              list: [{ name: "", degree: "", from: "", to: "", marks: "" }],
            },
            achievement: {
              title: "",
              list: [{name: "",organization: "",year: ""}],
            },
            projects: {
              title: "",
              list: [{name: "", description: ""}],
            },
          };
