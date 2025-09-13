import { create } from "zustand";

const useResumeStore = create((set) => ({
  resume: {
    firstName: "",
    lastName: "",
    jobTitle: "",
    address: "",
    phone: "",
    email: "",
    summary: "",
    experience: [],
    education: [],
    certifications: [],
    skills: [],
    socialLinks: [],
    projects: [],
    achievements: [],
    languages: [],
    preferences: {
      jobType: "",
      location: "",
      relocation: false,
    },
    template: 1
  },

  setResume: (updater) =>
    set((state) => ({
      resume: typeof updater === "function" ? updater(state.resume) : updater,
    })),

    
  updateField: (field, value) =>
    set((state) => ({
      resume: { ...state.resume, [field]: value },
    })),
  addExperience: (exp) =>
    set((state) => ({
      resume: {
        ...state.resume,
        experience: [...state.resume.experience, exp],
      },
    })),
  addEducation: (edu) =>
    set((state) => ({
      resume: { ...state.resume, education: [...state.resume.education, edu] },
    })),
  addSkill: (skill) =>
    set((state) => ({
      resume: { ...state.resume, skills: [...state.resume.skills, skill] },
    })),
  addProjects: (project) =>
    set((state) => ({
      resume: {
        ...state.resume,
        projects: [...state.resume.projects, project],
      },
    })),
  addSocialLinks: (link) =>
    set((state) => ({
      resume: {
        ...state.resume,
        socialLinks: [...state.resume.socialLinks, link],
      },
    })),
  addAchievements: (achievement) =>
    set((state) => ({
      resume: {
        ...state.resume,
        achievements: [...state.resume.achievements, achievement],
      },
    })),
  addLanguages: (language) =>
    set((state) => ({
      resume: {
        ...state.resume,
        languages: [...state.resume.languages, language],
      },
    })),
  addCertifications: (certificate) =>
    set((state) => ({
      resume: {
        ...state.resume,
        certifications: [...state.resume.certifications, certificate],
      },
    })),

  // ..........GREAT.............METHOD.........

  addToArray: (key, item) =>
    set((state) => ({
      resume: { ...state.resume, [key]: [...state.resume[key], item] },
    })),
}));

export default useResumeStore;
